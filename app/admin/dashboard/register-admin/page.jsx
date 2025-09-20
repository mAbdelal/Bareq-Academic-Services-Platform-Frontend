"use client";
import { useForm } from "react-hook-form";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function RegisterAdminPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || 'تعذر إنشاء الأدمن');
      toast.success('تم إنشاء الأدمن بنجاح');
      reset({ name: '', email: '', password: '' });
    } catch (e) {
      toast.error(e.message || 'حدث خطأ');
    }
  };
  return (
    <div className="space-y-6">
      <AdminPageHeader title="تسجيل أدمن جديد" description="أدخل بيانات الأدمن الجديد وإحفظها" />
      <div className="bg-white rounded-xl shadow p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">الاسم</Label>
            <Input id="name" aria-invalid={errors.name ? true : undefined} {...register("name", { required: "مطلوب" })} />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" aria-invalid={errors.email ? true : undefined} {...register("email", { required: "مطلوب" })} />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" type="password" aria-invalid={errors.password ? true : undefined} {...register("password", { required: "مطلوب" })} />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <div className="md:col-span-2">
            <Button className="bg-primary" disabled={isSubmitting}>{isSubmitting ? 'جاري الحفظ...' : 'حفظ'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
