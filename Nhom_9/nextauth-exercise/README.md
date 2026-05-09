# 🔐 NextAuth Token Refresh & RBAC Exercise

Dự án này là một bài tập thực hành xây dựng ứng dụng web sử dụng **Next.js (Pages Router)** và **NextAuth.js** để xử lý xác thực người dùng, phân quyền và làm mới token ngầm (Silent Token Refresh).

## 🚀 Các tính năng chính

- **Xác thực người dùng (Authentication):** Đăng nhập bằng `CredentialsProvider` thông qua API giả lập.
- **Phân quyền truy cập (RBAC):** 
  - Hỗ trợ 2 quyền: `ROLE_STUDENT` và `ROLE_ADVISOR`.
  - Trang Dashboard chỉ cho phép `ROLE_ADVISOR` truy cập. Người dùng không đủ quyền sẽ bị chặn.
- **Làm mới Token (Silent Token Refresh):** 
  - Mô phỏng cấp phát Access Token (sống 60 giây) và Refresh Token.
  - Tự động phát hiện Access Token hết hạn và gọi hàm refresh để lấy token mới dưới nền, không làm gián đoạn trải nghiệm người dùng (người dùng không bị văng ra trang login).
- **Gọi API bảo mật:** Sử dụng Access Token để gọi API bảo mật (`/api/classes`).

## 💻 Công nghệ sử dụng

- Next.js (Pages Router)
- NextAuth.js
- React (Hooks, Context)

## 🛠️ Hướng dẫn cài đặt và khởi chạy

**1. Cài đặt các gói phụ thuộc (Dependencies):**
```bash
npm install
```

**2. Khởi chạy server phát triển:**
```bash
npm run dev
```

**3. Mở ứng dụng:**
Truy cập http://localhost:3000 trên trình duyệt của bạn.

## 🔑 Tài khoản Demo

Sử dụng các tài khoản sau để kiểm thử hệ thống:

| Username | Password | Role | Quyền truy cập Dashboard |
| :--- | :--- | :--- | :--- |
| `student` | `123456` | `ROLE_STUDENT` | ❌ Bị từ chối |
| `advisor` | `123456` | `ROLE_ADVISOR` | ✅ Thành công |

## 📂 Cấu trúc thư mục chính

```text
nextauth-exercise/
├── pages/
│   ├── api/
│   │   ├── auth/[...nextauth].js  # Cấu hình NextAuth, logic Refresh Token
│   │   └── classes.js             # API giả lập trả về danh sách lớp
│   ├── _app.js                    # Bọc SessionProvider
│   ├── index.js                   # Trang Dashboard (yêu cầu ROLE_ADVISOR)
│   └── login.js                   # Giao diện đăng nhập
└── README.md
```