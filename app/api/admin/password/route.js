export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { changePassword } from '@/lib/adminStore';

export async function POST(req) {
  try {
    const { current, next } = await req.json();
    if (!current || !next) return new Response(JSON.stringify({ message: 'البيانات غير مكتملة' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    const result = changePassword(current, next);
    if (!result.ok) return new Response(JSON.stringify({ message: result.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    return new Response(JSON.stringify({ message: 'تم تغيير كلمة المرور' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ message: 'حدث خطأ بالخادم' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
