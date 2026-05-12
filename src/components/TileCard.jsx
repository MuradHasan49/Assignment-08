"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const categoryColors = {
  ceramic: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  marble: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  terracotta: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  mosaic: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  stone: "text-slate-400 bg-slate-500/10 border-slate-500/20",
  glass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  cement: "text-gray-400 bg-gray-500/10 border-gray-500/20",
  terrazzo: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  encaustic: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  zellige: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  porcelain: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
};

export default function TileCard({ tile, variant = "gallery" }) {
  const categoryClass = categoryColors[tile.category?.toLowerCase()] || "text-slate-400 bg-slate-500/10 border-slate-500/20";

  return (
    <div className="group relative bg-[#111118] rounded-2xl overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <Image src={tile.image} alt={tile.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-60"/>
        {!tile.inStock && (
          <div className="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm">Out of Stock</div>
        )}
        <div className="absolute top-3 right-3 bg-[#0a0a0f]/80 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
          {tile.currency} {tile.price}
        </div>
      </div>
      <div className="p-4">
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-lg border mb-2 capitalize ${categoryClass}`}>{tile.category}</span>
        <h3 className="text-white font-semibold text-base mb-1 line-clamp-1 group-hover:text-indigo-300 transition-colors duration-200">{tile.title}</h3>
        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
          <Icon icon="mdi:ruler-square" className="w-3.5 h-3.5"/>
          <span>{tile.dimensions}</span>
          <span className="mx-1">·</span>
          <Icon icon="mdi:cube-outline" className="w-3.5 h-3.5"/>
          <span>{tile.material}</span>
        </div>
        <Link href={`/tile/${tile.id}`}>
          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl py-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 hover:scale-[1.02]">
            {variant === "featured" ? "View Details" : "Details"}
          </button>
        </Link>
      </div>
    </div>
  );
}
