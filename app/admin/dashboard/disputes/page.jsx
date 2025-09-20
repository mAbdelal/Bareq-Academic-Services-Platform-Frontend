import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminDisputesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="كل النزاعات" description="عرض وإدارة النزاعات المفتوحة والمغلقة" />
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-right px-4 py-3">#</th>
                <th className="text-right px-4 py-3">العنوان</th>
                <th className="text-right px-4 py-3">الحالة</th>
                <th className="text-right px-4 py-3">تاريخ الإنشاء</th>
                <th className="text-right px-4 py-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">لا توجد بيانات</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
