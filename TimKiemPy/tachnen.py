
from rembg import remove
from PIL import Image
from io import BytesIO
import os


def remove_background_offline(input_path):
    """
    Xóa background bằng rembg (AI-powered)
    Tốt hơn nhiều so với remove_black_background()
    """
    if not os.path.exists(input_path):
        print(f" File '{input_path}' không tồn tại!")
        return None

    print("Đang xóa background (AI-powered)...")

    try:
        with open(input_path, 'rb') as i:
            input_image = i.read()

        output_bytes = remove(input_image)
        output_image = Image.open(BytesIO(output_bytes))

        print(f"Xóa nền thành công! Kích thước: {output_image.size}")
        return output_image

    except Exception as e:
        print(f"Lỗi: {e}")
        return None
