import React, { useState, useEffect, useCallback } from 'react';
import '../../assets/styles/message.css'
import useToggle from "../../hook/Toggle.js";
import { createMessages, fetchMessages } from "../../services/chatSerive.js"
import { io } from "socket.io-client";
import { getToken } from '../../services/localStorageService.js';

const ChatComponent = ({ conversationData, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [messageDown, setMessageDown] = useState("");
    const [input, setInput] = useState("");
    const [currentUserId, setCurrentUserId] = useState(null); // Thêm state để lưu ID user hiện tại
    const { value: showChat, toggle: toggleChat } = useToggle(false);

    // Lấy thông tin user hiện tại từ token hoặc API
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                // Bạn cần implement hàm này để lấy thông tin user hiện tại
                // const userInfo = await getCurrentUser();
                // setCurrentUserId(userInfo.id);

                // Tạm thời dùng cách này nếu có thông tin user trong token
                const token = getToken();
                if (token) {
                    // Decode token để lấy user ID (nếu token là JWT)
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        setCurrentUserId(payload.id || payload.userId);
                    } catch (e) {
                        console.error("Error decoding token:", e);
                    }
                }
            } catch (error) {
                console.error("Error getting user info:", error);
            }
        };

        getUserInfo();
    }, []);

    const loadOldMessages = useCallback(async () => {
        if (!conversationData?.id) return;

        try {
            console.log("Loading old messages for conversation:", conversationData.id);
            const response = await fetchMessages(conversationData.id);
            setMessages(response);
        } catch (error) {
            console.error("Error loading old messages:", error);
        }
    }, [conversationData?.id]);

    useEffect(() => {
        loadOldMessages();
    }, [loadOldMessages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        try {
            await createMessages(conversationData.id, input);
            setInput("");
        } catch (error) {
            console.error("Lỗi gửi tin nhắn:", error);
        }
    };

    useEffect(() => {
        console.log("Initializing socket connectiton...");

        const connectionUrl = "http://localhost:8099?token=" + getToken();
        const socket = new io(connectionUrl)

        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnect");
        });

        socket.on("message", (messageData) => {
            console.log("New message received", messageData);

            try {
                const parsedMessage = typeof messageData === 'string'
                    ? JSON.parse(messageData)
                    : messageData;

                if (parsedMessage && parsedMessage.sender) {
                    // Fix: Kiểm tra xem tin nhắn có phải của mình không dựa vào sender ID
                    const isMyMessage = currentUserId && parsedMessage.sender.userId === currentUserId;

                    // Override thuộc tính 'me' với giá trị đúng
                    const correctedMessage = {
                        ...parsedMessage,
                        me: isMyMessage
                    };

                    setMessages(prevMessages => [...prevMessages, correctedMessage]);
                }
            } catch (error) {
                console.error("Error parsing socket message:", error);
            }
        });

        return () => {
            console.log("Dissconnecting socket...");
            socket.disconnect();
        };
    }, [currentUserId]); // Thêm currentUserId vào dependency

    const shouldShowAvatar = (currentIndex, messages) => {
        const currentMessage = messages[currentIndex];
        const nextMessage = messages[currentIndex + 1];
        return !nextMessage || nextMessage.sender !== currentMessage.sender;
    };

    const shouldAddSpacing = (currentIndex, messages) => {
        if (currentIndex === 0) return false;
        const currentMessage = messages[currentIndex];
        const previousMessage = messages[currentIndex - 1];
        return currentMessage.sender !== previousMessage.sender;
    };

    const handleKeyDownWrapper = (e) => {
        handleKeyDown(e);
        handleKeyPress(e);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            setMessageDown((prev) => prev + "\n");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    // Hàm kiểm tra tin nhắn có phải của mình không
    const isMyMessage = (message) => {
        // Nếu có thuộc tính 'me', dùng trực tiếp (tin nhắn từ load lịch sử)
        if (message.me !== undefined) {
            return message.me;
        }

        // Nếu không có 'me', so sánh với currentUserId (tin nhắn từ socket)
        if (currentUserId && message.sender && message.sender.userId) {
            return message.sender.userId === currentUserId;
        }

        return false;
    };

    const renderMessage = (message, index) => {
        if (!message || !message.sender) {
            console.warn("Message missing sender info:", message);
            return null;
        }

        const showAvatar = shouldShowAvatar(index, messages);
        const addSpacing = shouldAddSpacing(index, messages);
        const isMe = isMyMessage(message); // Sử dụng hàm mới

        const avatarUrl = message.sender.avatar;
        const senderName = `${message.sender.firstName || ''} ${message.sender.lastName || ''}`.trim() || 'Unknown User';

        if (!isMe) {
            // Tin nhắn của người khác - hiển thị bên trái
            return (
                <div
                    className="layout_chat_text_container"
                    key={message.id || index}
                    style={{ marginTop: addSpacing ? '10px' : '2px' }}
                >
                    <div className="layout_chat_text_object">
                        <img
                            src={avatarUrl}
                            alt={`${senderName} avatar`}
                            style={{ opacity: showAvatar ? 1 : 0 }}
                            onError={(e) => { e.target.src = '/default-avatar.png'; }}
                        />
                        <div className="message">{message.message || ''}</div>
                    </div>
                </div>
            )
        } else {
            // Tin nhắn của mình - hiển thị bên phải
            return (
                <div
                    key={message.id || index}
                    className="layout_chat_text_container1"
                    style={{ marginTop: addSpacing ? '10px' : '2px' }}
                >
                    <div className="layout_chat_text_object">
                        <div className="message">{message.message || ''}</div>
                        <img
                            src={avatarUrl}
                            alt={`${senderName} avatar`}
                            style={{ opacity: showAvatar ? 1 : 0 }}
                            onError={(e) => { e.target.src = '/default-avatar.png'; }}
                        />
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="layout_chat_container">
            <div className="layout_chat_select_option">
                <div className="layout_chat_select_option_user">
                    <img src={conversationData.conversationAvatar} alt="avatar" />
                    <h4>{conversationData.conversationName}</h4>
                </div>
                <div className="layout_chat_select_option_icon">
                    <i className='bx bx-minus' onClick={toggleChat}></i>
                    <i className='bx bx-x' onClick={onClose} title="Đóng chat"></i>
                </div>
            </div>
            {!showChat && (
                <div className="layout_chat_text">
                    {messages
                        .filter(message => message && message.sender) // Filter tin nhắn hợp lệ
                        .map((message, index) => renderMessage(message, index))
                    }

                    {/* Hiển thị khi chưa có tin nhắn */}
                    {messages.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                            Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!
                        </div>
                    )}
                </div>
            )}
            {!showChat && (
                <div className='layout_chat_input'>
                    <div className='chat_input'>
                        <textarea
                            placeholder="Aa"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDownWrapper}
                            rows={1}
                            className="flex-1 px-3 py-2 mx-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>
                    <i
                        onClick={handleSend}
                        className='bx bxs-send'
                    >
                    </i>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;