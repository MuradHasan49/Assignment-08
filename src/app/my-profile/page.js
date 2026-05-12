"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSession, signOut } from "@/lib/auth-client";
import AppNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login?redirect=/my-profile");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  if (isPending) return <Loader fullPage text="Loading profile..." />;
  if (!session?.user) return null;

  const user = session.user;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <AppNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-indigo-400 text-sm font-medium mb-1 flex items-center gap-2">
            <Icon icon="mdi:account-circle-outline" className="w-4 h-4" />
            Account
          </p>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>
            My Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 text-center">
              <div className="relative inline-block mb-4">
                <Link href="/my-profile/update" className="group relative block">
                  {user.image ? (
                    <div className="relative w-28 h-28 mx-auto overflow-hidden rounded-full ring-4 ring-indigo-500/30 transition-all group-hover:ring-indigo-500/60">
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        fill
                        className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-[2px]">
                        <Icon icon="mdi:pencil" className="text-white w-6 h-6 drop-shadow-lg" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-4 ring-indigo-500/30 transition-all group-hover:ring-indigo-500/60">
                      <span className="text-white text-4xl font-bold transition-transform group-hover:scale-90 duration-300">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </span>
                      <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <Icon icon="mdi:pencil" className="text-white w-6 h-6" />
                      </div>
                    </div>
                  )}
                </Link>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#111118]" />
              </div>
              <h2 className="text-white font-bold text-xl mb-1">{user.name}</h2>
              <p className="text-slate-400 text-sm mb-4 truncate">{user.email}</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                <Icon icon="mdi:check-circle" className="w-3.5 h-3.5" />
                Active Account
              </span>
            </div>
          </div>

          {/* Info Card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                <Icon icon="mdi:information-outline" className="w-5 h-5 text-indigo-400" />
                Account Information
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "mdi:account-outline", label: "Full Name", value: user.name || "Not set" },
                  { icon: "mdi:email-outline", label: "Email Address", value: user.email },
                  {
                    icon: "mdi:calendar-outline",
                    label: "Member Since",
                    value: user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                      : "N/A",
                  },
                  {
                    icon: "mdi:shield-check-outline",
                    label: "Email Verified",
                    value: user.emailVerified ? "Verified" : "Not Verified",
                    highlight: user.emailVerified ? "text-emerald-400" : "text-yellow-400",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon icon={item.icon} className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-500 text-xs mb-0.5">{item.label}</p>
                      <p className={`font-medium text-sm truncate ${item.highlight || "text-white"}`}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/my-profile/update"
                className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl h-11 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-200 cursor-pointer w-full"
              >
                <Icon icon="mdi:pencil-outline" className="w-4 h-4 mr-2" />
                Update Information
              </Link>
              <Button
                onClick={handleLogout}
                id="profile-logout-btn"
                variant="bordered"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl h-11 font-semibold"
              >
                <Icon icon="mdi:logout" className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
