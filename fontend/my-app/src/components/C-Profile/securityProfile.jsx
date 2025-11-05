import Input from "../../components/C-From/Input.jsx";
import { useState } from "react";

function SecurityProfile() {
    const [inputValue, setInputValue] = useState(false);

    const ActionUpdate = () => {
        setInputValue(prev => !prev);
    }
    return (
        <div className="Profile_content_bottom">
            <div className="Profile_content_bottom_title">
                <div>Bảo mật</div>
                <div className="Profile_content_bottom_flex" onClick={ActionUpdate}>
                    <button className="btn btn-primary"><i className='bx bxs-wrench'></i>Đổi mật khẩu</button>
                </div>
            </div>
            <div className="Profile_content_bottom_info">
                <div className="Profile_content_bottom_info_content">
                    <Input
                        type="text"
                        label="Username"
                        disabled
                        style={{ cursor: "not-allowed" }}
                    />
                    {inputValue && (
                        <Input
                            type="Password"
                            label="Mật khẩu cũ"
                        />
                    )

                    }
                </div>
                {inputValue && (
                    <div className="Profile_content_bottom_info_action">
                        <button id="cancel">Hủy</button>
                        <button id="save" ><i className='bx bxs-save' ></i>Xác nhận</button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SecurityProfile;