Website bán ô tô – Test chức năng (React + Spring Microservices)
Website bán ô tô là một ứng dụng mô phỏng sàn giao dịch trực tuyến, nơi người dùng có thể đăng bán, tìm kiếm, trò chuyện và quản lý thông tin cá nhân. Dự án được xây dựng chủ yếu để test các chức năng của React (frontend) và Spring Boot Microservices (backend), đồng thời tích hợp với Docker Hub để quản lý container hóa và triển khai dễ dàng. (hiện đang trong quá trình hoàn thiện)

Các chức năng hiện có:
•	Đăng ký, đăng nhập (bao gồm Google Login).
•	Quản lý hồ sơ cá nhân (Profile).
•	ăng bài viết bán xe kèm hình ảnh.
•	Trò chuyện trực tiếp với người bán qua chat.
Công nghệ sử dụng:
•	Frontend: ReactJS (cấu trúc chuẩn: assets, components, configurations, hooks, layout, pages, routes, services, store).
•	Backend – Spring Microservices:
Spring Boot – Framework chính để xây dựng service.
Spring Web (Spring MVC / Spring WebFlux) – Xử lý API RESTful.
Spring Security – Bảo mật API, xác thực & phân quyền.
Spring Cloud Gateway – Đóng vai trò API Gateway (định tuyến request đến service tương ứng).
Spring Cloud Config – Quản lý cấu hình tập trung (nếu cần).
Spring Data JPA – Truy xuất dữ liệu với MySQL.
Spring Validation – Kiểm tra dữ liệu đầu vào.
OAuth2 / JWT – Xác thực người dùng (bao gồm login Google).
OpenFeign (Spring Cloud OpenFeign) – Gọi service-to-service.
Eureka (Spring Cloud Netflix Eureka) – Service discovery (nếu bạn triển khai auto-discovery).
Lombok – Giảm boilerplate code (getter/setter, constructor).
•	Database: MySQL (mỗi service quản lý database riêng biệt).
•	Triển khai: Docker & Docker Hub (tvpquyen repository).
1. Frontend (ReactJS)
Ứng dụng React được tổ chức theo cấu trúc chuẩn để dễ mở rộng và bảo trì:
assets/ → chứa tài nguyên tĩnh
•	images: lưu ảnh tĩnh
•	sounds: lưu file âm thanh
•	styles: lưu CSS, SCSS hoặc Tailwind config
components/ → chứa các component con tái sử dụng
•	C-Content: hiển thị nội dung động
•	C-Form: form nhập liệu, đăng nhập, đăng ký
•	C-Header: thanh header, menu
•	C-Profile: hiển thị thông tin người dùng
configurations/ → chứa cấu hình chung
•	configurations.js: config biến môi trường, API URL
•	httpClients.js: cấu hình axios để gọi API
•	menuConfigurations.js: cấu hình menu (sidebar, navbar)
hooks/ → custom React hooks (ví dụ useAuth, useFetch)
layout/ → layout tổng thể của website
•	Content-index.jsx: bố cục phần nội dung
•	Footer-index.jsx: footer chung
•	Header-index.jsx: header chung
•	Profile.jsx: layout trang cá nhân
pages/ → các trang chính
•	dashboardAdmin.jsx: trang quản trị
•	index.jsx: trang chủ
•	Login.jsx: đăng nhập
•	Register.jsx: đăng ký
•	Authenticate.jsx: xác thực (Google login, JWT check)
•	Post.jsx: đăng bài viết bán xe
routes/ → cấu hình route (React Router v6)
•	services/ → gọi API backend
•	authenService.js: login, register, Google login, refresh token
•	chatService.js: quản lý hội thoại, nhắn tin
•	hashRole.js: phân quyền theo role
•	localStorageService.js: thao tác với localStorage
•	postService.js: tạo, chỉnh sửa, xoá bài đăng xe
•	profileService.js: xem và cập nhật thông tin cá nhân
store/ → quản lý state (Redux Toolkit)
•	authen: state đăng nhập
•	chat: state hội thoại, tin nhắn
•	post: state danh sách bài viết
•	profile: state thông tin cá nhân
2. Backend (Spring Boot Microservices)
Hệ thống backend dùng kiến trúc microservice, mỗi service có chức năng độc lập:
API Gateway
•	Đóng vai trò cổng vào duy nhất.
•	Định tuyến request đến các service.
•	Hỗ trợ filter (authentication, logging, rate limit).
Auth Service (Oto Service / Identity)
•	Xác thực và quản lý người dùng.
•	Hỗ trợ đăng nhập bằng tài khoản và đăng nhập Google.
•	Cấp JWT token và refresh token.
•	Quản lý role (Admin, User, Seller, Buyer).
Chat Service
•	Quản lý hội thoại giữa buyer và seller.
•	Gửi/nhận tin nhắn real-time (WebSocket hoặc REST).
•	Quản lý participant (ai thuộc hội thoại nào).
File Service
•	Upload ảnh/video xe.
•	Lưu metadata file: id, path, chủ sở hữu.
•	Hỗ trợ download hoặc preview ảnh.
Post Service
•	Quản lý bài viết bán xe.
•	Tạo, chỉnh sửa, xóa bài đăng.
•	Liên kết với File Service để hiển thị ảnh.
•	Cho phép filter, tìm kiếm bài viết.
Profile Service
•	Quản lý thông tin người dùng (ảnh đại diện, mô tả, số điện thoại).
•	Cho phép cập nhật profile cá nhân.
•	Lấy thông tin hồ sơ khi người khác xem.

3. Database (MySQL)
Mỗi service có database riêng (theo kiến trúc microservice).
 3.1. Auth Service (Identity Service)

users
Lưu thông tin người dùng cơ bản.

id, username, password, email, google_id

user_roles
Liên kết user với nhiều role.

user_id, role_id

roles
Danh sách các role trong hệ thống (Admin, Seller, Buyer, User).

id, name

permissions
Danh sách quyền cụ thể.

id, description

roles_permissions
Gán quyền cho từng role.

role_id, permissions_id

user_profile
Hồ sơ chi tiết của user.

firstname, lastname, dob, city, avatar, user_id

invalidated_token
Danh sách token đã bị thu hồi.

id, expirytime

3.2. Chat Service

conversation
Quản lý một cuộc hội thoại.

id, type, participants_hash, created_at, modified_date

conversation_participant
Ai tham gia hội thoại nào.

id, conversation_id, user_id, role, joined_at

chat_message
Lưu tin nhắn.

id, conversation_id, sender_id, message, created_date

web_socket_session
Quản lý session khi user kết nối WebSocket.

id, socket_session_id, user_id, created_at

3.3. File Service

files
Lưu thông tin file upload (ảnh, video).

id, owner_id, content_type, size, md5_checksum, path

3.4. Post Service

posts
Quản lý bài đăng bán xe.

id, users_id, context, media_url, privacy, created_at, modified_date

3.5. Profile Service

(Sử dụng lại bảng user_profile trong Identity DB hoặc tách riêng nếu muốn độc lập.)

Lưu thông tin chi tiết của user: ảnh đại diện, mô tả, thông tin cá nhân.

Docker Hub link: https://hub.docker.com/repositories/tvpquyen
