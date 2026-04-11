import Link from "next/link";

export default function BlogPage() {
  return (
    <div>
      <h1>Trang chủ Blog</h1>

      <ul>
        <li>
          <Link href="/blog/post-1">Danh sách bài viết</Link>
        </li>
        <li>
          <Link href="/blog/post-2">Danh mục bài viết</Link>
        </li>
      </ul>
    </div>
  );
}