import Input from "../../components/C-From/Input.jsx";
import { useState, useEffect } from "react";
import Loading from "../loading.jsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile, clearProfile, fetchUpdateProfile } from "../../store/ProfileStore.js";


function InformationProfile() {
    const dispatch = useDispatch();
    const { result, loading, error } = useSelector((state) => state.profile);
    const [inputValue, setInputValue] = useState(false);
    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        dob: "",
        city: "",
    });

    useEffect(() => {
        dispatch(fetchMyProfile());
    }, [dispatch]);

    useEffect(() => {
        if (result) {
            setProfile(result);
        }
    }, [result]);
    const ActionUpdate = () => {
        setInputValue((prev) => !prev);
        if (inputValue) {
            setProfile(result);
            setInputValue(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleCancel = () => {
        setProfile(result);
        setInputValue(false);
    };
    const handleSave = async () => {
        try {
            await dispatch(fetchUpdateProfile(profile)).unwrap();
            toast.success("Cập nhật thành công!");
            setInputValue(false); // thoát chế độ edit
        } catch (err) {
            console.error("Lỗi khi lưu profile:", err);
            toast.error("Cập nhật thất bại!");
        }
    };
    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;
    return (
        <div className="Profile_content_bottom">
            <div className="Profile_content_bottom_title">
                <div>Thông tin cá nhân</div>
                <div
                    className="Profile_content_bottom_flex"
                    onClick={ActionUpdate}
                >
                    <button className="btn btn-primary">
                        <i className="fa-solid fa-pen-to-square"></i>Cập nhật
                    </button>
                </div>
            </div>

            <div className="Profile_content_bottom_info">
                <div className="Profile_content_bottom_info_content">
                    <Input
                        type="text"
                        label="Tên đệm"
                        name="firstname"
                        value={profile.firstname || ""}
                        onChange={handleChange}
                        disabled={!inputValue}
                        style={{ cursor: !inputValue ? "not-allowed" : "text" }}
                    />

                    <Input
                        type="text"
                        label="Tên"
                        name="lastname"
                        value={profile.lastname || ""}
                        onChange={handleChange}
                        disabled={!inputValue}
                        style={{ cursor: !inputValue ? "not-allowed" : "text" }}
                    />

                    <Input
                        type="date"
                        label="Ngày sinh"
                        name="dob"
                        value={profile.dob || ""}
                        onChange={handleChange}
                        disabled={!inputValue}
                        style={{ cursor: !inputValue ? "not-allowed" : "text" }}
                    />

                    <Input
                        type="text"
                        label="Nơi sinh"
                        name="city"
                        value={profile.city || ""}
                        onChange={handleChange}
                        disabled={!inputValue}
                        style={{ cursor: !inputValue ? "not-allowed" : "text" }}
                    />
                </div>
                {inputValue && (
                    <div className="Profile_content_bottom_info_action">
                        <button onClick={handleCancel} id="cancel">Hủy</button>
                        <button onClick={handleSave} id="save">
                            <i className="bx bxs-save"></i>Lưu và thay đổi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InformationProfile;
