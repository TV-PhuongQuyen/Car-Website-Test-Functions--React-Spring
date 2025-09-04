import { useNavigate, useLocation } from "react-router-dom";
import { menuConfigLogin } from "../../configurations/menuConfigurations";
import "../../assets/styles/Profile/SelectOption.css";


function SelectOptionProfile() {
    const navigate = useNavigate();
    const location = useLocation();

    const routeProfile = menuConfigLogin.find(item => item.action === "profile");

    const routeContact = menuConfigLogin.find(item => item.action === "contact");

    const routeSecurity = menuConfigLogin.find(item => item.action === "security");
    return (
        <div className="Profile_content_top">
            <div
                className={`Profile_content_top_flex${location.pathname === routeProfile.path ? " active" : ""}`}
                onClick={() => navigate(routeProfile.path)}
            >
                <i className="fa-regular fa-circle-user"></i>
                <p>{routeProfile.label}</p>
            </div>
            <div
                className={`Profile_content_top_flex${location.pathname === routeContact.path ? " active" : ""}`}
                onClick={() => navigate(routeContact.path)}
            >
                <i className='bx bxs-contact'></i>
                <p>{routeContact.label}</p>
            </div>
            <div
                className={`Profile_content_top_flex${location.pathname === routeSecurity.path ? " active" : ""}`}
                onClick={() => navigate(routeSecurity.path)}
            >
                <i className='bx bx-shield-alt-2'></i>
                <p>{routeSecurity.label}</p>
            </div>
        </div>
    );
};
export default SelectOptionProfile;