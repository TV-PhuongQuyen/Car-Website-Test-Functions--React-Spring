import faiss
import numpy as np
import os
import io
import glob
from PIL import Image
from embedding_utils import process_image_with_background_removal


index_path="faiss_index.bin"
metadata_path="metadata.npy"

def get_image_files(image_dir, extensions=None):
    """Lấy danh sách tất cả file ảnh từ thư mục"""
    if extensions is None:
        extensions = ['*.jpg', '*.JPG', '*.jpeg', '*.JPEG',
                      '*.png', '*.PNG', '*.bmp', '*.BMP',
                      '*.gif', '*.GIF', '*.tiff', '*.TIFF',
                      '*.webp', '*.WEBP']

    image_files = []
    for ext in extensions:
        image_files.extend(glob.glob(os.path.join(image_dir, ext)))

    return sorted(image_files)


def search_similar_images(query_img_input, top_k: int = 5, threshold: float = 0.7):
    """
    Tìm top_k ảnh có embedding gần nhất với ảnh query trong FAISS index (IndexFlatL2).
    query_img_input có thể là:
        - đường dẫn (str)
        - ảnh (PIL.Image.Image)
        - UploadFile (FastAPI)
    """

    # Kiểm tra file index và metadata
    if not (os.path.exists(index_path) and os.path.exists(metadata_path)):
        print(" FAISS index hoặc metadata chưa tồn tại!")
        return []

    # Load index + metadata
    index = faiss.read_index(index_path)
    metadata = np.load(metadata_path, allow_pickle=True).tolist()

    # Đảm bảo là IndexFlatL2
    if not isinstance(index, faiss.IndexFlatL2):
        xb = index.reconstruct_n(0, index.ntotal)
        d = xb.shape[1]
        index = faiss.IndexFlatL2(d)
        index.add(xb)
        faiss.write_index(index, index_path)
        print("Đã chuyển sang IndexFlatL2.")

    # Xử lý đầu vào: path / PIL / UploadFile
    if isinstance(query_img_input, Image.Image):
        # PIL.Image
        tmp_path = os.path.join("output", "temp_query.png")
        os.makedirs("output", exist_ok=True)
        query_img_input.save(tmp_path)
        query_img_path = tmp_path

    elif isinstance(query_img_input, str):
        # Đường dẫn
        query_img_path = query_img_input

    elif hasattr(query_img_input, "file"):  # UploadFile từ FastAPI
        contents = query_img_input.file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        tmp_path = os.path.join("output", "temp_query.png")
        os.makedirs("output", exist_ok=True)
        image.save(tmp_path)
        query_img_path = tmp_path
        query_img_input.file.seek(0)  # reset lại pointer nếu cần dùng lại

    else:
        print(f" Kiểu không hợp lệ: {type(query_img_input)}. Phải là str, PIL.Image.Image, hoặc UploadFile")
        return []

    # Lấy embedding
    query_embedding = process_image_with_background_removal(query_img_path)
    if query_embedding is None:
        print(" Không thể tạo embedding cho ảnh query.")
        return []

    query_embedding = np.array(query_embedding, dtype=np.float32).reshape(1, -1)

    # Tìm kiếm top_k kết quả trong FAISS
    distances, indices = index.search(query_embedding, top_k)
    temp_results = {}
    for idx, dist in zip(indices[0], distances[0]):
        if idx < len(metadata):
            pid = metadata[idx]
            if dist < threshold:
                if pid not in temp_results or dist < temp_results[pid]:
                    temp_results[pid] = float(dist)

    # Chuyển dict thành list và sắp xếp theo khoảng cách tăng dần
    results = [{"product_id": pid, "distance": dist} for pid, dist in temp_results.items()]
    results.sort(key=lambda x: x["distance"])

    # In kết quả
    print("\nKết quả tìm kiếm:")
    for rank, res in enumerate(results, start=1):
        print(f"  {rank}. product_id={res['product_id']} | khoảng cách={res['distance']:.6f}")

    return results



def save_faiss(embedding: np.ndarray, product_id: int):
    """
    Lưu embedding và product_id vào FAISS index + metadata.
    Tự động tạo mới nếu chưa có file index.
    """
    try:
        # Ép kiểu float32 để tương thích với FAISS
        embedding = np.array(embedding, dtype=np.float32)

        # Đảm bảo shape (1, d)
        if embedding.ndim == 1:
            embedding = np.expand_dims(embedding, axis=0)

        d = embedding.shape[1]

        # Load FAISS index và metadata nếu có
        if os.path.exists(index_path) and os.path.exists(metadata_path):
            index = faiss.read_index(index_path)
            metadata = np.load(metadata_path, allow_pickle=True).tolist()
        else:
            print(" Tạo FAISS index mới...")
            index = faiss.IndexFlatL2(d)  # khoảng cách Euclidean
            metadata = []

        # Thêm embedding vào index
        index.add(embedding)
        metadata.append(product_id)

        # Lưu lại
        faiss.write_index(index, index_path)
        np.save(metadata_path, np.array(metadata, dtype=object))

        print(f" Đã lưu embedding (id={product_id}), tổng số mẫu = {index.ntotal}")

    except Exception as e:
        print(f" Lỗi khi lưu FAISS index: {e}")







