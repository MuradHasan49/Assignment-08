"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

const inputClass = "w-full bg-[#0a0a0f] border border-white/10 text-white rounded-xl px-4 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all duration-200";
const labelClass = "block text-slate-400 text-xs font-medium mb-1.5";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });
  const [preview, setPreview] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setLoading(true);
    try {
      const { error } = await signUp.email({ name: form.name, email: form.email, password: form.password, image: form.image || undefined });
      if (error) { toast.error(error.message || "Registration failed"); }
      else { toast.success("Account created! Please sign in."); router.push("/login"); }
    } catch { toast.error("Registration failed. Please try again."); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try { await signIn.social({ provider: "google", callbackURL: "/" }); }
    catch { toast.error("Google login failed."); setGoogleLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="font-bold text-2xl" style={{ background: "linear-gradient(135deg,#6366f1,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TileVerse</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-slate-400 text-sm">Join the TileVerse community</p>
        </div>
        <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
          <button id="google-register-btn" type="button" onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold rounded-xl mb-4 hover:bg-gray-50 h-11 transition-all duration-200 disabled:opacity-70">
            {googleLoading ? <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin" /> : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Continue with Google
          </button>
          <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-white/10" /><span className="text-slate-500 text-xs">or register with email</span><div className="flex-1 h-px bg-white/10" /></div>
          <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="relative w-12 h-12 flex-shrink-0">
              {preview ? (
                <Image src={preview} alt="Preview" fill className="rounded-full object-cover ring-2 ring-indigo-500/40" onError={() => setPreview("")} />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-indigo-500/40">
                  <span className="text-white text-xl font-bold">{form.name?.[0]?.toUpperCase() || "U"}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-white font-medium">{form.name || "Your Name"}</p>
              <p className="text-slate-400 text-sm">{form.email || "you@example.com"}</p>
              <p className="text-slate-500 text-xs mt-1">Avatar preview updates as you type</p>
            </div>
          </div>
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label htmlFor="register-name" className={labelClass}>Full Name</label>
              <div className="relative"><Icon icon="mdi:account-outline" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input id="register-name" type="text" value={form.name} onChange={handleChange("name")} placeholder="John Doe" required className={`${inputClass} pl-10`} />
              </div>
            </div>
            <div>
              <label htmlFor="register-email" className={labelClass}>Email Address</label>
              <div className="relative"><Icon icon="mdi:email-outline" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input id="register-email" type="email" value={form.email} onChange={handleChange("email")} placeholder="you@example.com" required className={`${inputClass} pl-10`} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Profile Photo</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: File Browse */}
                <div className="relative">
                  <label
                    htmlFor="avatar-file-upload"
                    className="flex flex-col items-center justify-center w-full h-[90px] bg-[#0a0a0f] border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-xl cursor-pointer transition-all hover:bg-white/5 group"
                  >
                    <div className="flex flex-col items-center justify-center pt-2 pb-2">
                      <Icon icon="mdi:cloud-upload-outline" className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 mb-1 transition-colors" />
                      <p className="text-xs text-slate-300 font-medium group-hover:text-white">Browse from computer</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">JPG, PNG up to 5MB</p>
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
                <div className="flex flex-col justify-center w-full h-[90px] bg-[#0a0a0f] border border-dashed border-white/10 rounded-xl px-4 transition-all hover:border-indigo-500/50 group">
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold text-center mb-1.5 group-hover:text-indigo-400 transition-colors">Or use an internet link</p>
                  <div className="relative w-full">
                    <Icon icon="mdi:link-variant" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    <input
                      type="url"
                      value={form.image.startsWith("data:") ? "" : form.image}
                      onChange={handleImageUrlChange}
                      placeholder="Paste image address here"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-9 pr-4 py-2 text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="register-password" className={labelClass}>Password <span className="text-slate-600">(min. 8 chars)</span></label>
              <div className="relative">
                <Icon icon="mdi:lock-outline" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input id="register-password" type={showPass ? "text" : "password"} value={form.password} onChange={handleChange("password")} placeholder="••••••••" required minLength={8} className={`${inputClass} pl-10 pr-10`} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <Icon icon={showPass ? "mdi:eye-off" : "mdi:eye"} className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button id="register-submit-btn" type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl h-11 shadow-lg hover:scale-[1.02] transition-all duration-200 mt-1 disabled:opacity-70 flex items-center justify-center gap-2">
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}<Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
