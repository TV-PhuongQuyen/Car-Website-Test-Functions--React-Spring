import faiss
import numpy as np
import os
import json

index_path = "faiss_index.bin"
metadata_path = "metadata.npy"

if os.path.exists(index_path) and os.path.exists(metadata_path):
    # Đọc index & metadata
    index = faiss.read_index(index_path)
    metadata = np.load(metadata_path, allow_pickle=True).tolist()

    print("FAISS index đã tồn tại!")
    print(f"Tổng số vector trong index: {index.ntotal}")
    print(f"Tổng số metadata: {len(metadata)}")

    # Lấy toàn bộ vector
    xb = index.reconstruct_n(0, index.ntotal)

    # Gộp dữ liệu lại
    data = {}
    for i, (pid, vec) in enumerate(zip(metadata, xb), start=1):
        data[f"index_{i}"] = {
            "product_id": pid,
            "vector": vec.tolist()  # numpy array → list để xuất JSON
        }

    # In ra JSON format dễ đọc
    print("\nToàn bộ dữ liệu FAISS:")
    print(json.dumps(data, indent=4, ensure_ascii=False))

    # ✅ In tổng số phần tử (vector)
    print(f"\nTổng phần tử trong FAISS index: {index.ntotal}")

else:
    print(" Chưa có file FAISS hoặc metadata để xem.")
