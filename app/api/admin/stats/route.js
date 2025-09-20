export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { readDisputes } from '@/lib/disputesStore';
import { readComplaints } from '@/lib/complaintsStore';
import { readTransactions } from '@/lib/transactionsStore';
import { readUsers } from '@/lib/usersStore';

export async function GET() {
  try {
    const disputes = readDisputes();
    const complaints = readComplaints();
    const transactions = readTransactions();
    const users = readUsers();

    const disputesCount = (disputes.items || []).length;
    const newComplaints = (complaints.items || []).filter(c => (c.status || 'new') === 'new').length;

    const today = new Date();
    const isSameDay = (iso) => {
      const d = new Date(iso);
      return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
    };
    const transactionsToday = (transactions.items || []).filter(t => isSameDay(t.created_at)).length;
    const activeUsers = (users.items || []).filter(u => !!u.active).length;

    return new Response(JSON.stringify({
      data: {
        disputesCount,
        newComplaints,
        transactionsToday,
        activeUsers,
      }
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ message: 'حدث خطأ بالخادم' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
