export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import fs from 'fs';
import path from 'path';
import { setAvatarUrl } from '@/lib/adminStore';

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('avatar');
    if (!file) {
      return new Response(JSON.stringify({ message: 'لم يتم اختيار صورة' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const ext = (file.name && file.name.includes('.')) ? file.name.substring(file.name.lastIndexOf('.')) : '.png';
    const filename = `admin-avatar-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const url = `/uploads/${filename}`;
    const profile = setAvatarUrl(url);

    return new Response(JSON.stringify({ message: 'تم رفع الصورة', url, data: profile }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('Avatar upload error:', e);
    return new Response(JSON.stringify({ message: 'حدث خطأ أثناء رفع الصورة' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
