import Input from "../C-From/Input"
import icon_img from "../../assets/images/icon-img.png"
import "../../assets/styles/FromPost.css"
import Loading from "../loading.jsx";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "../../store/ProfileStore.js";
import { createPost } from "../../services/postService.js";
import ButtonContent from "../C-From/Button"
import FormHeader from "./From_together.jsx";

export default function FromPost() {
    const dispatch = useDispatch();
    const { result, loading, error } = useSelector((state) => state.profile);
    const [selectedFile, setSelectedFile] = useState(null);
    const editorRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [privacy, setPrivacy] = useState("PUBLIC");

    const [showImg, setShowImg] = useState(false);
    const [savedRange, setSavedRange] = useState(null); // Lưu vùng bôi đen
    const pageTitle = "Tạo bài Post";
    const breadcrumbs = [
        { name: "Dashboard" },
        { name: "chức năng" },
        { name: "tạo post", isCurrent: true },
    ];
    useEffect(() => {
        dispatch(fetchMyProfile());
        console.log(result)
    }, [dispatch]);
    // Lưu selection khi user bôi đen
    const saveSelection = () => {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            setSavedRange(sel.getRangeAt(0));
        }
    };

    // Khôi phục selection khi click button
    const restoreSelection = () => {
        const sel = window.getSelection();
        if (savedRange) {
            sel.removeAllRanges();
            sel.addRange(savedRange);
        }
    };

    const formatText = (command) => {
        if (editorRef.current) {
            editorRef.current.focus();
            restoreSelection(); // khôi phục vùng chọn
            document.execCommand(command, false, null);

            // Cập nhật state
            setPost({ ...post, context: editorRef.current.innerHTML });
        }
    };
    const [post, setPost] = useState({
        context: "",
        avatar: icon_img,
        img_post: icon_img
    })
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                toast.error("Chỉ chấp nhận file ảnh (JPG, PNG, GIF)");
                return;
            }
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPost(prev => ({
                    ...prev,
                    img_post: reader.result
                }));
            };
            setShowImg(true)
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async () => {
        if (!post.context.trim()) {
            toast.error("Nội dung không được để trống");
            return;
        }
        if (!selectedFile) {
            toast.error("Bạn chưa chọn ảnh");
            return;
        }
        setIsSubmitting(true);
        try {
            const resultPost = await createPost(post.context, privacy, selectedFile);

            toast.success("Đăng bài thành công!");
        } catch (err) {
            console.error(err);
            toast.error("Đăng bài thất bại!");
        } finally {
            setIsSubmitting(false); //  Ẩn loading khi xử lý xong
        }
    };

    return (
        <div className="FromPost">
            <div className="FPost_container">
                <FormHeader title={pageTitle} breadcrumbs={breadcrumbs} />
                <div className="FPost_content">
                    {isSubmitting && <Loading />}
                    <div className="FPost_from">
                        <div className="FPost_from_titile" id="FPost_from_titile">Nội dung <span>*</span></div>
                        <nav className="nav_context">
                            <div
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => formatText("underline")}
                                id="text_style_u"
                            >U</div>

                            <div
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => formatText("bold")}
                                id="text_style_b"
                            >B</div>

                            <div
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => formatText("italic")}
                                id="text_style_i"
                            >I</div>

                            <div
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => formatText("justifyLeft")}
                            >
                                <i className='bx bx-menu-alt-left'></i>
                            </div>

                            <div
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => formatText("justifyCenter")}
                            >
                                <i className='bx bx-filter'></i>
                            </div>


                            <div
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => formatText("justifyRight")}
                            >
                                <i className='bx bx-menu-alt-right'></i>
                            </div>
                            <div
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => formatText("justify")}
                            >
                                <i className='bx bx-menu'></i>
                            </div>
                        </nav>
                        <div
                            ref={editorRef}
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onMouseUp={saveSelection} // Khi bôi đen xong thì lưu selection
                            onKeyUp={saveSelection}   // Khi gõ text cũng lưu lại selection
                            onInput={(e) => setPost({ ...post, context: e.currentTarget.innerHTML })}
                        ></div>
                        <div className="FPost_from_titile">Chọn ảnh <span>*</span></div>
                        <div className="FPost_from_img"
                            onClick={() => document.getElementById("select_img").click()}
                        >
                            <div className="FPost_from_img_container">
                                <div className="corner corner_topR"></div>
                                <div className="corner corner_topL"></div>
                                <div className="corner corner_buttonR"></div>
                                <div className="corner corner_buttonL"></div>
                                {!showImg ? (
                                    <img src={icon_img} id="post_img_default" alt="" />
                                ) : (
                                    <img src={post.img_post} alt="" id="post_img_main" />

                                )}

                                <Input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="select_img"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className="FPost_from_titile">Chế độ bài viết<span>*</span></div>
                        <div className="FPost_regime">
                            <Input label="public" name="regime" type="radio" onChange={() => setPrivacy("PUBLIC")} />
                            <Input label="private" name="regime" type="radio" onChange={() => setPrivacy("PRIVATE")} />
                            <Input label="Friend" name="regime" type="radio" onChange={() => setPrivacy("FRIEND")} />

                        </div>
                    </div>
                    <div className="FPost_view">
                        <div className="FPost_view_container">
                            <div className="FPost_view_titile">Xem bài viết tạo</div>
                            <div className="FPost_view_content">
                                <div className="post_user">
                                    <div className="post_user_title">
                                        <img src={result.avatar} alt="avatar" />
                                        <div className="post_user_name">
                                            <div className="post_name">{result.firstname} {result.lastname}</div>
                                            <span className="post_time">Thời gian...</span>
                                        </div>
                                    </div>
                                    <div className="post_user_setting">
                                        <i className='bx bx-dots-horizontal-rounded'></i>
                                    </div>
                                </div>
                                <div
                                    className="post_context"
                                    dangerouslySetInnerHTML={{ __html: post.context }}
                                ></div>
                                <div className="post_img">
                                    <img src={post.img_post} alt="product_img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="FPost_buttons">
                    <ButtonContent
                        className="FPost_buttons_save"
                        title={isSubmitting ? "Đang xử lý..." : "Tạo bài viết"}
                        onClick={handleSubmit}
                    />
                </div>
            </div>

        </div>
    )
}