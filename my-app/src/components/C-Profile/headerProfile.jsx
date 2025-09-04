import avatar from "../../assets/images/profile img.png";
import "../../assets/styles/Profile/HeaderProfile.css";
import { useState, useEffect } from "react";
import ButtonContent from "../C-From/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile, fetchUpdateAvatar } from "../../store/ProfileStore.js";

function HeaderProfile() {
    const dispatch = useDispatch();
    const { result, loading, error } = useSelector((state) => state.profile);

    const [showAvatar, setShowAvatar] = useState(false);
    const [originalAvatar, setOriginalAvatar] = useState(avatar);
    const [nameFile, setNameFile] = useState("Chưa có tệp nào được chọn");
    const [showFromAvatar, setshowFromAvatar] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        avatar: "",
    });

    useEffect(() => {
        dispatch(fetchMyProfile());
    }, [dispatch]);

    useEffect(() => {
        if (result) {
            setProfile(result);
            setOriginalAvatar(result.avatar || avatar);
        }
    }, [result]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                alert("Chỉ chấp nhận file ảnh (JPG, PNG, GIF)");
                return;
            }
            setSelectedFile(file);
            setNameFile(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({
                    ...prev,
                    avatar: reader.result // hiển thị preview
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFromShowAvatar = (e) => {
        e.preventDefault();
        setshowFromAvatar(prev => !prev);
        if (setshowFromAvatar) {
            setProfile(prev => ({
                ...prev,
                avatar: originalAvatar
            }));
            setNameFile("Chưa có tệp nào được chọn");
            setSelectedFile(null); // Reset selected file
        }
    }
    const handleShowAvatar = (e) => {
        e.preventDefault();
        setShowAvatar(prev => !prev);
    }
    const handleUploadAvatar = async () => {
        if (!selectedFile) {
            alert("Bạn chưa chọn ảnh!");
            return;
        }
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", selectedFile);

            // gọi redux
            await dispatch(fetchUpdateAvatar(formData)).unwrap();

            alert("Cập nhật thành công!");
            setshowFromAvatar(false);
        } catch (err) {
            console.error("Lỗi khi upload avatar:", err);
            alert("Lỗi khi tải ảnh lên. Vui lòng thử lại.");
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className="Profile_content_header">
            <div className="Profile_content_header_info">
                {showAvatar && (
                    <div className="Profile_content_header_focusImg">
                        <div className="Profile_content_header_focusImg_container">
                            <i onClick={handleShowAvatar} className="bx bx-chevron-right-circle"></i>
                            <div className="Profile_content_header_focusImg_content">
                                <img src={profile.avatar || avatar} alt="Avatar" />
                            </div>
                        </div>

                    </div>
                )}
                {showFromAvatar && (
                    <div className="ChangeAvatar">
                        <div className="ChangeAvatar_container">
                            <div className="ChangeAvatar_container_header">
                                <div className="flex_center">
                                    <i id="iconcamera" className="fa-solid fa-camera"></i>
                                    <div>Cập nhật Avatar</div>
                                </div>
                                <div onClick={handleFromShowAvatar} className="icon_close">
                                    <i className='bx bx-x'></i>
                                </div>
                            </div>
                            <div className="ChangeAvatar_container_body flex_center">
                                <img onClick={handleShowAvatar} src={profile.avatar || avatar}></img>
                            </div>
                            <div>Tải ảnh từ máy</div>
                            <div className="ChangeAvatar_container_body_upload">
                                <div onClick={() => document.getElementById("avatarUpload").click()} className="ChangeAvatar_container_body_upload_btn">
                                    <div className="selectFile">
                                        Chọn tệp
                                    </div>
                                    <input type="text" value={nameFile} disabled>
                                    </input>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="avatarUpload"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <i onClick={() => document.getElementById("avatarUpload").click()} className='bx bx-archive-out'></i>
                            </div>
                            <span>Chọn file ảnh (JPG, PNG, GIF). Tối đa 10MB</span>
                            <div className="ChangeAvatar_container_body_btn">
                                <ButtonContent
                                    id="btn_cancel"
                                    onClick={handleFromShowAvatar}
                                    title={<>
                                        <i className="bx bx-x"></i> Hủy
                                    </>}
                                />
                                <ButtonContent
                                    id="btn_save"
                                    onClick={handleUploadAvatar}
                                    title={
                                        <>
                                            <i className='bx bx-check'></i> Lưu
                                        </>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )
                }
                <div className="flex_center Profile_content_header_info_avatar">
                    <img onClick={handleShowAvatar} src={profile.avatar || avatar} alt="Avatar"></img>
                    <i
                        onClick={handleFromShowAvatar} className="fa-solid fa-camera">
                    </i>
                </div>
                <div className="Profile_content_header_info_name">
                    <h2>{profile.firstname} {profile.lastname}</h2>
                </div>
            </div>
            <div className="Profile_content_header_time">
                <div className="time_together">
                    <p>13-2-2003</p>
                    <span>Ngày bắt đầu</span>
                </div>
                <div className="time_together">
                    <p>4 ngày</p>
                    <span>Thời gian tài khoản</span>
                </div>
            </div>
        </div>
    );
}
export default HeaderProfile;