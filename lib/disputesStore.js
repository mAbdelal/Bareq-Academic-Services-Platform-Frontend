import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'disputes.json');

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) {
    const seed = { lastId: 0, items: [] };
    fs.writeFileSync(FILE_PATH, JSON.stringify(seed, null, 2));
  }
}

export function readDisputes() {
  ensureFile();
  try { return JSON.parse(fs.readFileSync(FILE_PATH, 'utf8')); } catch { return { lastId: 0, items: [] }; }
}

export function addDispute({ title, status = 'open' }) {
  const db = readDisputes();
  const id = (db.lastId || 0) + 1;
  const item = { id, title: title || `نزاع #${id}`, status, created_at: new Date().toISOString() };
  db.lastId = id;
  db.items.unshift(item);
  fs.writeFileSync(FILE_PATH, JSON.stringify(db, null, 2));
  return item;
}
