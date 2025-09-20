import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'admin.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) {
    const seed = {
      lastId: 1,
      admins: [
        {
          id: 1,
          name: 'Admin',
          email: 'freegaza1000@gmail.com',
          phone: '',
          password: 'gaza10.com',
          created_at: new Date().toISOString(),
        }
      ],
      profile: {
        name: 'Admin',
        email: 'freegaza1000@gmail.com',
        phone: '',
        avatarUrl: '',
        role: 'Administrator',
        bio: ''
      }
    };
    fs.writeFileSync(FILE_PATH, JSON.stringify(seed, null, 2));
  }
}

export function readAdminDB() {
  ensureFile();
  const raw = fs.readFileSync(FILE_PATH, 'utf8');
  try { return JSON.parse(raw); } catch { return { lastId: 1, admins: [], profile: {} }; }
}

export function saveAdminDB(db) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2));
}

export function getProfile() {
  const db = readAdminDB();
  return db.profile || {};
}

export function updateProfile(patch) {
  const db = readAdminDB();
  db.profile = { ...db.profile, ...patch };
  // also sync first admin record (optional)
  if (db.admins && db.admins.length > 0) {
    db.admins[0] = { ...db.admins[0], ...patch };
  }
  saveAdminDB(db);
  return db.profile;
}

export function setAvatarUrl(url) {
  const db = readAdminDB();
  db.profile = { ...db.profile, avatarUrl: url };
  if (db.admins && db.admins.length > 0) {
    db.admins[0] = { ...db.admins[0], avatarUrl: url };
  }
  saveAdminDB(db);
  return db.profile;
}

export function changePassword(current, next) {
  const db = readAdminDB();
  const admin = db.admins[0];
  if (!admin) return { ok: false, message: 'لا يوجد أدمن' };
  if (admin.password !== current) return { ok: false, message: 'كلمة المرور الحالية غير صحيحة' };
  admin.password = next;
  saveAdminDB(db);
  return { ok: true };
}

export function registerAdmin({ name, email, password }) {
  const db = readAdminDB();
  if (db.admins.find(a => a.email === email)) {
    return { ok: false, message: 'البريد مستخدم بالفعل' };
  }
  const id = (db.lastId || 1) + 1;
  const admin = { id, name, email, password, phone: '', created_at: new Date().toISOString() };
  db.lastId = id;
  db.admins.push(admin);
  saveAdminDB(db);
  return { ok: true, admin };
}
