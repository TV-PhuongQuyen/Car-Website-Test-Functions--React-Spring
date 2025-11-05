import os

index_path = "faiss_index.bin"
metadata_path = "metadata.npy"

def reset_faiss():
    """Xóa toàn bộ dữ liệu FAISS (index + metadata)."""
    deleted = False
    if os.path.exists(index_path):
        os.remove(index_path)
        deleted = True
        print(" Đã xóa file FAISS index.")

    if os.path.exists(metadata_path):
        os.remove(metadata_path)
        deleted = True
        print(" Đã xóa file metadata.")

    if not deleted:
        print(" Không có file FAISS nào để xóa.")
    else:
        print(" FAISS đã được reset hoàn toàn — hệ thống bắt đầu lại từ đầu.")

if __name__ == "__main__":
    reset_faiss()
