import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Авіаційний коледж",
  description: "Криворізький Фаховий Коледж НАУ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavigationLoadingProvider>
            <LoadingBar />
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
