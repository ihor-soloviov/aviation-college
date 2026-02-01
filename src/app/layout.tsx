import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileMenuDrawer from "@/components/layout/MobileMenuDrawer";
import { MobileMenuProvider } from "@/hooks/useMobileMenu";
import { ThemeProvider } from "next-themes";
import {
  NavigationLoadingProvider,
  LoadingBar,
} from "@/components/common/LoadingBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Авіаційний коледж",
  description: "ВСП КРФК НАУ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavigationLoadingProvider>
            {/* <LoadingBar /> */}
            <MobileMenuProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <MobileMenuDrawer />
                <main className="flex-1">
                  {children}
                  <Footer />
                </main>
              </div>
            </MobileMenuProvider>
          </NavigationLoadingProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
