// pages/login.js
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false, // Chặn redirect mặc định để tự xử lý
    });

    if (res?.error) {
      setError("Sai tài khoản hoặc mật khẩu!");
    } else {
      router.push("/");
    }
  };

  return (
    <div style={{ padding: 50, maxWidth: 400, margin: "auto" }}>
      <h2>🔐 Đăng Nhập</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <input 
          type="text" placeholder="Tài khoản (student / advisor)" 
          value={username} onChange={e => setUsername(e.target.value)} 
          style={{ padding: 10 }}
        />
        <input 
          type="password" placeholder="Mật khẩu (123456)" 
          value={password} onChange={e => setPassword(e.target.value)} 
          style={{ padding: 10 }}
        />
        <button type="submit" style={{ padding: 10, background: "blue", color: "white" }}>
          Đăng Nhập
        </button>
      </form>
    </div>
  );
}
