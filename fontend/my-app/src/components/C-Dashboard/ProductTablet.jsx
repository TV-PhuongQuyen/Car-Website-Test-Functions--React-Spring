import React, { useState, useEffect } from 'react';
import "../../assets/styles/tablet.css"
import Swal from "sweetalert2";
import FormHeader from "./From_together.jsx";
import { toast } from "react-toastify";
import { getProduct, deleteProduct } from "../../services/productService.js"

const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Trả về "N/A" nếu không có ngày
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

export default function ProductTablet() {
    const pageTitle = "Quản lý sản phẩm";
    const breadcrumbs = [
        { name: "Dashboard" },
        { name: "Quản lý" },
        { name: "Sản phẩm", isCurrent: true },
    ];

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {

                const response = await getProduct();
                console.log("Du lieu:", response)
                setProducts(response.data || []);


            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct()
    }, [])


    const handleDelete = async (productId, productName) => {

        const result = await Swal.fire({
            title: "Xác nhận xóa?",
            text: `Bạn có chắc chắn muốn xóa xe "${productName}" không?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });


        if (result.isConfirmed) {
            try {

                const res = await deleteProduct(productId);
                toast.success(res)
                setProducts(prevProducts =>
                    prevProducts.filter(product => product.id !== productId)
                );


            } catch (error) {
                console.error("Lỗi khi xóa danh mục:", error);
                toast.error("Đã xảy ra lỗi khi xóa. Vui lòng thử lại.")
            }
        }
    };
    return (
        <div className="category-container">
            <FormHeader title={pageTitle} breadcrumbs={breadcrumbs} />

            <nav className="tabs">
                <a href="#" className="tab-item active">Content</a>
                <a href="#" className="tab-item">Media</a>
                <a href="#" className="tab-item ">Articles</a>
            </nav>

            <div className="table-wrapper">
                <table className="articles-table">
                    <thead>
                        <tr>

                            <th>#</th>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Danh mục</th>
                            <th>Người dùng</th>
                            <th>Ngày tạo</th>
                            <th>Ngày update</th>
                            <th className="action-col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>Đang tải dữ liệu...</td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>Không có dữ liệu sản phẩm.</td>
                            </tr>
                        ) : (
                            products.map(product => (
                                <tr key={product.id}>


                                    <td>{product.id}</td>


                                    <td>
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="category-logo"
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.categoryId}</td>
                                    <td>{product.usersId}</td>
                                    <td>{formatDate(product.createdAt)}</td>
                                    <td>{formatDate(product.updatedAt)}</td>


                                    <td className="action-col">
                                        <i onClick={() => handleDelete(product.id, product.name)} className='bx bx-trash'></i>
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