import React from 'react';
// Mình giữ lại import CSS này theo snippet của bạn
import "../../assets/styles/fromTogether.css";

/**
 * Component Header chung cho các Form
 * @param {object} props
 * @param {string} props.title - Tiêu đề chính của trang (H1)
 * @param {Array<{name: string, isCurrent?: boolean}>} props.breadcrumbs - Mảng các đối tượng breadcrumb
 */
export default function FormHeader({ title, breadcrumbs = [] }) {
    return (
        // Mình giữ lại các class CSS từ snippet của bạn
        <div className="fromTogether_container">
            <div className="fromTogether_header">
                {/* Tiêu đề đã được chuyển thành biến 'title' */}
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>

                {/* Breadcrumbs được tự động tạo ra từ mảng 'breadcrumbs' */}
                <div className="text-sm text-gray-500 mt-1">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            {/* Thêm dấu "/" phân cách VÀ KHOẢNG TRẮNG */}
                            {index > 0 && <span className="mx-1"> / </span>}

                            {/* Áp dụng class 'font-medium' nếu là breadcrumb hiện tại */}
                            <span className={crumb.isCurrent ? "font-medium text-gray-900" : "text-gray-500"}>
                                {crumb.name}
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}