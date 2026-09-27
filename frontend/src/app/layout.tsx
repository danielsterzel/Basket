import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Smasket — cały koszyk w najniższej cenie",
  description: "Porównaj ceny produktów i dostawy. Zobacz, w których sklepach kupisz cały koszyk najtaniej.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">

      <body>
        <QueryProvider>
        {children}
        </QueryProvider>
        <Toaster/>
      </body>
    </html>
  );
}
