import { useState } from "react";
import { toast } from "react-toastify";
import "../../assets/styles/fromCategory.css";
import Loading from "../loading.jsx";
import FormHeader from "./From_together.jsx";
import uploadLogo from "../../assets/images/Upload-PNG-HD-Image.png";
import { createCategory } from "../../services/categorys.js";

export default function FromCategorys() {
    const pageTitle = "Thêm Danh Mục Ô Tô Mới";
    const breadcrumbs = [
        { name: 'Dashboard' },
        { name: 'Danh mục' },
        { name: 'Thêm mới', isCurrent: true }
    ];

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUploadClick = () => {
        document.getElementById("fileInput").click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName || !description || !selectedFile) {
            toast.error(" Vui lòng nhập đầy đủ thông tin và chọn logo!");
            return;
        }

        const categoryRequest = {
            name: categoryName,
            description: description,
        };
        setIsSubmitting(true);
        try {
            await createCategory(categoryRequest, selectedFile);
            toast.success("Thêm danh mục thành công!");

            // Reset form
            setCategoryName("");
            setDescription("");
            setSelectedFile(null);
            setPreviewImage(null);
        } catch (error) {
            console.error("Lỗi khi thêm danh mục:", error);
            toast.error(" Thêm danh mục thất bại!");
        } finally {
            setIsSubmitting(false); //  Ẩn loading khi xử lý xong
        }
    };

    return (
        <div className="fromCategorys_container">
            <FormHeader title={pageTitle} breadcrumbs={breadcrumbs} />

            <div className="fromCategorys_content">
                {isSubmitting && <Loading />}
                <form className="fromCategorys_form" onSubmit={handleSubmit}>
                    <div className="form_group">
                        <label className="form_label">Tên Danh Mục</label>
                        <input
                            type="text"
                            className="form_input"
                            placeholder="Nhập tên danh mục"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>

                    <div className="form_group">
                        <label className="form_label">Mô Tả</label>
                        <input
                            type="text"
                            className="form_input"
                            placeholder="Mô tả danh mục"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="from_upload" onClick={handleUploadClick}>
                        <img
                            src={previewImage || uploadLogo}
                            alt="Upload Logo"
                            className="from_upload-image"
                        />
                        <label className="form_label">
                            {previewImage ? "Đã chọn logo" : "Tải hình ảnh logo"}
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit" className="form_button" disabled={isSubmitting}>
                        {isSubmitting ? "Đang xử lý..." : "Thêm Danh mục"}
                    </button>
                </form>
            </div>
        </div>
    );
}
