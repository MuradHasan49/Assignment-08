"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useSession } from "@/lib/auth-client";
import { getTileById } from "@/lib/api";
import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const categoryColors = {
  ceramic:"text-blue-400 bg-blue-500/10 border-blue-500/20",
  marble:"text-purple-400 bg-purple-500/10 border-purple-500/20",
  terracotta:"text-orange-400 bg-orange-500/10 border-orange-500/20",
  mosaic:"text-pink-400 bg-pink-500/10 border-pink-500/20",
  stone:"text-slate-400 bg-slate-500/10 border-slate-500/20",
  glass:"text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  cement:"text-gray-400 bg-gray-500/10 border-gray-500/20",
  terrazzo:"text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  encaustic:"text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  zellige:"text-amber-400 bg-amber-500/10 border-amber-500/20",
  porcelain:"text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
};

export default function TileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) router.push(`/login?redirect=/tile/${id}`);
  }, [session, isPending, id, router]);

  useEffect(() => {
    if (id) getTileById(id).then(setTile).finally(() => setLoading(false));
  }, [id]);

  if (isPending || loading) return <Loader fullPage text="Loading tile details..."/>;
  if (!session?.user) return null;

  if (!tile) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
        <AppNavbar/>
        <div className="flex-1 flex items-center justify-center flex-col gap-4 pt-24">
          <Icon icon="mdi:tile-outline" className="w-20 h-20 text-slate-700"/>
          <h2 className="text-2xl font-bold text-white">Tile Not Found</h2>
          <p className="text-slate-400">The tile you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/all-tiles"><button className="bg-indigo-500 text-white font-semibold rounded-xl px-6 py-2.5 hover:bg-indigo-400 transition-colors mt-2">Browse All Tiles</button></Link>
        </div>
        <Footer/>
      </div>
    );
  }

  const catClass = categoryColors[tile.category?.toLowerCase()] || "text-slate-400 bg-slate-500/10 border-slate-500/20";

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <AppNavbar/>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <Icon icon="mdi:chevron-right" className="w-4 h-4"/>
          <Link href="/all-tiles" className="hover:text-indigo-400 transition-colors">All Tiles</Link>
          <Icon icon="mdi:chevron-right" className="w-4 h-4"/>
          <span className="text-slate-300 truncate max-w-xs">{tile.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#111118] border border-white/5 shadow-2xl shadow-black/50">
              <Image src={tile.image} alt={tile.title} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw"/>
              <div className="absolute top-4 left-4">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl border capitalize ${catClass}`}>{tile.category}</span>
              </div>
              {!tile.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white font-bold px-6 py-2 rounded-xl text-lg">Out of Stock</span>
                </div>
              )}
            </div>
            {tile.tags?.length>0 && (
              <div className="flex flex-wrap gap-2">
                {tile.tags.map((tag)=>(
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight" style={{fontFamily:"Playfair Display,serif"}}>{tile.title}</h1>
            {tile.creator && (
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Icon icon="mdi:account" className="w-4 h-4 text-indigo-400"/>
                </div>
                <span className="text-slate-400 text-sm">by <span className="text-indigo-400 font-medium">{tile.creator}</span></span>
              </div>
            )}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-white">{tile.currency} {tile.price}</span>
              <span className="text-slate-500 text-sm">per tile</span>
            </div>
            {tile.style && (
              <div className="mb-6 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                <p className="text-slate-300 text-sm leading-relaxed italic">&ldquo;{tile.style}&rdquo;</p>
              </div>
            )}
            <p className="text-slate-400 leading-relaxed mb-8">{tile.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                {icon:"mdi:ruler-square",label:"Dimensions",value:tile.dimensions},
                {icon:"mdi:cube-outline",label:"Material",value:tile.material},
                {icon:"mdi:tag-outline",label:"Category",value:tile.category},
                {icon:"mdi:check-circle-outline",label:"Availability",value:tile.inStock?"In Stock":"Out of Stock",highlight:tile.inStock?"text-emerald-400":"text-red-400"},
              ].map((spec)=>(
                <div key={spec.label} className="bg-[#111118] rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon icon={spec.icon} className="w-4 h-4 text-indigo-400"/>
                    <span className="text-slate-500 text-xs">{spec.label}</span>
                  </div>
                  <span className={`font-semibold text-sm capitalize ${spec.highlight||"text-white"}`}>{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button disabled={!tile.inStock}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl h-12 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2">
                <Icon icon="mdi:cart-plus" className="w-5 h-5"/>
                {tile.inStock?"Add to Inquiry":"Notify Me"}
              </button>
              <Link href="/all-tiles">
                <button className="px-6 h-12 rounded-xl border border-white/20 text-white hover:bg-white/5 font-medium transition-all duration-200 flex items-center gap-2">
                  <Icon icon="mdi:arrow-left" className="w-5 h-5"/>Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
