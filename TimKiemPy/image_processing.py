import numpy as np
from PIL import Image
import onnxruntime as ort
import traceback
import gc

# ✅ Load model một lần khi khởi động
print("🔹 Khởi tạo model ONNX...")
try:
    background_session = ort.InferenceSession("background_removal.onnx", providers=["CPUExecutionProvider"])
    print("✅ background_removal.onnx loaded")
except Exception as e:
    background_session = None
    print(f"⚠️ Không thể load background model: {e}")

try:
    embedding_session = ort.InferenceSession("image_encoder.onnx", providers=["CPUExecutionProvider"])
    print("✅ image_encoder.onnx loaded")
except Exception as e:
    embedding_session = None
    print(f"⚠️ Không thể load embedding model: {e}")

def process_image_with_background_removal(image_path: str):
    """
    Xử lý ảnh: xóa background (nếu có) + sinh embedding đặc trưng
    """
    try:
        # Xóa nền (tùy chọn)
        if background_session:
            img = Image.open(image_path).convert("RGB").resize((512, 512))
            input_array = np.array(img).astype(np.float32) / 255.0
            input_array = np.transpose(input_array, (2, 0, 1))[None, ...]
            background_session.run(None, {background_session.get_inputs()[0].name: input_array})
            print("Background removed")
        else:
            print(" Không dùng model background remover")

        # Sinh embedding
        if embedding_session:
            img = Image.open(image_path).convert("RGB").resize((512, 512))
            input_array = np.array(img).astype(np.float32) / 255.0
            input_array = np.transpose(input_array, (2, 0, 1))[None, ...]
            embedding = embedding_session.run(None, {embedding_session.get_inputs()[0].name: input_array})[0].flatten()
            return embedding
        else:
            print("⚠️ Không có model embedding")
            return np.random.rand(512)

    except Exception as e:
        print("❌ process_image_with_background_removal lỗi:", e)
        traceback.print_exc()
        return None
    finally:
        gc.collect()
