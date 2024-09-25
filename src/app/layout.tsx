import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxStoreProvider from "@/redux/ReduxStoreProvider";
import QueryProvider from "@/query/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Farmacie Login",
  description: "Login to Farmacie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ReduxStoreProvider>{children}</ReduxStoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
