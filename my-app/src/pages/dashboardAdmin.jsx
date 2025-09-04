import "../assets/styles/DashboardAdmin.css";
import logo from "../assets/images/logosieuxe.png";
import useToggle from "../hook/Toggle";
export default function DashboardAdmin() {
    const { value: showMenu, toggle: toggleMenu } = useToggle(false);
    const { value: showMenu2, toggle: toggleMenu2 } = useToggle(false);
    return (
        <div className="dashboardAdmin">
            <div className="dashboardAdmin_container">
                <div className="navbar_dashboardAdmin">
                    <div className="navbar_dashboardAdmin_logo">
                        <div className="flex_center">
                            <img src={logo} alt="Logo"></img>
                            <div>HyperDrive</div>
                        </div>
                        <div>
                            Bảng điều khiển
                        </div>
                        <span>Quản trị hệ thống</span>
                    </div>
                    <div className="navbar_dashboardAdmin_menu">

                        <div className="menu_section">
                            <div className="menu_title">
                                <i className='bx bx-home'><span>Home</span></i>
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
                                <li className="menu_item"><i className='bx bx-user'></i> Người dùng</li>
                                <li className="menu_item"><i className='bx bx-news'></i> Bài viết</li>
                                <li className="menu_item"><i className='bx bx-package'></i> Sản phẩm</li>
                                <li className="menu_item"><i className='bx bx-bar-chart'></i> Thống kê</li>
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
                                <li className="menu_item"><i className='bx bx-edit'></i> Tạo Post</li>
                                <li className="menu_item"><i className='bx bx-plus-circle'></i> Tạo Sản phẩm</li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="dashboardAdmin_view">
                    Nội dung bảng điều khiển
                </div>
            </div>
        </div>
    )
}