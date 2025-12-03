import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Vamos usar a fonte Inter igual ao CSS
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider"; // <--- Importe isso

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AddressMap Pro",
  description: "Gerenciador de endereços logísticos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'suppressHydrationWarning' é vital para o next-themes não dar erro no console
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}