import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../loading.jsx";
import "../../assets/styles/fromProducts.css";
import FormHeader from "./From_together.jsx";
import uploadLogo from "../../assets/images/add img.png";
import { createProduct } from "../../services/productService.js";
import { getAllCategories } from "../../services/categorys.js"
export default function FromProducts() {
    const pageTitle = "Thêm Sản Phẩm Mới";
    const breadcrumbs = [
        { name: "Dashboard" },
        { name: "Chức năng" },
        { name: "Thêm mới sản phẩm", isCurrent: true },
    ];

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [images, setImages] = useState({
        cover: null,
        front: null,
        back: null,
        left: null,
        right: null,
    });
    const [preview, setPreview] = useState({
        cover: uploadLogo,
        front: uploadLogo,
        back: uploadLogo,
        left: uploadLogo,
        right: uploadLogo,
    });
    const handleClick = (key) => {
        document.getElementById(key).click();
    };
    // Khi người dùng chọn ảnh
    const handleImageChange = (e, key) => {
        const file = e.target.files[0];
        if (file) {
            setImages((prev) => ({ ...prev, [key]: file }));
            setPreview((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
        }
    };
    //  Gửi dữ liệu lên API
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate
        const imageFiles = Object.values(images).filter((img) => img !== null);
        if (!productName || !price || !categoryId || imageFiles.length === 0) {
            toast.error(" Vui lòng nhập đầy đủ thông tin và chọn hình ảnh sản phẩm!");
            return;
        }
        setIsSubmitting(true);
        try {
            const productRequest = {
                name: productName,
                price: price,
                categoryId: categoryId,
            };

            await createProduct(productRequest, imageFiles);

            toast.success(" Thêm sản phẩm thành công!");

            // Reset form
            setProductName("");
            setPrice("");

            setCategory("");
            setImages({
                cover: null,
                front: null,
                back: null,
                left: null,
                right: null,
            });
            setPreview({
                cover: uploadLogo,
                front: uploadLogo,
                back: uploadLogo,
                left: uploadLogo,
                right: uploadLogo,
            });
        } catch (error) {
            toast.error(" Thêm sản phẩm thất bại!");
            console.error(error);
        } finally {
            setIsSubmitting(false); //  Ẩn loading khi xử lý xong
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                // Gọi API để lấy tất cả danh mục
                const data = await getAllCategories();
                setCategories(data || []); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
                // Xử lý lỗi (ví dụ: hiển thị thông báo)
            } finally {
                setIsLoading(false); // Dừng loading
            }
        };

        fetchCategories();
    }, []); // [] đảm bảo useEffect chỉ chạy 1 lần
    return (
        <div className="fromProducts_container">
            <FormHeader title={pageTitle} breadcrumbs={breadcrumbs} />
            {isSubmitting && <Loading />}

            <div className="fromProducts_content">
                <form className="fromProducts_form" onSubmit={handleSubmit}>
                    <div className="form_group">
                        <label className="form_label">Tên Sản Phẩm</label>
                        <input
                            type="text"
                            className="form_input"
                            placeholder="Nhập tên sản phẩm"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="form_group">
                        <label className="form_label">Giá</label>
                        <input
                            type="number"
                            className="form_input"
                            placeholder="Nhập giá sản phẩm"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form_group">
                        <label className="form_label">Danh Mục</label>
                        <select
                            className="form_input"
                            value={categoryId}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ fontSize: "16px", padding: "8px 12px" }}
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>

                                ))
                            ) : (
                                <option disabled>Đang tải...</option>
                            )}
                        </select>
                    </div>


                    <div className="Upload_image_section form_group">
                        <label className="form_label">Hình Ảnh Sản Phẩm</label>
                        <div className="upload_image_container">
                            <div className="background_img">
                                <div
                                    className="upload_image"
                                    onClick={() => handleClick("cover")}
                                    style={{ width: "300px", height: "100%" }}
                                >
                                    <img src={preview.cover} alt="Ảnh bìa" />
                                    <p style={{ fontSize: "20px" }}>Ảnh bìa</p>
                                    <input
                                        id="cover"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={(e) => handleImageChange(e, "cover")}
                                    />
                                </div>
                            </div>

                            <div className="secondary_img">
                                {[
                                    { key: "front", label: "Phía trước" },
                                    { key: "back", label: "Phía sau" },
                                    { key: "left", label: "Bên trái" },
                                    { key: "right", label: "Bên phải" },
                                ].map(({ key, label }) => (
                                    <div
                                        key={key}
                                        className="upload_image"
                                        onClick={() => handleClick(key)}
                                    >
                                        <img src={preview[key]} alt={label} />
                                        <p>{label}</p>
                                        <input
                                            id={key}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(e) => handleImageChange(e, key)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="form_button" disabled={isSubmitting}>
                        {isSubmitting ? "Đang xử lý..." : "Thêm Sản Phẩm"}
                    </button>
                </form>
            </div>
        </div>
    );
}
