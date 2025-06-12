import { Inter } from "next/font/google";
import "./globals.css";
import Header from "components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "components/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Luxora-Finance Manager ",
  description: "one stop for finance platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* header*/}

          <Header />

          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          {/*footer */}

          <Footer />
          
        </body>
      </html>
    </ClerkProvider>
  );
}
