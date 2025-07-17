"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import PostCard from "@/components/PostCard";

type Post = {
  id: string;
  title: string;
  slug: string;
  published_at: string;
  medium_image?: { url: string }[] | null;
  small_image?: { url: string }[] | null;
};

export default function IdeasPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sort, setSort] = useState("-published_at");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number | null>(null);

  const totalPages = total ? Math.ceil(total / perPage) : 1;

  // Persist state in localStorage
  useEffect(() => {
    const savedSort = localStorage.getItem("ideas-sort");
    const savedPerPage = localStorage.getItem("ideas-per-page");
    const savedPage = localStorage.getItem("ideas-page");
    if (savedSort) setSort(savedSort);
    if (savedPerPage) setPerPage(Number(savedPerPage));
    if (savedPage) setPage(Number(savedPage));
  }, []);

  useEffect(() => {
    localStorage.setItem("ideas-sort", sort);
    localStorage.setItem("ideas-per-page", perPage.toString());
    localStorage.setItem("ideas-page", page.toString());
  }, [sort, perPage, page]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sort}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!res.ok) throw new Error(`Failed ${res.status}`);
        const data = await res.json();
        setPosts(Array.isArray(data.data) ? data.data : []);
        setTotal(data.meta?.total ?? null);
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [sort, perPage, page]);

  return (
    <>
      <Header />
      <Banner />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <span>
            {total != null
              ? `Showing ${(page - 1) * perPage + 1} - ${Math.min(page * perPage, total)} of ${total}`
              : `Showing ${posts.length} items`}
          </span>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-1">
              <span className="text-base font-semibold">Show per page:</span>
              <div className="relative">
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPage(1);
                    setPerPage(Number(e.target.value));
                  }}
                  className="appearance-none border border-gray-600 rounded-full px-4 py-2 pr-10 bg-white"
                >
                  {[10, 20, 50].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-base font-semibold">Sort by:</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => {
                    setPage(1);
                    setSort(e.target.value);
                  }}
                  className="appearance-none border border-gray-600 rounded-full px-4 py-2 pr-10 bg-white"
                >
                  <option value="-published_at">Newest</option>
                  <option value="published_at">Oldest</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex gap-1 mt-6 justify-center flex-wrap">
          {/* Add your pagination buttons here */}
        </div>
      </main>
    </>
  );
}