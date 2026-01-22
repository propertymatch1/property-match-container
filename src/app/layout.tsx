import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Playfair_Display, Inter } from "next/font/google";
import { AuthProvider } from "~/lib/auth-context";

export const metadata: Metadata = {
  title: "Identia - Connect Brands with Premium Spaces",
  description: "Identia connects emerging brands with premium retail spaces through intelligent matching.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfairDisplay.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
