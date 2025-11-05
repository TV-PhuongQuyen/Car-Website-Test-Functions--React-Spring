import React, { useState, useEffect } from "react";
import logo from '../../assets/images/logosieuxe.png';
import Chat from "../../components/C-Header/Chat.jsx"
import profile_img from '../../assets/images/profile img.png';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/header.css'
import 'boxicons/css/boxicons.min.css';
import MenuChildren from '../../components/C-Header/Menu-Children.jsx';
import { logout, isAuthenticated } from "../../services/authService.js";
import { menuConfig, menuConfigLogin } from "../../configurations/menuConfigurations.js";
import { hasRole } from "../../services/hashRole.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile } from "../../store/ProfileStore.js";
import useToggle from "../../hook/Toggle.js";
import ChatComponent from "../../components/C-Header/Message.jsx"

function Header() {
    const { value: showMenu, toggle: toggleMenu } = useToggle(false);
    const { value: showProfileMenu, toggle: toggleProfileMenu } = useToggle(false);
    const { value: showChat, toggle: toggleChat } = useToggle(false);

    const dispatch = useDispatch();
    const avatar = useSelector((state) => state.profile.result?.avatar);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openChatWindows, setOpenChatWindows] = useState([]);


    useEffect(() => {
        const authenticated = isAuthenticated();
        setIsLoggedIn(authenticated);

        if (authenticated) {
            dispatch(fetchMyProfile());
        }

    }, [dispatch]);



    const handleOpenChatWindow = (chatData) => {

        const chatKey = chatData.id ||
            `user-${chatData.participants?.map(p => p.userId).join('-')}` ||
            `chat-${Date.now()}`;

        const chatExists = openChatWindows.some(chat => {
            const existingKey = chat.id ||
                `user-${chat.participants?.map(p => p.userId).join('-')}` ||
                chat.chatKey;
            return existingKey === chatKey;
        });

        if (!chatExists) {
            const chatDataWithKey = { ...chatData, chatKey };
            setOpenChatWindows(prev => {
                const newWindows = [...prev, chatDataWithKey];

                return newWindows;
            });
        } else {
            console.log('⏭Chat window already exists with key:', chatKey);
        }
        toggleChat();
    };

    const handleCloseChatWindow = (chatDataToClose) => {

        setOpenChatWindows(prev => {
            const filtered = prev.filter(chat => {
                const chatKey = chat.id ||
                    `user-${chat.participants?.map(p => p.userId).join('-')}` ||
                    chat.chatKey;

                const closeKey = chatDataToClose.id ||
                    `user-${chatDataToClose.participants?.map(p => p.userId).join('-')}` ||
                    chatDataToClose.chatKey;
                return chatKey !== closeKey;
            });

            return filtered;
        });
    };

    const loginItem = menuConfigLogin.find(item => item.action === "login");
    const homeItem = menuConfigLogin.find(item => item.action === "home");

    return (
        <div className="Header">
            <nav className='Menu'>
                <div className='slect-menu option_menu' onClick={toggleProfileMenu}>
                    <i className='bx bx-menu'></i>
                    <div>Menu</div>
                </div>
                <div id='logo-menu'>
                    <img src={logo}
                        alt="Logo"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(homeItem.path)}
                    />
                </div>
                <div className='slect-menu'>
                    {!isLoggedIn ? (
                        <div
                            onClick={() => navigate(loginItem.path)}
                        >
                            {loginItem.label}
                        </div>
                    ) : (
                        <>
                            <div className="icon-notify" onClick={toggleChat}>
                                <div className="icon_notify_container">
                                    <i className='bx bx-message-alt icon_notify_containe_slect' ></i>
                                    <span className="badge">{openChatWindows.length}</span>
                                </div>
                            </div>
                            <div className={`chat ${showChat ? "show" : "hide"}`}>
                                <Chat onOpenChatWindow={handleOpenChatWindow} />
                            </div>

                            <div className="icon-notify">
                                <div className="icon_notify_container">
                                    <i className='bx bx-bell icon_notify_containe_slect'></i>
                                    <span className="badge">0</span>
                                </div>
                            </div>
                            <div className="icon-notify" onClick={toggleMenu}>
                                <div className="icon_notify_container">
                                    <img
                                        src={avatar || profile_img}
                                        alt="Profile"
                                        className="profile-img"
                                    />
                                </div>
                            </div>

                            <ul className={`menu-profile ${showMenu ? "show" : "hide"}`}>
                                {
                                    menuConfig.map(item => {
                                        if (item.permission && !hasRole(item.permission)) {
                                            return null;
                                        }

                                        if (item.action === "logout") {
                                            return (
                                                <li key={item.label}
                                                    onClick={() => {
                                                        logout();
                                                        setIsLoggedIn(false);
                                                        navigate(loginItem.path);
                                                    }
                                                    }>
                                                    {item.label}
                                                </li>
                                            );
                                        }
                                        return (
                                            <li
                                                key={item.label}
                                                onClick={() => navigate(item.path)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {item.label}
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </>
                    )}
                </div>
                <div className={`MenuChildren ${showProfileMenu ? "show" : "hide"}`}>
                    <MenuChildren />
                </div>
            </nav>

            {openChatWindows.map((chatData, index) => (
                <div className="layout_chat"
                    key={chatData.conversationId || chatData.chatKey || `chat-${index}`}
                    style={{
                        position: "fixed",
                        bottom: 0,
                        right: `${20 + index * 300}px`,
                        zIndex: 999,
                        width: "280px",
                        backgroundColor: "rgb(56, 56, 55)"
                    }}
                >
                    <ChatComponent
                        conversationData={chatData}
                        onClose={() => handleCloseChatWindow(chatData)}
                    />
                </div>
            ))}
        </div>
    );
}

export default Header;