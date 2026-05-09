// pages/index.js
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(0);
  const [apiResult, setApiResult] = useState(null);

  // Tính toán thời gian token đếm ngược
  useEffect(() => {
    if (!session?.accessTokenExpires) return;
    
    const interval = setInterval(() => {
      const remaining = Math.floor((session.accessTokenExpires - Date.now()) / 1000);
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [session]);

  if (status === "loading") return <p>Đang tải...</p>;

  // Redirect nếu chưa đăng nhập
  if (status === "unauthenticated") {
    router.replace("/login");
    return null;
  }

  // RBAC: Phân quyền ROLE_ADVISOR
  if (session?.user?.role !== "ROLE_ADVISOR") {
    return (
      <div style={{ padding: 50, background: "#ffe8e8", textAlign: "center" }}>
        <h1 style={{ color: "red" }}>❌ Bị Từ Chối Truy Cập</h1>
        <p>Chỉ Cố Vấn (ROLE_ADVISOR) mới được phép truy cập Dashboard.</p>
        <p>Quyền hiện tại: <strong>{session?.user?.role}</strong></p>
        <button onClick={() => signOut()} style={{ padding: 10, marginTop: 10 }}>Đăng Xuất</button>
      </div>
    );
  }

  // Hàm gọi API giả lập bằng Access Token
  const fetchClasses = async () => {
    // Gọi update() để trigger NextAuth check JWT. Nếu hết hạn nó sẽ tự refresh.
    // Bước này cần thiết ở client để NextAuth fetch lại session mới ngay lập tức
    await update(); 
    
    // Gọi một API bảo mật
    const res = await fetch("/api/classes", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });
    
    const data = await res.json();
    setApiResult({ data, tokenUsed: session.accessToken });
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>📊 Dashboard Cố Vấn</h1>
      <div style={{ background: "#f0f0f0", padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <p>👤 Người dùng: <strong>{session.user.name}</strong></p>
        <p>🔑 Role: <strong>{session.user.role}</strong></p>
        <p>🎫 Access Token: <code style={{ color: "blue" }}>{session.accessToken}</code></p>
        <p>
          ⏱️ Access Token hết hạn sau: <strong style={{ color: timeLeft > 10 ? "green" : "red", fontSize: 20 }}>{timeLeft}s</strong> 
          {timeLeft === 0 && " (Đã hết hạn! Hãy bấm lấy danh sách lớp để test refresh)"}
        </p>
      </div>

      <button onClick={fetchClasses} style={{ padding: 10, background: "green", color: "white", marginRight: 10, cursor: "pointer" }}>
        📋 Lấy danh sách lớp
      </button>
      <button onClick={() => signOut()} style={{ padding: 10, background: "red", color: "white", cursor: "pointer" }}>
        Đăng Xuất
      </button>

      {apiResult && (
        <div style={{ marginTop: 20, padding: 20, background: "#e8f5e9", borderRadius: 10 }}>
          <h3 style={{ color: "green" }}>✅ Kết quả gọi API:</h3>
          <p><strong>Dữ liệu:</strong> {JSON.stringify(apiResult.data)}</p>
          <p><strong>Token đã dùng để lấy:</strong> <code>{apiResult.tokenUsed}</code></p>
        </div>
      )}
    </div>
  );
}
