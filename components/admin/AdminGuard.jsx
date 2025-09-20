"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/adminAuth";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      const next = encodeURIComponent(pathname || "/admin/dashboard");
      router.replace(`/admin/login?next=${next}`);
    }
  }, [router, pathname]);

  if (!isAdminLoggedIn()) return null;
  return children;
}
