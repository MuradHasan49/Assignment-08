"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-tiles", label: "All Tiles" },
  { href: "/my-profile", label: "My Profile" },
];

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const user = session?.user;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen
        ? "bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-indigo-500/5"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/40 transition-all duration-300">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span
              className="font-bold text-xl"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TileVerse
            </span>
          </Link>

          {/* Center Links — Desktop */}
          <nav className="hidden sm:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${pathname === link.href
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              <div className="relative">
                {/* User Toggle Button */}
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 cursor-pointer outline-none"
                  aria-expanded={isUserDropdownOpen}
                >
                  {user.image ? (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-indigo-500/50 flex-shrink-0">
                      <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-indigo-500/50 flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-white font-medium max-w-24 truncate">
                    {user.name}
                  </span>
                  <Icon icon="mdi:chevron-down" className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Absolute Dropdown Content */}
                {isUserDropdownOpen && (
                  <>
                    {/* Background click overlay to close */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserDropdownOpen(false)}
                    />

                    {/* Menu Body */}
                    <div className="absolute right-0 mt-2 w-[220px] z-50 origin-top-right bg-[#111118]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl shadow-black overflow-hidden animate-fadeInUp" style={{ animationDuration: '0.2s' }}>
                      <Link
                        href="/my-profile"
                        className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium text-sm"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Icon icon="mdi:account-outline" className="w-5 h-5 text-indigo-400" />
                        My Profile
                      </Link>
                      <Link
                        href="/my-profile/update"
                        className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium text-sm"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <Icon icon="mdi:cog-outline" className="w-5 h-5 text-slate-400" />
                        Update Info
                      </Link>
                      <div className="border-t border-white/5 my-1" />
                      <button
                        onClick={() => { handleLogout(); setIsUserDropdownOpen(false); }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm text-left"
                      >
                        <Icon icon="mdi:logout" className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm px-5 py-2 rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-200"
                >
                  Login
                </button>
              </Link>
            )}

            <button
              className="sm:hidden text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden pb-4 pt-2 border-t border-white/5 mt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${pathname === link.href
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 text-center mt-2"
              >
                Login
              </Link>
            )}
            {user && (
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
