type Props = {
  post: {
    id: string;
    title: string;
    published_at: string;
    medium_image?: { url: string } | null;
    small_image?: { url: string } | null; // TAMBAH ini untuk fallback
  };
};

export default function PostCard({ post }: Props) {
  const imageUrl =
    post.medium_image?.url ||
    post.small_image?.url ||
    "/banner.png"; // fallback opsional jika API kosong

  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img
        src={imageUrl}
        alt={post.title}
        loading="lazy"
        className="w-full aspect-[4/3] object-cover"
      />
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">
          {new Date(post.published_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h2 className="text-sm font-semibold line-clamp-3">{post.title}</h2>
      </div>
    </div>
  );
}