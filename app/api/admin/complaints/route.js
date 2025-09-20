import { readComplaints } from '@/lib/complaintsStore';

export async function GET() {
  try {
    const db = readComplaints();
    return new Response(JSON.stringify({ data: db.items }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'حدث خطأ بالخادم' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
