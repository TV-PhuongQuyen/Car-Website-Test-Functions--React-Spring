import "../assets/styles/post.css"
import { getPost } from "../services/postService";
import { useState, useEffect } from "react";

export default function Post() {
    const [activeMenu, setActiveMenu] = useState(null); // lưu id post đang mở menu
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // kiểm tra còn dữ liệu không
    const toggleMenu = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    // Hàm load dữ liệu
    const fetchPosts = async (pageNumber) => {
        try {
            setLoading(true);
            const data = await getPost(pageNumber);
            if (data.length === 0) {
                setHasMore(false); // hết dữ liệu
            } else {
                setPosts((prev) => [...prev, ...data]); // nối thêm posts
            }
        } catch (error) {
            console.error("Lỗi khi load post:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPosts(page);
    }, []);
    // Lắng nghe sự kiện scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >=
                document.documentElement.scrollHeight &&
                !loading &&
                hasMore
            ) {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchPosts(nextPage);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, loading, hasMore]);



    return (
        <div className="post">
            <div className="post_container">
                {posts.map((posts, index) => (
                    <div key={index} className="post_content">
                        <div className="post_user">
                            <div className="post_user_title">
                                <img src={posts.avatar} alt="avatar" />
                                <div className="post_user_name">
                                    <div className="post_name">{posts.firstname}{posts.lastname}</div>
                                    <span className="post_time">{posts.timeAgo}</span>
                                </div>
                            </div>
                            <div className="post_user_setting">
                                <i onClick={() => toggleMenu(posts.id)} className='bx bx-dots-horizontal-rounded'></i>
                                <div className={`option_post ${activeMenu === posts.id ? "show" : "hide"
                                    }`}>
                                    <div className="option_post_flex">
                                        <i className='bx bx-hide'></i>
                                        <span>Ẩn bài viết</span>
                                    </div>
                                    <div className="option_post_flex">
                                        <i className='bx bx-share-alt'></i>
                                        <span>Chia sẻ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="post_context">
                            {posts.context}
                        </div>
                        <div className="post_img">
                            <img src={posts.mediaUrl} alt="" />
                        </div>
                    </div>
                ))};
            </div>
        </div>
    );
}
