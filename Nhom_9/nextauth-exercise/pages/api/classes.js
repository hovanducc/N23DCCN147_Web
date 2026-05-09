// pages/api/classes.js
export default function handler(req, res) {
  // Lấy Authorization Header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Thiếu Token" });
  }

  // Token gửi lên từ client
  const token = authHeader.split(" ")[1];

  res.status(200).json({
    message: "Lấy danh sách thành công",
    classes: ["Lớp A1", "Lớp A2", "Lớp A3"],
    receivedToken: token // Trả về để client hiển thị đúng token server nhận được
  });
}
