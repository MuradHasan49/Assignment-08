"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Button } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Icon } from "@iconify/react";
import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TileCard from "@/components/TileCard";
import TileCardSkeleton from "@/components/TileCardSkeleton";
import { getFeaturedTiles, getTiles } from "@/lib/api";

const heroSlides = [
  {
    title: "Discover Your Perfect Aesthetic",
    subtitle: "Premium tiles for every vision — from minimalist marble to bold encaustic patterns.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1600",
    accent: "Luxury Marble Collection",
  },
  {
    title: "Timeless Craftsmanship",
    subtitle: "Each tile tells a story. Find the one that belongs in yours.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600",
    accent: "Artisan Ceramic Series",
  },
  {
    title: "Bold Patterns, Endless Possibilities",
    subtitle: "Transform any space with geometric mosaic and encaustic masterpieces.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600",
    accent: "Geometric Mosaic Edit",
  },
];

const marqueeItems = [
  "🔥 New Arrivals: Zellige Moroccan Gold",
  "✨ Weekly Feature: Modern Geometric Patterns",
  "🏆 Best Seller: Marble Noir Elite",
  "🌿 Join the Community — 10,000+ Design Lovers",
  "💎 Luxury Marble Collection Now Available",
  "🎨 Handcrafted Encaustic Tiles In Stock",
  "🔥 New Arrivals: Iridescent Shimmer Glass",
  "✨ Weekly Feature: Terracotta Sunset Collection",
];

const categoryHighlights = [
  { label: "Ceramic", icon: "mdi:square-rounded", color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Marble", icon: "mdi:diamond-stone", color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Mosaic", icon: "mdi:view-grid", color: "text-pink-400", bg: "bg-pink-500/10" },
  { label: "Terracotta", icon: "mdi:circle", color: "text-orange-400", bg: "bg-orange-500/10" },
  { label: "Stone", icon: "mdi:mountain", color: "text-slate-400", bg: "bg-slate-500/10" },
  { label: "Glass", icon: "mdi:glass-fragile", color: "text-cyan-400", bg: "bg-cyan-500/10" },
];

export default function HomePage() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedTiles()
      .then((data) => setFeaturedTiles(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <AppNavbar />

      {/* =========== HERO SWIPER =========== */}
      <section className="relative h-screen max-h-[700px] min-h-[560px]">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="h-full"
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/60 to-transparent" />

                {/* Hero content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl animate-fadeInUp">
                      <span className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium mb-4 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                        <Icon icon="mdi:star-four-points" className="w-3.5 h-3.5" />
                        {slide.accent}
                      </span>
                      <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                        style={{
                          fontFamily: "Playfair Display, serif",
                          background: "linear-gradient(135deg, #ffffff 40%, #a78bfa)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {slide.title}
                      </h1>
                      <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center gap-4 w-full max-w-sm sm:max-w-none relative z-50">
                        <Link
                          href="/all-tiles"
                          className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold px-8 rounded-xl shadow-2xl shadow-indigo-500/30 hover:scale-105 hover:shadow-indigo-500/50 transition-all duration-300 h-12 w-full sm:w-auto cursor-pointer"
                        >
                          Browse Now
                          <Icon icon="mdi:arrow-right" className="w-5 h-5 ml-1" />
                        </Link>
                        <Link
                          href="/all-tiles"
                          className="flex items-center justify-center border border-white/20 text-white hover:bg-white/5 rounded-xl font-medium h-12 px-8 transition-all duration-200 w-full sm:w-auto cursor-pointer"
                        >
                          View Gallery
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* =========== MARQUEE =========== */}
      <div className="bg-indigo-600/10 border-y border-indigo-500/20 py-3 overflow-hidden">
        <Marquee gradient={false} speed={50} className="py-1">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="text-sm text-slate-300 mx-8 flex items-center gap-2"
            >
              {item}
              <span className="text-indigo-500 mx-4">|</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* =========== CATEGORY HIGHLIGHTS =========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categoryHighlights.map((cat) => (
            <Link
              key={cat.label}
              href={`/all-tiles?category=${cat.label.toLowerCase()}`}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${cat.bg} border border-white/5 hover:border-white/20 hover:scale-105 transition-all duration-200 cursor-pointer`}
            >
              <Icon icon={cat.icon} className={`w-7 h-7 ${cat.color}`} />
              <span className={`text-xs font-medium ${cat.color}`}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* =========== FEATURED TILES =========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Section header */}
        <div className="flex flex-row items-end justify-between w-full gap-4 mb-10 border-b border-white/5 pb-6">
          <div>
            <p className="text-indigo-400 text-sm font-medium mb-2 flex items-center gap-2">
              <Icon icon="mdi:star-four-points" className="w-4 h-4" />
              Handpicked for you
            </p>
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Featured Tiles
            </h2>
          </div>
          <Link
            href="/all-tiles"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors hidden sm:flex"
          >
            View All
            <Icon icon="mdi:arrow-right" className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => <TileCardSkeleton key={i} />)
            : featuredTiles.map((tile) => (
                <TileCard key={tile.id} tile={tile} variant="featured" />
              ))}
        </div>

        <div className="text-center mt-10">
          <Button
            as={Link}
            href="/all-tiles"
            size="lg"
            variant="bordered"
            className="bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border border-indigo-500/30 text-indigo-300 hover:text-white hover:from-indigo-500 hover:to-purple-600 rounded-xl font-semibold px-10 transition-all duration-300 shadow-xl hover:shadow-indigo-500/20"
          >
            Explore Full Gallery
            <Icon icon="mdi:arrow-right" className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* =========== WHY TILEVERSE SECTION =========== */}
      <section className="bg-[#06060c] border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Why TileVerse?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We curate the finest tile collections from artisan makers worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "mdi:certificate-outline", title: "Premium Quality", desc: "Every tile meets our strict quality standards before listing." },
              { icon: "mdi:palette-outline", title: "Unique Designs", desc: "Curated designs from artisans across 40+ countries." },
              { icon: "mdi:truck-delivery-outline", title: "Fast Delivery", desc: "Nationwide shipping with real-time order tracking." },
              { icon: "mdi:headset", title: "Expert Support", desc: "Design consultants available 7 days a week for you." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#111118] border border-white/5 hover:border-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <Icon icon={item.icon} className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
