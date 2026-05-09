// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// 1. Hàm giả lập backend login
async function mockLogin(username, password) {
  if (username === "student" && password === "123456") {
    return {
      id: 1, name: "Student Demo", role: "ROLE_STUDENT",
      accessToken: "access_token_stu_" + Date.now(),
      refreshToken: "refresh_token_stu_abc123",
      expiresIn: 60 // 60 giây
    };
  }
  if (username === "advisor" && password === "123456") {
    return {
      id: 2, name: "Advisor Demo", role: "ROLE_ADVISOR",
      accessToken: "access_token_adv_" + Date.now(),
      refreshToken: "refresh_token_adv_xyz789",
      expiresIn: 60 // 60 giây
    };
  }
  return null;
}

// 2. Hàm giả lập call API Refresh Token
async function refreshAccessToken(token) {
  try {
    console.log("Token hết hạn, đang refresh...");
    // Thực tế ở đây bạn sẽ dùng fetch() gọi lên server để lấy token mới
    return {
      ...token,
      accessToken: "new_access_token_" + Date.now(),
      accessTokenExpires: Date.now() + 60 * 1000, // Cấp lại 60 giây
      // Nếu server trả về refreshToken mới thì cập nhật, không thì giữ nguyên
      refreshToken: token.refreshToken 
    };
  } catch (error) {
    console.error("Lỗi refresh token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await mockLogin(credentials.username, credentials.password);
        if (user) return user;
        return null;
      }
    })
  ],
  callbacks: {
    // Xử lý lưu Token vào JWT
    async jwt({ token, user }) {
      // 1. Lần đầu đăng nhập (user có dữ liệu)
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          role: user.role,
          accessTokenExpires: Date.now() + user.expiresIn * 1000, // Thời điểm hết hạn (ms)
        };
      }

      // 2. Lần sau gọi lại, kiểm tra token còn hạn không
      if (Date.now() < token.accessTokenExpires) {
        return token; // Vẫn còn hạn, trả về token cũ
      }

      // 3. Đã hết hạn (Date.now() > accessTokenExpires) => Gọi hàm Refresh
      return refreshAccessToken(token);
    },

    // Truyền data từ JWT ra Session để client (useSession) đọc được
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.accessTokenExpires = token.accessTokenExpires;
        session.error = token.error;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // Trỏ tới trang đăng nhập tự tạo
  }
});
