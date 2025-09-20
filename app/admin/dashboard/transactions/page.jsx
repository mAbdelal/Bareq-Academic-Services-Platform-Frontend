import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminTransactionsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="التحويلات المالية" description="سجل جميع التحويلات المالية داخل المنصة" />
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-right px-4 py-3">#</th>
                <th className="text-right px-4 py-3">المستخدم</th>
                <th className="text-right px-4 py-3">المبلغ</th>
                <th className="text-right px-4 py-3">النوع</th>
                <th className="text-right px-4 py-3">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">لا توجد بيانات</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
