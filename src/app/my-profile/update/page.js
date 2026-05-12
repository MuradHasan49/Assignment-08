"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useSession, authClient } from "@/lib/auth-client";
import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

const inputClass = "w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all duration-200";
const labelClass = "block text-slate-400 text-xs font-medium mb-1.5";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isPending && !session?.user) router.push("/login?redirect=/my-profile/update");
    if (session?.user) {
      setForm({ name: session.user.name || "", image: session.user.image || "" });
      setPreview(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large (max 5MB)");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // Perform Aspect Ratio preservation (like 'object-fit: cover') using standard Canvas math
        const canvas = document.createElement("canvas");
        const size = 180; 
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        
        const aspect = img.width / img.height;
        let srcX = 0, srcY = 0, srcW = img.width, srcH = img.height;
        
        if (aspect > 1) {
          // Widescreen -> Crop sides
          srcW = img.height;
          srcX = (img.width - img.height) / 2;
        } else {
          // Portrait -> Crop top/bottom
          srcH = img.width;
          srcY = (img.height - img.width) / 2;
        }

        // Draw the computed central square perfectly
        ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, size, size);
        
        const compressedDataUri = canvas.toDataURL("image/jpeg", 0.8);
        setForm((f) => ({ ...f, image: compressedDataUri }));
        setPreview(compressedDataUri);
        setLoading(false);
        toast.success("Smart auto-cropped & saved!");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (e) => {
    setForm((f) => ({ ...f, image: e.target.value }));
    setPreview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Name cannot be empty"); return; }
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: form.name, image: form.image || undefined });
      if (error) { toast.error(error.message || "Update failed"); }
      else { toast.success("Profile updated! ✨"); router.push("/my-profile"); router.refresh(); }
    } catch { toast.error("Update failed. Please try again."); }
    finally { setLoading(false); }
  };

  if (isPending) return <Loader fullPage text="Loading..."/>;
  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <AppNavbar/>
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/my-profile" className="hover:text-indigo-400 transition-colors">My Profile</Link>
          <Icon icon="mdi:chevron-right" className="w-4 h-4"/>
          <span className="text-slate-300">Update Information</span>
        </nav>
        <div className="mb-8">
          <p className="text-indigo-400 text-sm font-medium mb-1 flex items-center gap-2">
            <Icon icon="mdi:pencil-outline" className="w-4 h-4"/>Settings
          </p>
          <h1 className="text-4xl font-bold text-white" style={{fontFamily:"Playfair Display,serif"}}>Update Information</h1>
        </div>
        <div className="bg-[#111118] border border-white/5 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-5 mb-8 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="relative w-16 h-16 flex-shrink-0">
              {preview ? (
                <Image src={preview} alt="Preview" fill className="rounded-full object-cover ring-2 ring-indigo-500/40" onError={()=>setPreview("")}/>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-indigo-500/40">
                  <span className="text-white text-2xl font-bold">{form.name?.[0]?.toUpperCase()||"U"}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-white font-medium">{form.name||"Your Name"}</p>
              <p className="text-slate-400 text-sm">{session.user.email}</p>
              <p className="text-slate-500 text-xs mt-1">Avatar preview updates as you type</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="update-name" className={labelClass}>Full Name</label>
              <div className="relative">
                <Icon icon="mdi:account-outline" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
                <input id="update-name" type="text" value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))}
                  placeholder="Your full name" required className={`${inputClass} pl-10`}/>
              </div>
            </div>
            <div>
              <label className={labelClass}>Profile Photo</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: File Browse */}
                <div className="relative">
                  <label 
                    htmlFor="avatar-file-upload" 
                    className="flex flex-col items-center justify-center w-full h-[110px] bg-[#0a0a0f] border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-xl cursor-pointer transition-all hover:bg-white/5 group"
                  >
                    <div className="flex flex-col items-center justify-center pt-3 pb-3">
                      <Icon icon="mdi:cloud-upload-outline" className="w-8 h-8 text-slate-400 group-hover:text-indigo-400 mb-2 transition-colors"/>
                      <p className="text-xs text-slate-300 font-medium group-hover:text-white">Browse from computer</p>
                      <p className="text-[10px] text-slate-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                    <input 
                      id="avatar-file-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                {/* Option 2: URL Input */}
                <div className="flex flex-col justify-center">
                  <p className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold text-center mb-3 md:mb-0">Or use an internet link</p>
                  <div className="relative md:mt-2">
                    <Icon icon="mdi:link-variant" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
                    <input 
                      type="url" 
                      value={form.image.startsWith("data:") ? "" : form.image} 
                      onChange={handleImageUrlChange}
                      placeholder="Paste image address here" 
                      className={`${inputClass} pl-10 !py-2.5`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button id="update-submit-btn" type="submit" disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl h-11 shadow-lg hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2">
                {loading&&<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                {loading?"Updating...":"Update Information"}
              </button>
              <Link href="/my-profile">
                <button type="button" className="px-6 h-11 rounded-xl border border-white/20 text-white hover:bg-white/5 font-medium transition-all duration-200">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
