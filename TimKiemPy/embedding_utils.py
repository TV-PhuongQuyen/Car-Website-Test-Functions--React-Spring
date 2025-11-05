import torch
from PIL import Image
from torchvision import transforms
import clip
import numpy as np
from tachnen import remove_background_offline
import os

# Cache model
_dinov2_model = None
_clip_model = None


def resize_image(image, size=(384, 384)):
    # Convert RGBA → RGB với background trắng
    if image.mode == 'RGBA':
        background = Image.new('RGB', image.size, (255, 255, 255))
        background.paste(image, mask=image.split()[3])  # Alpha channel làm mask
        image = background
    elif image.mode != 'RGB':
        image = image.convert('RGB')

    # Tính scale giữ aspect ratio
    img_width, img_height = image.size
    target_width, target_height = size

    scale = min(target_width / img_width, target_height / img_height)

    new_width = int(img_width * scale)
    new_height = int(img_height * scale)

    # Resize
    image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)

    # Paste vào canvas trắng (center)
    canvas = Image.new('RGB', size, (255, 255, 255))
    paste_x = (target_width - new_width) // 2
    paste_y = (target_height - new_height) // 2
    canvas.paste(image, (paste_x, paste_y))

    return canvas


def image_to_dinov2_embedding(image, size=392):
    global _dinov2_model
    if _dinov2_model is None:
        print("Loading DINOv2...")
        model_name = 'dinov2_vitb14'  # hoặc 'dinov2_vitl14' cho accuracy cao hơn
        _dinov2_model = torch.hub.load('facebookresearch/dinov2', model_name)
        _dinov2_model.eval()
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        _dinov2_model = _dinov2_model.to(device)
        print(f"DINOv2 loaded on {device}")

    device = next(_dinov2_model.parameters()).device

    # Ensure size is divisible by 14
    if size % 14 != 0:
        # Round to nearest multiple of 14
        size = round(size / 14) * 14
        print(f"Adjusted size to {size} (must be divisible by 14)")

    transform = transforms.Compose([
        transforms.Resize((size, size), interpolation=transforms.InterpolationMode.BICUBIC),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

    img_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        embedding = _dinov2_model(img_tensor)

    return embedding.cpu().numpy().squeeze()


def image_to_clip_embedding(image, size=224):
    global _clip_model
    if _clip_model is None:
        print("Loading CLIP...")
        device = "cuda" if torch.cuda.is_available() else "cpu"
        _clip_model, _ = clip.load("ViT-B/16", device=device)
        _clip_model.eval()
        print(f"CLIP loaded on {device}")

    device = next(_clip_model.parameters()).device

    if image.mode != 'RGB':
        image = image.convert('RGB')

    # CLIP ALWAYS use 224x224 (native resolution)
    clip_size = 224
    if size != 224:
        print(f"(CLIP uses native 224x224 regardless of input size)")

    preprocess = transforms.Compose([
        transforms.Resize((clip_size, clip_size), interpolation=transforms.InterpolationMode.BICUBIC),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=(0.48145466, 0.4578275, 0.40821073),
            std=(0.26862954, 0.26130258, 0.27577711)
        )
    ])

    img_input = preprocess(image).unsqueeze(0).to(device)

    with torch.no_grad():
        embedding = _clip_model.encode_image(img_input)

    embedding = embedding / embedding.norm(dim=-1, keepdim=True)
    return embedding.cpu().numpy().squeeze()


def image_to_combined_embedding(image, size=392):
    # Resize image một lần cho cả 2 models
    image_resized = resize_image(image, size=(size, size))
    # Extract DINOv2 features (high-res)
    dinov2_vec = image_to_dinov2_embedding(image_resized, size=size)
    # Extract CLIP features (always 224x224)
    clip_vec = image_to_clip_embedding(image_resized, size=224)
    # Concatenate
    combined_vec = np.concatenate([dinov2_vec, clip_vec])
    # L2 normalize
    combined_vec = combined_vec / np.linalg.norm(combined_vec)
    return combined_vec

def process_image_with_background_removal(img_path, resolution=392,
                                          remove_bg=True, save_no_bg=True, output_dir='output'):

    # Tạo output folder nếu chưa có
    os.makedirs(output_dir, exist_ok=True)
    # Step 1: Load ảnh
    if not os.path.exists(img_path):
        print(f"File không tồn tại: {img_path}")
        return None

    print(f"\n[1/4] Loading image: {img_path}")
    img = Image.open(img_path)
    print(f"      Original size: {img.size}")
    base_name = os.path.splitext(os.path.basename(img_path))[0]
    # Step 2: Remove background
    if remove_bg:
        print("\n[2/4] Removing background...")
        img_no_bg = remove_background_offline(img_path)

        if img_no_bg is None:

            img_no_bg = img
        # Lưu ảnh no background (kích thước gốc)
        if save_no_bg:
            no_bg_path = os.path.join(output_dir, f"{base_name}_no_bg.png")
            img_no_bg.save(no_bg_path)

    else:
        img_no_bg = img
    # Step 3: Resize và lưu ảnh resized
    img_resized = resize_image(img_no_bg, size=(resolution, resolution))

    if save_no_bg:
        resized_path = os.path.join(output_dir, f"{base_name}_no_bg_{resolution}.png")
        img_resized.save(resized_path)

        # Step 4: Extract embedding
    embedding = image_to_combined_embedding(img_resized, size=resolution)


    return embedding

if __name__ == '__main__':
    img = "Audi A4.jpg"

    # Hiển thị toàn bộ vector không rút gọn
    np.set_printoptions(threshold=np.inf, precision=5, suppress=True)

    vector = process_image_with_background_removal(img)
    if vector is not None:
        print("\nVector embedding đầy đủ:")
        print(vector)
        print("\nKích thước vector:", vector.shape)

