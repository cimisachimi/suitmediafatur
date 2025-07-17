import Image from 'next/image';

// Tentukan tipe data untuk satu post
interface Post {
  id: number;
  title: string;
  published_at: string;
  small_image: { url: string }[];
}

interface PostCardProps {
  post: Post;
  itemNumber: number;
}

export default function PostCard({ post, itemNumber }: PostCardProps) {
  // Format tanggal agar lebih mudah dibaca
  const formattedDate = new Date(post.published_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[16/10]">
        <Image
          src={`/api/image?url=${encodeURIComponent(post.small_image[0]?.url || '/placeholder.jpg')}`}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded">
          {itemNumber}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-500 text-sm mb-2">{formattedDate}</p>
        <h3
          className="text-lg font-semibold text-gray-800 flex-grow line-clamp-3"
        >
          {post.title}
        </h3>
      </div>
    </div>
  );
}