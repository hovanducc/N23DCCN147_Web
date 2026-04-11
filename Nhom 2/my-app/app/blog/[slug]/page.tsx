export default function PostDetail({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Chi tiết bài viết</h1>
      <p>Slug: {params.slug}</p>
    </div>
  );
}