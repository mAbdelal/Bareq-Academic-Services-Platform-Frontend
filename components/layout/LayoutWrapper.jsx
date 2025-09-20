"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    const noLayoutPages = ["/login", "/register/academic"];
    const hideLayout = noLayoutPages.includes(pathname);

    return (
        <>
            {!hideLayout && <Navbar />}
            {children}
            {!hideLayout && <Footer />}
        </>
    );
}
