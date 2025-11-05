import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutWebs from '../pages/index.jsx';
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Content from "../layout/layout/Content-Index.jsx";
import InformationProfile from "../components/C-Profile/informationProfile.jsx";
import ContactProfile from "../components/C-Profile/contactProfile.jsx";
import DashboardAdmin from "../pages/dashboardAdmin.jsx";
import SecurityProfile from "../components/C-Profile/securityProfile.jsx";
import TopUsersChart from "../components/C-Dashboard/TopUsersChart.jsx";
import { menuConfigLogin, menuConfig } from "../configurations/menuConfigurations.js";
import Authenticate from "../pages/Authenticate.jsx";
import SearchStatistics from "../components/C-Dashboard/SearchStatistics.jsx";
import Post from "../pages/Post.jsx";
import Product from "../pages/Product.jsx";
import Profile from "../layout/layout/Profile.jsx";
import DashboardHome from "../components/C-Dashboard/HomeDashboard.jsx";
import FromCategorys from "../components/C-Dashboard/FromCategorys.jsx";
import FromPost from "../components/C-Dashboard/From_Post.jsx";
import CategoryTablet from "../components/C-Dashboard/CategoryTablet.jsx";
import FromProducts from "../components/C-Dashboard/FromProduct.jsx";
import PostTablet from "../components/C-Dashboard/PostTablet.jsx";
import ProductTablet from "../components/C-Dashboard/ProductTablet.jsx";
import StatisticsDashboard from "../components/C-Dashboard/StatisticsDashboard.jsx"
function AppRoutes() {
    const routeProfile = menuConfigLogin.find(item => item.action === "profile");
    const loginRoute = menuConfigLogin.find(item => item.action === "login");
    const registerRoute = menuConfigLogin.find(item => item.action === "register");
    const dashboardAdmin = menuConfig.find(item => item.permission === "ROLE_ADMIN");
    const routeContact = menuConfigLogin.find(item => item.action === "contact");
    const routeSecurity = menuConfigLogin.find(item => item.action === "security");
    const homeRoute = menuConfigLogin.find(item => item.action === "home");
    return (
        <BrowserRouter>
            <Routes>
                <Route path={loginRoute.path} element={<Login />} />
                <Route path="/authenticate" element={<Authenticate />} />
                <Route path={homeRoute.path} element={<LayoutWebs />}>
                    <Route index element={<Content />} />
                    <Route path={routeProfile.path} element={<Profile />}>
                        <Route index element={<InformationProfile />} />
                        <Route path={routeContact.path} element={<ContactProfile />} />
                        <Route path={routeSecurity.path} element={<SecurityProfile />} />
                    </Route>
                    <Route path={dashboardAdmin.path} element={<DashboardAdmin />}>
                        <Route index element={<DashboardHome />} />
                        <Route path="from-post" element={<FromPost />} />
                        <Route path="from-category" element={<FromCategorys />} />
                        <Route path="from-product" element={<FromProducts />} />
                        <Route path="tablet-category" element={<CategoryTablet />} />
                        <Route path="tablet-product" element={<ProductTablet />} />
                        <Route path="tablet-post" element={<PostTablet />} />
                        <Route path="statistics-dashboard" element={<StatisticsDashboard />} />
                    </Route>
                    <Route path="/post" element={<Post />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/thongke" element={<SearchStatistics />} />
                    <Route path="/thongketop" element={<TopUsersChart />} />
                </Route>
                <Route path={registerRoute.path} element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;