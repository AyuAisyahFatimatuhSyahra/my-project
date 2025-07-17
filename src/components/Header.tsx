"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isBgVisible, setIsBgVisible] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const banner = document.getElementById("banner");
      const bannerBottom = banner?.getBoundingClientRect().bottom ?? 0;
      const scrollY = window.scrollY;
      const isScrollingUp = scrollY < lastY;
      const isBelowBanner = bannerBottom <= 0;

      // Kalau scroll ke bawah dan di bawah banner → tampilkan background
      // Kalau scroll ke atas, dan masih DI DALAM banner → tetap transparan
      if (isBelowBanner) {
        setIsBgVisible(true);
      } else if (isScrollingUp && !isBelowBanner) {
        setIsBgVisible(false); // Di dalam banner dan scroll ke atas
      } else {
        setIsBgVisible(false);
      }

      setLastY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const navItems = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Ideas", href: "/ideas" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isBgVisible
            ? "bg-gradient-to-r from-orange-600 to-orange-500 bg-opacity-80 backdrop-blur shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 md:px-16">
          {/* Logo */}
          <div className="relative w-30 h-30">
            <Image
              src="/IYA2.png"
              alt="Suitmedia Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

         {/* Desktop Menu */}
<nav className="hidden md:flex ml-auto gap-x-5">
  {navItems.map((item) => {
    const isActive = pathname === item.href;
    const activeBorder = isBgVisible ? "border-white text-white" : "border-orange-600 text-orange-600";

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`pb-1 border-b-2 font-semibold tracking-wide transition-colors duration-300 ${
          isActive
            ? activeBorder
            : "border-transparent text-white hover:text-orange-500 hover:border-orange-500"
        }`}
      >
        {item.label}
      </Link>
    );
  })}
</nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen((prev) => !prev)}>
              {isMenuOpen ? (
                <X className="text-white w-6 h-6" />
              ) : (
                <Menu className="text-white w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-2/3 h-full bg-orange-600 z-40 px-6 pt-20 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-white text-lg font-semibold ${
                    pathname === item.href ? "underline" : "opacity-90"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}