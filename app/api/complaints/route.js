export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { addComplaint } from '@/lib/complaintsStore';
export async function POST(req) {
  try {
    const body = await req.json();
    const saved = addComplaint(body || {});
    return new Response(JSON.stringify({ message: 'تم استلام الشكوى بنجاح', data: saved }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Complaint local save exception:', err);
    return new Response(JSON.stringify({ message: 'حدث خطأ بالخادم' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  if (!base) {
    return new Response(JSON.stringify({ ok: false, reason: 'ENV_MISSING', message: 'لم يتم ضبط المتغير NEXT_PUBLIC_BASE_URL' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
  try {
    const url = `${base}/complaints`;
    // Try OPTIONS then HEAD to avoid creating data
    let ping = await fetch(url, { method: 'OPTIONS' }).catch(() => null);
    if (!ping) ping = await fetch(url, { method: 'HEAD' }).catch(() => null);
    const reachable = !!(ping && (ping.ok || [200,204,400,401,405].includes(ping.status)));
    return new Response(JSON.stringify({ ok: true, base, reachable, status: ping?.status ?? null }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, base, reason: 'PING_FAILED', message: String(e) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
