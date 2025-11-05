import "../../assets/styles/profile.css";
import SelectOptionProfile from "../../components/C-Profile/selectOptionProfile";
import HeaderProfile from "../../components/C-Profile/headerProfile";
import { Outlet } from "react-router-dom";
function Profile() {

    return (
        <div className="Profile">
            <div className="Profile_container ">
                <div className="Profile_content">
                    <HeaderProfile />
                    <SelectOptionProfile />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
export default Profile;