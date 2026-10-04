import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = { title: "SOPORTE TECNICO FCQI · UABC" };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="es" className={inter.variable}><body>{children}</body></html>;
}
