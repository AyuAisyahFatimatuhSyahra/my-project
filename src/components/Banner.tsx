"use client";
import { useEffect, useState } from "react";

export default function Banner() {
  const [imageUrl, setImageUrl] = useState("/BANNER3.png");
  const [offset, setOffset] = useState(0);

  // Fetch image URL from API
  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        // Ganti URL ini sesuai API CMS kamu
        const res = await fetch("https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=1&append[]=medium_image", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          console.error("Failed to fetch banner image");
          return;
        }
        const data = await res.json();
        // Ambil URL image pertama
        const img = data?.data?.[0]?.medium_image?.url;
        if (img) {
          setImageUrl(img);
        }
      } catch (err) {
        console.error("Error fetching banner image:", err);
      }
    };

    fetchBannerImage();
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3); // 0.3 = kecepatan parallax
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          transform: `translateY(${offset}px)`,
        }}
      />
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-2">Ideas</h1>
        <p className="text-lg">Where all our great things begin</p>
      </div>
      {/* Miring */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <polygon fill="white" points="0,10 100,3 100,10" />
      </svg>
    </div>
  );
}