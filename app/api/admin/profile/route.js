export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { getProfile, updateProfile } from '@/lib/adminStore';

export async function GET() {
  try {
    const profile = getProfile();
    return new Response(JSON.stringify({ data: profile }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ message: 'حدث خطأ بالخادم' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const saved = updateProfile(body || {});
    return new Response(JSON.stringify({ message: 'تم الحفظ', data: saved }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ message: 'حدث خطأ بالخادم' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
