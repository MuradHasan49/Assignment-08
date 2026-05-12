"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center relative z-10 max-w-lg">
        {/* Giant 404 */}
        <div
          className="text-[10rem] font-black leading-none mb-0 select-none"
          style={{
            background: "linear-gradient(135deg, #1e1e2e, #2a2a3e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "Playfair Display, serif",
          }}
        >
          404
        </div>

        {/* Icon */}
        <div className="flex justify-center -mt-6 mb-6">
          <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center animate-float">
            <Icon icon="mdi:tile-outline" className="w-10 h-10 text-indigo-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Tile Not Found</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Oops! This page seems to have gone missing from our gallery. 
          Let&apos;s get you back to browsing beautiful tiles.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl px-8 h-11 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <Icon icon="mdi:home" className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          <Link
            href="/all-tiles"
            className="flex items-center justify-center border border-white/20 text-white hover:bg-white/5 rounded-xl h-11 font-medium px-6 transition-all duration-200 cursor-pointer"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
