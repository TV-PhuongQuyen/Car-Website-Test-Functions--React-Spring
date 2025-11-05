import "../assets/styles/post.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPost } from "../store/postStore";

export default function Post() {
    const dispatch = useDispatch();

    // lấy đúng slice: state.post
    const { result, loading, error } = useSelector((state) => state.post);

    const [activeMenu, setActiveMenu] = useState(null);
    const [posts, setPosts] = useState([]);

    const toggleMenu = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    useEffect(() => {
        dispatch(fetchPost());
    }, [dispatch]);

    useEffect(() => {
        if (result) {
            setPosts(result);
        }
    }, [result]);

    return (
        <div className="post">
            <div className="post_container">
                {posts.map((post, index) => (
                    <div key={index} className="post_content">
                        <div className="post_user">
                            <div className="post_user_title">
                                <img src={post.avatar} alt="avatar" />
                                <div className="post_user_name">
                                    <div className="post_name">
                                        {post.firstname} {post.lastname}
                                    </div>
                                    <span className="post_time">{post.timeAgo}</span>
                                </div>
                            </div>
                            <div className="post_user_setting">
                                <i
                                    onClick={() => toggleMenu(post.id)}
                                    className="bx bx-dots-horizontal-rounded"
                                ></i>
                                <div
                                    className={`option_post ${activeMenu === post.id ? "show" : "hide"
                                        }`}
                                >
                                    <div className="option_post_flex">
                                        <i className="bx bx-hide"></i>
                                        <span>Ẩn bài viết</span>
                                    </div>
                                    <div className="option_post_flex">
                                        <i className="bx bx-share-alt"></i>
                                        <span>Chia sẻ</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="post_context">{post.context}</div>

                        <div className="post_img">
                            <img src={post.mediaUrl} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
