"use client";
import React from "react";
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

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(
        `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sort}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) {
        console.error("Failed to fetch", res.status, res.statusText);
        setPosts([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      console.log("API fetched data:", data);

      setPosts(Array.isArray(data.data) ? data.data : []);
      setTotal(data.meta?.total ?? null);
      setLoading(false);
    };
    fetchPosts();
  }, [sort, perPage, page]);

  return (
    <>
      <Header />
      <Banner />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-5">
          <span>
            {total != null
              ? `Showing ${(page - 1) * perPage + 1} - ${Math.min(
                  page * perPage,
                  total
                )} of ${total}`
              : `Showing ${posts.length} items`}
          </span>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto">
          <div className="flex items-center gap-1">
  <span className="text-base font-semibold text-black-800">
    Show per page:
  </span>
  <div className="relative">
    <select
      value={perPage}
      onChange={(e) => {
        setPage(1);
        setPerPage(Number(e.target.value));
      }}
      className="appearance-none border border-gray-600 rounded-full px-4 py-2 bg-white pr-10"
    >
      {[10, 20, 50].map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
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
  <span className="text-base font-semibold text-black-800">
    Sort by:
  </span>
  <div className="relative">
    <select
      value={sort}
      onChange={(e) => {
        setPage(1);
        setSort(e.target.value);
      }}
      className="appearance-none border border-gray-600 rounded-full px-4 py-2 bg-white pr-10"
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

        <div className="max-w-7xl mx-auto px-6 md:px-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-9 gap-y-8 md:gap-y-15">
    {posts.map((p) => (
      <PostCard key={p.id} post={p} />
    ))}
  </div>
</div>

        {/* Pagination */}
        <div className="flex gap-1 mt-6 justify-center flex-wrap">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center text-black-500 hover:text-black disabled:opacity-30"
          >
            «
          </button>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center text-black-500 hover:text-black disabled:opacity-30"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
  .map((n, i, arr) => {
    const shouldShow =
      n === 1 ||
      n === totalPages ||
      Math.abs(n - page) <= 2; // Current ±2
      return shouldShow ? (
        <React.Fragment key={n}>
          {i > 0 && arr[i - 1] !== n - 1 && <span key={`ellipsis-${n}`}>…</span>}
          <button
            onClick={() => setPage(n)}
            className={`w-8 h-8 flex items-center justify-center rounded ${
              n === page
                ? "bg-orange-500 text-white font-semibold"
                : "hover:bg-black-100"
            }`}
          >
            {n}
          </button>
        </React.Fragment>
      ) : null;
  })}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center text-black-500 hover:text-black disabled:opacity-30"
          >
            ›
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center text-black-500 hover:text-black disabled:opacity-30"
          >
            »
          </button>
        </div>
      </main>
    </>
  );
}