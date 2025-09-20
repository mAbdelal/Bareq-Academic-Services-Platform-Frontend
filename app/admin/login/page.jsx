"use client";
import { useForm } from "react-hook-form";
import { adminLogin, isAdminLoggedIn } from "@/lib/adminAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/admin/dashboard";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { email: "", password: "" }
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminLoggedIn()) router.replace("/admin/dashboard");
  }, [router]);

  const onSubmit = async (data) => {
    setError("");
    const res = await adminLogin(data.email, data.password);
    if (res.ok) {
      router.replace(next);
    } else {
      setError(res.message || "بيانات الدخول غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-2 text-center">تسجيل دخول الأدمن</h1>
        <p className="text-center text-gray-500 mb-6">الرجاء إدخال بيانات الدخول للوصول إلى لوحة التحكم</p>
        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" aria-invalid={errors.email ? true : undefined} {...register("email", { required: "مطلوب" })} />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" type="password" aria-invalid={errors.password ? true : undefined} {...register("password", { required: "مطلوب" })} />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <Button type="submit" className="bg-primary text-white py-2 rounded" disabled={isSubmitting}>
            {isSubmitting ? "جاري الدخول..." : "دخول"}
          </Button>
        </form>
      </div>
    </div>
  );
}
