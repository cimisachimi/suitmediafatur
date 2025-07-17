"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PostCard from './PostCard';

// Tipe data dari respons API
interface ApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export default function PostList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '10';
  const sort = searchParams.get('sort') || '-published_at';

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          'page[number]': page,
          'page[size]': perPage,
          'append[]': 'small_image',
          sort: sort,
        });
        
        const res = await fetch(`/api/ideas?${params.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data from API');
        }
        const data: ApiResponse = await res.json();

        // Pastikan data memiliki properti 'meta' sebelum di-set
        if (data && data.meta) {
          setResponse(data);
        } else {
          throw new Error("Invalid data structure from API");
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, perPage, sort]);

  const handleStateChange = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set(key, value);
    if (key !== 'page') {
      current.set('page', '1');
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  // << SOLUSI UTAMA DI SINI >>
  // Lakukan return awal jika loading, error, atau data tidak valid
  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-8">Error: {error}</div>;
  if (!response || !response.meta) return <div className="text-center p-8">No data available.</div>;

  // Kode di bawah ini sekarang aman karena kita sudah memastikan 'response.meta' ada
  const { meta, data: posts } = response;
  const startItem = (meta.current_page - 1) * meta.per_page + 1;
  const endItem = Math.min(startItem + meta.per_page - 1, meta.total);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Kontrol Sort dan Show per page */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {startItem} - {endItem} of {meta.total}
        </p>
        <div className="flex items-center gap-4">
          <select value={perPage} onChange={(e) => handleStateChange('per_page', e.target.value)} className="border rounded-md p-2">
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
          <select value={sort} onChange={(e) => handleStateChange('sort', e.target.value)} className="border rounded-md p-2">
            <option value="-published_at">Terbaru</option>
            <option value="published_at">Terlama</option>
          </select>
        </div>
      </div>
      
      {/* Daftar Postingan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} itemNumber={startItem + index} />
        ))}
      </div>

      {/* Paginasi */}
      <div className="flex justify-center items-center mt-8 gap-2">
        {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(pageNum => (
          <button
            key={pageNum}
            onClick={() => handleStateChange('page', pageNum.toString())}
            className={`px-4 py-2 rounded-md ${pageNum === meta.current_page ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}