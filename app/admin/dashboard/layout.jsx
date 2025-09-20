"use client";
import AdminGuard from "@/components/admin/AdminGuard";
import Link from "next/link";
import { adminLogout } from "@/lib/adminAuth";
import { useRouter, usePathname } from "next/navigation";

function linkCls(href, pathname) {
  return `px-3 py-2 rounded-md text-sm font-medium ${pathname === href ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`;
}

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    adminLogout();
    router.replace("/admin/login");
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Top Header */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-4">
          <div className="text-lg font-bold">لوحة تحكم الأدمن</div>
          <div className="flex items-center gap-2">
            <button onClick={handleLogout} className="px-3 py-1.5 bg-red-500 text-white rounded-md text-sm">تسجيل الخروج</button>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-l min-h-[calc(100vh-56px)] p-4">
            <nav className="flex flex-col gap-2">
              <div className="text-xs text-gray-400 px-2">عام</div>
              <Link className={linkCls("/admin/dashboard", pathname)} href="/admin/dashboard">الرئيسية</Link>
              <div className="text-xs text-gray-400 px-2 mt-4">إدارة الحساب</div>
              <Link className={linkCls("/admin/dashboard/register-admin", pathname)} href="/admin/dashboard/register-admin">تسجيل أدمن جديد</Link>
              <Link className={linkCls("/admin/dashboard/change-password", pathname)} href="/admin/dashboard/change-password">تغيير كلمة المرور</Link>
              <Link className={linkCls("/admin/dashboard/edit-profile", pathname)} href="/admin/dashboard/edit-profile">تعديل بيانات الأدمن</Link>
              <div className="text-xs text-gray-400 px-2 mt-4">إدارة المنصة</div>
              <Link className={linkCls("/admin/dashboard/disputes", pathname)} href="/admin/dashboard/disputes">كل النزاعات</Link>
              <Link className={linkCls("/admin/dashboard/transactions", pathname)} href="/admin/dashboard/transactions">التحويلات المالية</Link>
              <Link className={linkCls("/admin/dashboard/complaints", pathname)} href="/admin/dashboard/complaints">الشكاوى</Link>
              <Link className={linkCls("/admin/dashboard/resolve-complaint", pathname)} href="/admin/dashboard/resolve-complaint">حل الشكوى</Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
