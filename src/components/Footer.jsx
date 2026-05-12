import Link from "next/link";
import { Icon } from "@iconify/react";

const footerLinks = {
  Gallery: [
    { label: "All Tiles", href: "/all-tiles" },
    { label: "Ceramic", href: "/all-tiles?category=ceramic" },
    { label: "Marble", href: "/all-tiles?category=marble" },
    { label: "Mosaic", href: "/all-tiles?category=mosaic" },
  ],
  Company: [
    { label: "Home", href: "/" },
    { label: "My Profile", href: "/my-profile" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ],
};

const socialLinks = [
  { icon: "mdi:facebook", href: "https://facebook.com", label: "Facebook", color: "#1877F2" },
  { icon: "mdi:twitter", href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
  { icon: "mdi:instagram", href: "https://instagram.com", label: "Instagram", color: "#E4405F" },
  { icon: "mdi:youtube", href: "https://youtube.com", label: "YouTube", color: "#FF0000" },
  { icon: "mdi:pinterest", href: "https://pinterest.com", label: "Pinterest", color: "#BD081C" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#06060c] border-t border-white/5 mt-auto">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group w-fit mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span
                className="font-bold text-2xl"
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
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Discover premium tiles for every style — from classic ceramic to luxurious marble.
              Your perfect space starts here.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-white/20"
                >
                  <Icon icon={s.icon} className="w-4 h-4 text-slate-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-indigo-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Us */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">Contact Us</h3>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-400">
                <a
                  href="mailto:hello@tileverse.com"
                  className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
                >
                  <Icon icon="mdi:email-outline" className="w-4 h-4" />
                  hello@tileverse.com
                </a>
                <a
                  href="tel:+8801723456789"
                  className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
                >
                  <Icon icon="mdi:phone-outline" className="w-4 h-4" />
                  +8801723456789
                </a>
                <span className="flex items-center gap-2">
                  <Icon icon="mdi:map-marker-outline" className="w-4 h-4" />
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>

            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} TileVerse. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
