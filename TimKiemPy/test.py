import os
from tkinter import Tk, filedialog
from faiss_utils import save_faiss
from embedding_utils import  process_image_with_background_removal

if __name__ == "__main__":
    # Ẩn cửa sổ gốc của Tkinter
    root = Tk()
    root.withdraw()

    #  Hộp thoại chọn ảnh
    img_path = filedialog.askopenfilename(
        title="Chọn ảnh cần encode",
        filetypes=[("Image files", "*.jpg;*.jpeg;*.png;*.bmp;*.webp")]
    )

    # Nếu người dùng không chọn ảnh
    if not img_path:
        print(" Bạn chưa chọn ảnh nào!")
        exit()

    print(f"️ Ảnh được chọn: {img_path}")

    # Gắn cứng product_id hoặc tự tăng nếu muốn
    product_id = 39


    # Xử lý ảnh → embedding
    embedding = process_image_with_background_removal(img_path)

    if embedding is None:
        print(" Không tạo được embedding.")
    else:
        print(" Tạo embedding thành công. Lưu vào FAISS...")
        save_faiss(embedding, product_id)
        print(f" Đã lưu embedding cho product_id={product_id}")
