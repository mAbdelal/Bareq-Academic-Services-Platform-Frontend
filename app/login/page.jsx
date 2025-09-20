"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";


export default function LoginPage() {
    const router = useRouter();
    const { state, dispatch } = useUser();
    const { user } = state;

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (user) {
            router.replace("/home"); // replace prevents going back to login with "Back"
        }
    }, [user, router]);

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.message || "فشل تسجيل الدخول");
            }

            if (json.data) {
                dispatch({ type: "LOGIN", payload: json.data });
            }

            router.push("/home");
        } catch (err) {
            setServerError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Prevent login form from flashing if user already logged in
    if (user) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0 hidden lg:flex">
                <Image
                    src="/undraw_authentication_tbfc.svg"
                    alt="Login Illustration"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </div>
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-label">تسجيل الدخول</h2>

                {serverError && (
                    <p className="text-red-500 text-center mb-3">{serverError}</p>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium">البريد الالكتروني</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "البريد الالكتروني مطلوب" })}
                            className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-primary"}`}
                            placeholder="example@email.com"
                        />
                        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium">كلمة المرور</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", { required: "كلمة المرور مطلوبة" })}
                            className={`border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-primary"}`}
                            placeholder="********"
                        />
                        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
                    </div>

                    <div className="flex justify-end text-sm text-gray-600">
                        <Link href="/forgot-password" className="text-primary hover:underline">نسيت كلمة المرور؟</Link>
                    </div>

                    <Button
                        type="submit"
                        className={`bg-primary text-white py-2 rounded-lg shadow hover:bg-primary/80 transition ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-gray-600 text-sm">
                    ليس لديك حساب؟{" "}
                    <Link href="/register" className="text-primary font-medium hover:underline">تسجيل حساب جديد</Link>
                </p>
            </div>
        </div>
    );
}
