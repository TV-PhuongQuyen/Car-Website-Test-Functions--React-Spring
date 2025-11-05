import "../assets/styles/DashboardAdmin.css";
import logo from "../assets/images/logosieuxe.png";
import useToggle from "../hook/Toggle";
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function DashboardAdmin() {
    const { value: showMenu, toggle: toggleMenu } = useToggle(false);
    const { value: showMenu2, toggle: toggleMenu2 } = useToggle(false);
    const { value: togglehind, toggle: setToggleMenu } = useToggle(true);
    const navigate = useNavigate();
    return (
        <div className="dashboardAdmin">
            <div className="dashboardAdmin_container">
                <div className={`navbar_dashboardAdmin ${togglehind ? "show" : "hide"}`}>
                    <div className="navbar_dashboardAdmin_logo">
                        <div className="flex_center">
                            <img src={logo} alt="Logo"></img>
                            <div>HyperDrive</div>
                        </div>

                    </div>
                    <div className="navbar_dashboardAdmin_menu">

                        <div className="menu_section">
                            <div className="menu_title">
                                <i className='bx bx-home' onClick={() => navigate("/admin")}><span>Home</span></i>
                            </div>
                        </div>

                        <div className="menu_section">
                            <div className="menu_title" onClick={toggleMenu} >
                                <i className='bx bx-cog'> <span>Quản lý</span></i>
                                <i className='bx bx-chevron-down arrow_icon'></i>
                            </div>
                            <ul className={`menu_list menu_manage ${showMenu ? "show" : "hide"}`}>
                                <li className="menu_item"><i className='bx bx-shield'></i> Phân quyền</li>
                                <li className="menu_item"><i className='bx bx-lock-alt'></i> Cập quyền truy cập</li>
                                <li className="menu_item" onClick={() => navigate("tablet-category")}><i className='bx bx-car'></i> Danh mục</li>
                                <li className="menu_item" onClick={() => navigate("tablet-post")}><i className='bx bx-news'></i> Bài viết</li>
                                <li className="menu_item" onClick={() => navigate("tablet-product")} ><i className='bx bx-package'></i> Sản phẩm</li>
                                <li className="menu_item" onClick={() => navigate("statistics-dashboard")}><i className='bx bx-bar-chart'></i> Thống kê</li>
                            </ul>
                        </div>

                        <div className="menu_section" >
                            <div className="menu_title" onClick={toggleMenu2}>
                                <i className='bx bx-wrench'><span>Chức năng</span></i>
                                <i className='bx bx-chevron-down arrow_icon'></i>
                            </div>
                            <ul className={`menu_list menu_from ${showMenu2 ? "show" : "hide"}`}>
                                <li className="menu_item"><i className='bx bx-shield-plus'></i> Phân quyền</li>
                                <li className="menu_item"><i className='bx bx-lock-open'></i> Cập quyền truy cập</li>
                                <li className="menu_item" onClick={() => navigate("from-post")}><i className='bx bx-edit'></i> Tạo bài viết</li>
                                <li className="menu_item" onClick={() => navigate("from-category")}><i className='bx bx-car'></i> Tạo danh mục</li>
                                <li className="menu_item" onClick={() => navigate("from-product")}><i className='bx bx-plus-circle'></i> Tạo sản phẩm</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="dashboardAdmin_viewContainer">
                    <div className="dashboardAdmin_header">
                        <div className="toggle-menu" onClick={setToggleMenu}>
                            <i className='bx bx-menu-alt-left'></i>
                        </div>
                        <input type="search" placeholder="Tìm kiếm..." />
                    </div>
                    <div className="dashboardAdmin_view">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}