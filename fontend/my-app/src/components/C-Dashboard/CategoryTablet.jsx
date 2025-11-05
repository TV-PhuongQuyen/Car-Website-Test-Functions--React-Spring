import React, { useState, useEffect } from 'react';
import "../../assets/styles/tablet.css"
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import FormHeader from "./From_together.jsx";
import { getAllCategories, deleteCategory } from "../../services/categorys.js"

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        };
        return new Date(dateString).toLocaleString('vi-VN', options);
    } catch (error) {
        console.error("Lỗi format ngày:", error);
        return dateString;
    }
};

export default function CategoryTablet() {
    const pageTitle = "Quản lý danh mục";
    const breadcrumbs = [
        { name: "Dashboard" },
        { name: "Quản lý" },
        { name: "Danh mục", isCurrent: true },
    ];
    // 1. Tạo state để lưu danh sách categories
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Thêm state loading

    // 2. Dùng useEffect để gọi API khi component được tải
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


    const handleDelete = async (categoryId, categoryName) => {
        const result = await Swal.fire({
            title: "Xác nhận xóa?",
            text: `Bạn có chắc chắn muốn xóa danh mục "${categoryName}" không?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            try {
                // Gọi API
                await deleteCategory(categoryId);
                toast.success(`Thêm danh mục "${categoryName}" thành công`);

                setCategories(prevCategories =>
                    prevCategories.filter(category => category.id !== categoryId)
                );



            } catch (error) {
                console.error("Lỗi khi xóa danh mục:", error);
                toast.error("Lỗi khi xóa danh mục:", error)
            }
        }
    };
    return (
        <div className="category-container">
            <FormHeader title={pageTitle} breadcrumbs={breadcrumbs} />

            {/* Thanh điều hướng tab */}
            <nav className="tabs">
                <a href="#" className="tab-item active">Content</a>
                <a href="#" className="tab-item">Media</a>
                <a href="#" className="tab-item ">Articles</a>
            </nav>

            <div className="table-wrapper">
                <table className="articles-table">
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Hãng xe</th>
                            <th>Mô tả</th>
                            <th>Ngày tạo</th>
                            <th className="action-col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>Đang tải dữ liệu...</td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>Không có dữ liệu danh mục.</td>
                            </tr>
                        ) : (
                            categories.map(category => (
                                < tr key={category.id}>
                                    <td> <img
                                        src={category.logo}
                                        alt={category.name}
                                        className="category-logo" // Thêm class để CSS
                                    /></td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>{formatDate(category.createdAt)}</td>
                                    <td className="action-col">
                                        <i onClick={() => handleDelete(category.id, category.name)} className='bx bx-trash'></i>
                                        <i className='bx bx-edit'></i>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div >
    );
}