import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/design-system.css";
import "../styles/transitions.css";
import "../styles/animations.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { WalletProvider } from "@/contexts/WalletContext";
import EnhancedNavigation from "@/components/EnhancedNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImpactHub - Web3 Nonprofit Funding Platform",
  description: "Transparent, decentralized funding for nonprofit initiatives with Web3 technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <WalletProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <EnhancedNavigation />
              <main className="pt-20">
                {children}
              </main>
            </div>
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}