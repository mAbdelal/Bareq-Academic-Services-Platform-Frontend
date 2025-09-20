import "./globals.css";
import Container from "@/components/ui/Container";
import { Cairo } from 'next/font/google';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import { UserProvider } from "@/context/UserContext";

import { Toaster } from "@/components/ui/sonner"

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-cairo',
});

export const metadata = {
  title: "بارق | المنصة الغزية للخدمات الأكاديمية",
  description: "بارق هي منصة خدمات أكاديمية تربط بين الطلاب والمستقلين الأكاديميين لتلبية احتياجاتهم التعليمية بأعلى جودة وأفضل الأسعار.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" className={cairo.className} dir="rtl">
      <body>
      <UserProvider>
        <Navbar/>
          <Container className="pt-[50px]">
            <main>{children}</main>
            <Toaster richColors position="top-center" />
          </Container>
          <Footer/>
      </UserProvider>
      </body>
    </html>
  );
}
