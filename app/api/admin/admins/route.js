export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { registerAdmin } from '@/lib/adminStore';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: 'البيانات غير مكتملة' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const res = registerAdmin({ name, email, password });
    if (!res.ok) {
      return new Response(JSON.stringify({ message: res.message || 'تعذر إنشاء الأدمن' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ message: 'تم إنشاء الأدمن بنجاح', data: res.admin }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ message: 'حدث خطأ بالخادم' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
