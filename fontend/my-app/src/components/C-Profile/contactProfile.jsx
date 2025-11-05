import Input from "../../components/C-From/Input.jsx";
import { useState } from "react";

function ContactProfile() {
    const [inputValue, setInputValue] = useState(false);

    const ActionUpdate = () => {
        setInputValue(prev => !prev);
    }
    return (
        <div className="Profile_content_bottom">
            <div className="Profile_content_bottom_title">
                <div>Thông tin liên hệ</div>
                <div className="Profile_content_bottom_flex" onClick={ActionUpdate}>
                    <button className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i>Cập nhật</button>
                </div>
            </div>
            <div className="Profile_content_bottom_info">
                <div className="Profile_content_bottom_info_content">
                    <Input
                        type="text"
                        label="Số điện thoại"
                        disabled={!inputValue}
                        style={{ cursor: !inputValue ? "not-allowed" : "text" }}
                    />
                    <Input
                        type="text"
                        label="Email"
                        disabled={!inputValue}
                        style={{ cursor: !inputValue ? "not-allowed" : "text" }}
                    />
                    <Input
                        type="text"
                        label="Facebook"
                        disabled={!inputValue}
                        style={{ cursor: !inputValue ? "not-allowed" : "text" }}
                    />
                </div>
                {inputValue && (
                    <div className="Profile_content_bottom_info_action">
                        <button id="cancel">Hủy</button>
                        <button id="save"><i className='bx bxs-save' ></i>Lưu và thay đổi</button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ContactProfile;