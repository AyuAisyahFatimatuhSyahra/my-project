type Props = {
  post: {
    id: string;
    slug: string;
    title: string;
    published_at: string;
    medium_image?: { url: string }[] | null;
    small_image?: { url: string }[] | null;
  };
};

export default function PostCard({ post }: Props) {
  const imageUrl =
    post.medium_image && post.medium_image.length > 0
      ? post.medium_image[0].url
      : "/banner.png"; // PNG

  return (
    <a href={`/ideas/${post.slug}`} className="block group">
      <div className="bg-white shadow rounded overflow-hidden flex flex-col h-full">
        {/* Fixed Aspect Ratio Container */}
        <div className="relative aspect-[10/8] w-full">
          <img
            src={imageUrl}
            alt={post.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/banner.png";
            }}
          />
        </div>

        {/* Text Section */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-xs text-gray-500 mb-1">
            {new Date(post.published_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h2 className="text-sm font-semibold line-clamp-3 leading-snug">
            {post.title}
          </h2>
        </div>
      </div>
    </a>
  );
}