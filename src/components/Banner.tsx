"use client";

import { useEffect, useState } from "react";

export default function Banner() {
  const [imageUrl, setImageUrl] = useState("/BANNERi.png");
  const [offset, setOffset] = useState(0);

  // Fetch image from API
  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const res = await fetch(
          "https://suitmedia-backend.suitdev.com/api/ideas?page[number]=1&page[size]=1&append[]=medium_image",
          { headers: { Accept: "application/json" } }
        );
        if (!res.ok) {
          console.warn("Failed to fetch banner image");
          setImageUrl("/BANNERi.png"); // fallback
          return;
        }
        const data = await res.json();
        const img = data?.data?.[0]?.medium_image?.url;
        if (img) {
          setImageUrl(img);
        }
      } catch (err) {
        console.error("Error fetching banner image:", err);
        setImageUrl("/BANNERi.png"); // fallback on error
      }
    };

    fetchBannerImage();
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3); // kecepatan parallax
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="banner" className="relative h-[60vh] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        role="img"
        aria-label="Banner background"
        className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-300"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          transform: `translateY(${offset}px)`,
        }}
      />

      {/* Overlay Text */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">Ideas</h1>
        <p className="text-lg drop-shadow-sm">Where all our great things begin</p>
      </div>

      {/* Miring SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <polygon fill="white" points="0,10 100,2 100,10" />
      </svg>
    </div>
  );
}