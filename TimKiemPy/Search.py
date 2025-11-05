import tkinter as tk
from faiss_utils import search_similar_images

if __name__ == "__main__":
    # 🖼 Gắn ảnh cố định (ví dụ ảnh test.jpg trong thư mục images)
    query_path = "Honda City p2.jpg" # Thay đường dẫn bằng ảnh bạn muốn

    print(f" Ảnh được chọn: {query_path}")
    search_similar_images(query_path, top_k=5)
