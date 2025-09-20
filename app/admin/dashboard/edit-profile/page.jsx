"use client";
import { useForm } from "react-hook-form";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function AdminEditProfilePage() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/profile');
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.message || 'تعذر تحميل البيانات');
        reset({ name: json?.data?.name || '', phone: json?.data?.phone || '', role: json?.data?.role || '', bio: json?.data?.bio || '' });
        setAvatar(json?.data?.avatarUrl || '');
      } catch (e) {
        toast.error(e.message || 'حدث خطأ في التحميل');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, phone: data.phone, role: data.role, bio: data.bio })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || 'تعذر الحفظ');
      toast.success('تم الحفظ');
    } catch (e) {
      toast.error(e.message || 'حدث خطأ');
    }
  };
  const [avatar, setAvatar] = useState('');
  const [uploading, setUploading] = useState(false);
  const onAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append('avatar', file);
    try {
      setUploading(true);
      const res = await fetch('/api/admin/profile/avatar', { method: 'POST', body: form });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.message || 'تعذر رفع الصورة');
      setAvatar(json.url);
      toast.success('تم رفع الصورة');
    } catch (err) {
      toast.error(err.message || 'خطأ في الرفع');
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="space-y-6">
      <AdminPageHeader title="تعديل بيانات الأدمن" description="قم بتحديث معلومات الملف الشخصي" />
      <div className="bg-white rounded-xl shadow p-6 max-w-xl">
        {loading ? (
          <div className="text-center text-gray-500">جاري التحميل...</div>
        ) : (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            <img src={avatar || "/default-avatar.png"} alt="avatar" className="w-20 h-20 rounded-full object-cover border" />
            <div>
              <Label htmlFor="avatar">صورة الملف</Label>
              <Input id="avatar" type="file" accept="image/*" onChange={onAvatarChange} disabled={uploading} />
              {uploading && <div className="text-sm text-gray-500 mt-1">جاري الرفع...</div>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">الاسم</Label>
            <Input id="name" {...register("name")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">الهاتف</Label>
            <Input id="phone" {...register("phone")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">الدور</Label>
            <Input id="role" placeholder="مثال: Administrator" {...register("role")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">نبذة</Label>
            <Textarea id="bio" rows={4} placeholder="اكتب نبذة قصيرة عن الأدمن" {...register("bio")} />
          </div>
          <Button className="bg-primary" disabled={isSubmitting}>{isSubmitting ? 'جاري الحفظ...' : 'حفظ'}</Button>
        </form>
        )}
      </div>
    </div>
  );
}
