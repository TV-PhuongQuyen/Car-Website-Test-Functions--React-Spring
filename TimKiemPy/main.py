
import os
from PIL import Image
import io
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from embedding_utils import process_image_with_background_removal
from faiss_utils import save_faiss, search_similar_images
from fastapi.responses import FileResponse
app = FastAPI()

OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/encode")
async def encode(product_id: int = Form(...), file: UploadFile = File(...)):
    try:
        print(f"Received product_id={product_id}")
        filename = file.filename or f"product_{product_id}.jpg"
        file_path = os.path.join(OUTPUT_DIR, filename)

        # Lưu file upload
        with open(file_path, "wb") as f:
            f.write(await file.read())

        print(f" File saved: {file_path}")

        #  Gọi xử lý ảnh bằng path
        embedding = process_image_with_background_removal(file_path)
        save_faiss(embedding, product_id)

        return {
            "status": "ok",
            "product_id": product_id,
            "image_path": file_path  # Trả path ảnh ra luôn
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/search_image_product")
async def search_image_product(file: UploadFile = File(...), k: int = 5):
    results = search_similar_images(file, top_k=k)
    return {"results": results}  # ✅ đổi từ "id" → "results"


# @app.get("/check_index")
# async def check_index():
#     return get_status()
#
# @app.delete("/clear_all")
# async def clear_all():
#     from faiss_store import clear_index
#     result = clear_index()
#     return result
#
# @app.delete("/delete_product/{product_id}")
# async def delete_product(product_id: int):
#     success = soft_delete(product_id)
#     if success:
#         return {
#             "status": "ok",
#             "message": f"Product {product_id} marked as deleted",
#             "deleted_products": list(get_status()["deleted_products"])  # thêm danh sách id đã xoá
#         }
#     return {
#         "status": "error",
#         "message": "Product ID not found",
#         "deleted_products": list(get_status()["deleted_products"])
#     }

