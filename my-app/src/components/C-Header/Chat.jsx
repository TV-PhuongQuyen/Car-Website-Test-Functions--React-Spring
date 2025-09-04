import "../../assets/styles/chat.css"
import React, { useEffect, useRef, useState } from 'react';
import useToggle from "../../hook/Toggle.js";
import { searchProfile } from "../../services/profileService.js"
import { createDirectChat, getMyChat } from "../../services/chatSerive.js"
import profile_img from '../../assets/images/profile img.png';

export default function Chat({ onOpenChatWindow }) {
    const [profiles, setProfiles] = useState([]);
    const [mychat, setMyChat] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const inputRef = useRef();
    const { value: showMenu, toggle: toggleMenu } = useToggle(false);

    const chatLoaded = useRef(false);


    useEffect(() => {
        if (chatLoaded.current) {
            return;
        }
        fethMyChat();
    }, []);

    useEffect(() => {

        const searchProfiles = async () => {
            if (keyword.trim() !== "") {
                setLoading(true);
                try {
                    const res = await searchProfile(keyword);
                    setProfiles(res || []);
                } catch (error) {
                    console.error(" Search error:", error);
                    setProfiles([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setProfiles([]);
            }
        };

        const timeoutId = setTimeout(searchProfiles, 300);
        return () => clearTimeout(timeoutId);
    }, [keyword]); // Chỉ depend on keyword

    const fethMyChat = async () => {
        if (chatLoaded.current) {
            return;
        }

        try {
            chatLoaded.current = true;
            const data = await getMyChat();
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setMyChat(data.result);
            }
        } catch (error) {
            console.error(" Lỗi khi load dữ liệu chat:", error);
            chatLoaded.current = false; // Reset on error
        }
    };
    useEffect(() => {
        if (showMenu) {
            inputRef.current?.focus();
        }
    }, [showMenu]);

    const handleCreateAndOpenChat = async (selectedProfile) => {
        try {

            const response = await createDirectChat(selectedProfile.userId);

            if (onOpenChatWindow && response) {
                onOpenChatWindow(response);
                setKeyword("");
                setProfiles([]);

            }
        } catch (error) {
            console.error(' Failed to create chat:', error);
            alert('Không thể tạo cuộc trò chuyện. Vui lòng thử lại!');
        }
    }


    return (
        <div className="chat_container">
            <div className="chat_select_option">
                <div className="chat_select_option_name">Đang chat</div>
                <div>
                    <i className='bx bx-dots-horizontal-rounded'></i>
                    <i className='bx bx-expand'></i>
                    <i
                        className='bx bx-customize icon_new_chat'
                        onClick={toggleMenu}
                    ></i>
                    <div className={`create_new_chat ${showMenu ? "show" : "hide"}`}>
                        <div className="create_new_chat_container">
                            <div className="new_chat_title flex_between">
                                <div>Tin nhắn mới</div>
                                <i className='bx bx-x' onClick={toggleMenu}></i>
                            </div>
                            <div className="search_new_chat flex_between">
                                <div>Đến:</div>
                                <input
                                    ref={inputRef}
                                    type="search"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Nhập tên để tìm kiếm..."

                                />
                            </div>
                            <div className="select_user_chat">
                                {loading && <div>Đang tìm kiếm...</div>}
                                {!loading && profiles.length === 0 && keyword.trim() !== "" && (
                                    <div>Không tìm thấy kết quả</div>
                                )}
                                {!loading && profiles.map((profiles) => (
                                    <div key={profiles.userId}
                                        className="select_user_chat_container"
                                        onClick={() => handleCreateAndOpenChat(profiles)}
                                    >
                                        <img src={profiles.avatar || profile_img} alt="avatar" />
                                        <div>{profiles.firstname} {profiles.lastname}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat_search">
                <input type="search" />
                <i className='bx bx-search'></i>
            </div>
            <div className="chat_select_object">
                {
                    mychat.map((mychat) => (
                        <div
                            key={mychat.userId}
                            className="chat_select_object_container"
                            onClick={() => handleCreateAndOpenChat(mychat)}
                        >
                            <div className="chat_select_object_img">
                                <img src={mychat.avatar} alt="avatar" />
                            </div>
                            <div className="chat_select_object_message">
                                <div className="chat_select_object_name">{mychat.firstName}{mychat.lastName}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};