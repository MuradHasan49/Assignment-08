"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TileCard from "@/components/TileCard";
import TileCardSkeleton from "@/components/TileCardSkeleton";
import Loader from "@/components/Loader";
import { getTiles } from "@/lib/api";

const categories = ["All","Ceramic","Marble","Mosaic","Terracotta","Stone","Glass","Cement","Terrazzo","Encaustic","Zellige","Porcelain"];

function AllTilesContent() {
  const searchParams = useSearchParams();
  const [tiles, setTiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const initialCat = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (initialCat) {
      // Capitalize first letter to match internal list formatting
      const matched = categories.find(c => c.toLowerCase() === initialCat.toLowerCase());
      if (matched) setActiveCategory(matched);
    }
  }, [initialCat]);

  useEffect(() => {
    getTiles().then((data) => { setTiles(data); setFiltered(data); }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = tiles;
    if (activeCategory !== "All") result = result.filter((t) => t.category?.toLowerCase() === activeCategory.toLowerCase());
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.title?.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q) || t.material?.toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [search, activeCategory, tiles]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <AppNavbar />
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="text-indigo-400 text-sm font-medium mb-2 flex items-center justify-center gap-2">
            <Icon icon="mdi:view-grid-outline" className="w-4 h-4"/>Full Collection
          </p>
          <h1 className="text-5xl font-bold text-white mb-3" style={{fontFamily:"Playfair Display,serif"}}>All Tiles</h1>
          <p className="text-slate-400 max-w-md mx-auto">Browse our complete gallery. Search and filter to find your perfect match.</p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"/>
            <input id="tile-search" type="text" value={search} onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search by title, material, or category..."
              className="w-full bg-[#111118] border border-white/10 text-white rounded-2xl pl-12 pr-10 py-3.5 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all duration-200 shadow-lg"/>
            {search && (
              <button onClick={()=>setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <Icon icon="mdi:close" className="w-4 h-4"/>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={()=>setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium border transition-all duration-200 ${
                activeCategory===cat ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                : "bg-white/5 border-white/10 text-slate-400 hover:border-indigo-500/30 hover:text-white"}`}>
              {cat}
            </button>
          ))}
        </div>

        {!loading && (
          <p className="text-slate-500 text-sm mb-6 text-center">
            Showing <span className="text-indigo-400 font-semibold">{filtered.length}</span> {filtered.length===1?"tile":"tiles"}
            {search&&` for "${search}"`}{activeCategory!=="All"&&` in ${activeCategory}`}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading ? Array(8).fill(0).map((_,i)=><TileCardSkeleton key={i}/>)
            : filtered.length>0 ? filtered.map((tile)=><TileCard key={tile.id} tile={tile}/>)
            : (
              <div className="col-span-full py-20 text-center">
                <Icon icon="mdi:tile-outline" className="w-16 h-16 text-slate-700 mx-auto mb-4"/>
                <p className="text-slate-500 text-lg font-medium">No tiles found</p>
                <p className="text-slate-600 text-sm mt-1">Try a different search or category</p>
              </div>
            )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default function AllTilesPage() {
  return (
    <Suspense fallback={<Loader fullPage text="Loading collection..." />}>
      <AllTilesContent />
    </Suspense>
  );
}
