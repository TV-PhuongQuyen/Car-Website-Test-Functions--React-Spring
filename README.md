
# 🚗 Website Bán Ô Tô – React + Spring Boot Microservices

**Website bán ô tô** là một ứng dụng mô phỏng sàn giao dịch trực tuyến cho phép người dùng đăng bán, tìm kiếm, trò chuyện và quản lý thông tin cá nhân.
Dự án được xây dựng với mục tiêu **kiểm thử kiến trúc Microservices** giữa **ReactJS (Frontend)** và **Spring Boot (Backend)**, đồng thời tích hợp **Redis**, **Elasticsearch**, **Docker**, và **Google OAuth2 Login**.

---

## 🧩 Tính năng nổi bật

* ✅ Đăng ký, đăng nhập (bao gồm Google Login – OAuth2)
* ✅ CRUD sản phẩm (ô tô): đăng, chỉnh sửa, xóa, xem chi tiết
* ✅ Đăng bài viết chia sẻ xe / kinh nghiệm
* ✅ Chat real-time giữa người bán và người mua (WebSocket)
* ✅ Tìm kiếm sản phẩm bằng **Elasticsearch**

  * Gợi ý từ khóa theo thời gian thực
  * Hiển thị sản phẩm đã từng tìm kiếm
  * Thống kê giờ/tháng/năm tìm kiếm nhiều nhất
  * Top người dùng có lượt tìm kiếm cao nhất
* ✅ Tìm kiếm sản phẩm bằng **hình ảnh** (AI – Python service)
* ✅ Thống kê, phân tích hành vi người dùng
* ✅ Caching bằng **Redis**
* ✅ Triển khai dễ dàng bằng **Docker Compose**

---

## ⚙️ Kiến trúc hệ thống

### 🧱 Frontend – ReactJS

Cấu trúc thư mục:

```
src/
├── assets/              # Ảnh, âm thanh, styles
├── components/          # Component tái sử dụng (C-Form, C-Header, C-Profile, ...)
├── configurations/      # Config chung (API, OAuth, Axios)
│   ├── configurations.js
│   ├── httpClients.js
│   ├── menuConfigurations.js
├── hooks/               # Custom hooks (useAuth, useFetch, ...)
├── layout/              # Layout tổng thể (Header, Footer, Content)
├── pages/               # Trang chính (Login, Register, Dashboard, Post, Product, ...)
├── routes/              # React Router v6
├── services/            # Gọi API backend
├── store/               # Redux Toolkit (auth, chat, post, profile, product)
```

### OAuth2 Config – `configurations.js`

```javascript
export const OAuthConfig = {
  clientID: "",
  redirect: "http://localhost:3000/authenticate",
  authUri: ""
};
```

---
### ⚙️ Backend – Spring Boot Microservices

Hệ thống backend tuân thủ mô hình microservice, mỗi service đảm nhận một vai trò độc lập.

| Service                        | Mô tả                                                 | Port |
| ------------------------------ | ----------------------------------------------------- | ---- |
| **API Gateway**                | Cổng vào duy nhất, định tuyến request                 | 8080 |
| **Oto Service (User Service)** | Quản lý người dùng, xác thực, Google Login, JWT       | 8081 |
| **Category Service**           | Quản lý danh mục xe (hãng, loại, dòng xe)             | 8082 |
| **Product Service**            | CRUD sản phẩm ô tô                                    | 8083 |
| **Post Service**               | Quản lý bài đăng và nội dung chia sẻ                  | 8084 |
| **Profile Service**            | Hồ sơ cá nhân (thông tin, avatar, mô tả)              | 8085 |
| **Chat Service**               | Chat real-time (WebSocket) giữa người mua & bán       | 8086 |
| **File Service**               | Upload, lưu metadata ảnh xe                           | 8087 |
| **Search History Service**     | Ghi nhận, thống kê lịch sử tìm kiếm, từ khóa phổ biến | 8088 |
| **Python Service**             | Xử lý tìm kiếm sản phẩm bằng hình ảnh (AI)            | 8000 |

---

### 🔐 OAuth2 Config trong `application.yml`

```yaml
outbound:
  identity:
    client-id: ${CLIENT_ID}
    client-secret: ${CLIENT_SECRET}
    redirect-uri: "http://localhost:3000/authenticate"
```

> `CLIENT_ID` và `CLIENT_SECRET` được truyền qua **biến môi trường** (Environment Variables).

---

## 🗃️ Database (MySQL)

Mỗi service có database riêng biệt:

* `oto_service` – người dùng, role, token, profile
* `category_service` – danh mục xe
* `product_service` – sản phẩm ô tô
* `post_service` – bài đăng người dùng
* `chat_service` – hội thoại & tin nhắn
* `file_service` – metadata file
* `search_history_service` – thống kê, lịch sử tìm kiếm

---

## 🐍 Python Service (Image Search)

```bash
uvicorn main:app --host 127.0.0.1 --port 8000
```

> Dịch vụ này giúp tìm kiếm sản phẩm ô tô bằng hình ảnh.

---

## 🐳 Docker & Redis / Elasticsearch

### `docker-compose.yml` 

```yaml
version: "3.8"

services:
  mysql:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=oto_service
    ports:
      - "3306:3306"

  redis:
    image: redis
    container_name: redis-server
    ports:
      - "6379:6379"

  elasticsearch:
    image: elasticsearch:8.14.1
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"

```

Chạy toàn hệ thống:

```bash
docker-compose up -d
```
---

🧠 Công nghệ sử dụng
Loại	Công nghệ
Frontend	ReactJS, Redux Toolkit, TailwindCSS
Backend	Spring Boot, Spring Cloud, JPA, Spring Security, OAuth2, JWT
Microservices	API Gateway, Category, Chat, File, Oto(User), Post, Product, Profile, Search History
Communication	OpenFeign, WebSocket
Database	MySQL
Cache	Redis
Search Engine	Elasticsearch
AI Image Search	Python (FastAPI + Uvicorn)
Containerization	Docker, Docker Hub
IDE	IntelliJ IDEA, Visual Studio Code
Dev Tools	Postman, MySQL Workbench


---

## 📊 Thống kê & Báo cáo

* Thống kê sản phẩm được tìm kiếm nhiều nhất theo **giờ / tháng / năm**
* Người dùng có lượt tìm kiếm nhiều nhất
* Phân tích hành vi tìm kiếm bằng **Elasticsearch Aggregations**

---

## 🧪 Chạy thử cục bộ

```bash
export CLIENT_ID=<google_client_id>
export CLIENT_SECRET=<google_client_secret>
npm install && npm start
```

---

> 💡 *Dự án vẫn đang trong quá trình hoàn thiện — mục tiêu chính là kiểm thử hệ thống microservices, Redis, Elasticsearch, Google OAuth, và khả năng mở rộng toàn bộ hệ sinh thái.*
=======

