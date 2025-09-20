export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { readAdminDB } from '@/lib/adminStore';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'مطلوب البريد وكلمة المرور' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const db = readAdminDB();
    const match = (db.admins || []).find(a => a.email === email && a.password === password);
    if (!match) {
      return new Response(JSON.stringify({ message: 'بيانات الدخول غير صحيحة' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ ok: true, admin: { id: match.id, name: match.name, email: match.email } }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ message: 'حدث خطأ بالخادم' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
