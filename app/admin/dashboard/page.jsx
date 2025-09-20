"use client";
import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({ disputesCount: 0, newComplaints: 0, transactionsToday: 0, activeUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch('/api/admin/stats');
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.message || 'تعذر جلب الإحصائيات');
        setStats(json.data || {});
      } catch (e) {
        setError(e.message || 'حدث خطأ');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const cards = [
    { t: 'عدد النزاعات', v: stats.disputesCount },
    { t: 'الشكاوى الجديدة', v: stats.newComplaints },
    { t: 'التحويلات اليوم', v: stats.transactionsToday },
    { t: 'المستخدمون النشطون', v: stats.activeUsers },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="الرئيسية" description="نظرة عامة سريعة على مؤشرات لوحة التحكم" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading && cards.map((c,i)=> (
          <div key={i} className="bg-white rounded-xl shadow p-4">
            <div className="text-gray-500 text-sm">{c.t}</div>
            <div className="text-2xl font-bold mt-2">--</div>
          </div>
        ))}
        {!loading && !error && cards.map((c,i)=> (
          <div key={i} className="bg-white rounded-xl shadow p-4">
            <div className="text-gray-500 text-sm">{c.t}</div>
            <div className="text-2xl font-bold mt-2">{c.v}</div>
          </div>
        ))}
        {error && !loading && (
          <div className="col-span-4 bg-white rounded-xl shadow p-4 text-red-500">{error}</div>
        )}
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-bold mb-2">آخر الأنشطة</div>
        <p className="text-gray-500">لا توجد بيانات لعرضها حاليًا.</p>
      </div>
    </div>
  );
}
