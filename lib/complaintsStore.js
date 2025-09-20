import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'complaints.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, JSON.stringify({ lastId: 0, items: [] }, null, 2));
}

export function readComplaints() {
  ensureFile();
  const raw = fs.readFileSync(FILE_PATH, 'utf8');
  try { return JSON.parse(raw); } catch { return { lastId: 0, items: [] }; }
}

export function addComplaint({ name, email, subject, message, title, content }) {
  const db = readComplaints();
  const id = db.lastId + 1;
  const item = {
    id,
    name: name || null,
    email: email || null,
    subject: subject || title || '',
    message: message || content || '',
    status: 'new',
    created_at: new Date().toISOString(),
  };
  db.items.unshift(item);
  db.lastId = id;
  fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2));
  return item;
}

export function resolveComplaint(id, decision) {
  const db = readComplaints();
  const idx = db.items.findIndex(x => String(x.id) === String(id));
  if (idx === -1) return null;
  db.items[idx].status = 'resolved';
  db.items[idx].decision = decision || null;
  db.items[idx].resolved_at = new Date().toISOString();
  fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2));
  return db.items[idx];
}
