import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'users.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) {
    const seed = { lastId: 0, items: [] };
    fs.writeFileSync(FILE_PATH, JSON.stringify(seed, null, 2));
  }
}

export function readUsers() {
  ensureFile();
  try { return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8')); } catch { return { lastId: 0, items: [] }; }
}

export function addUser({ name, email, active = false }) {
  const db = readUsers();
  const id = (db.lastId || 0) + 1;
  const item = { id, name: name || 'مستخدم', email: email || '', active: !!active, created_at: new Date().toISOString() };
  db.lastId = id;
  db.items.push(item);
  fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2));
  return item;
}

export function setUserActive(id, active) {
  const db = readUsers();
  const idx = db.items.findIndex(x => String(x.id) === String(id));
  if (idx === -1) return null;
  db.items[idx].active = !!active;
  fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2));
  return db.items[idx];
}
