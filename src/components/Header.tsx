"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastY && currentY > 50);
      setLastY(currentY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
    <header
      className={`fixed top-0 w-full transition-transform duration-300 z-50 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } bg-gradient-to-r from-orange-600 to-orange-500 bg-opacity-90 backdrop-blur`} 
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 h-16">
        <div className="flex items-center gap-3">
          <div className="relative w-18 h-18 md:w-30 md:h-30">
            <Image
              src="/IYA2.png"
              alt="Suitmedia Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          
        </div>
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`pb-1 border-b-2 font-medium tracking-wide ${
                pathname === item.href
                  ? "border-white text-white"
                  : "border-transparent text-white/80 hover:border-white hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}