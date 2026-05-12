import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../globals.css";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <title>TileVerse — Discover Your Perfect Aesthetic</title>
        <meta
          name="description"
          content="Explore a curated gallery of premium tiles — ceramic, marble, mosaic, and more. Find the perfect tile for your home."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e1e2e",
              color: "#f1f5f9",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
            },
            success: {
              iconTheme: { primary: "#6366f1", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
