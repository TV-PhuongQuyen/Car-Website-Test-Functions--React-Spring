import React, { useState, useEffect } from 'react';
import "../../assets/styles/tablet.css"
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import FormHeader from "./From_together.jsx";
import { getPost, deletePost } from '../../services/postService.js';

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

export default function PostTablet() {
    const pageTitle = "Quản lý bài viết";
    const breadcrumbs = [
        { name: "Dashboard" },
        { name: "Quản lý" },
        { name: "Bài viết", isCurrent: true },
    ];
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [posts, setPosts] = useState([]);

    const [isLoading, setIsLoading] = useState(true); // Thêm state loading

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                const result = await getPost(page);   // lấy theo page
                setPosts(result.data || []);
                setTotalPages(result.totalPages || 1);
            } catch (error) {
                console.error("Lỗi khi tải bài viết:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [page]); // thêm page dependency

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Xác nhận xóa?",
            text: `Bạn có chắc chắn muốn xóa bài viết không?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            try {
                const res = await deletePost(id);

                // Xóa ngay trên FE cho mượt
                setPosts(prev => prev.filter(p => p.id !== id));

                toast.success(res)
            } catch (error) {
                toast.error(error)
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
                            <th>#</th>
                            <th>Người dùng</th>
                            <th>Nội dung</th>
                            <th>Ảnh</th>
                            <th>Chế độ</th>
                            <th>Ngày tạo</th>
                            <th>Ngày sửa</th>
                            <th className="action-col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center' }}>Đang tải dữ liệu...</td>
                            </tr>
                        ) : posts.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center' }}>Không có dữ liệu bài viết.</td>
                            </tr>
                        ) : (
                            posts.map((post, index) => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.usersId} - {post.firstname}{post.lastname}</td>
                                    <td>{post.context}</td>
                                    <td>
                                        <img
                                            src={post.mediaUrl}
                                            alt=""

                                        />
                                    </td>
                                    <td>{post.privacy}</td>
                                    <td>{formatDate(post.createdAt)}</td>
                                    <td>{formatDate(post.updatedAt)}</td>
                                    <td className="action-col">
                                        <i onClick={() => handleDelete(post.id)} className='bx bx-trash'></i>
                                        <i className='bx bx-edit'></i>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                    >
                        &lt;
                    </button>

                    <span style={{ margin: "0 12px" }}>
                        {page} / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(prev => prev + 1)}
                    >
                        &gt;
                    </button>
                </div>

            </div>
        </div >
    );
}