import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB File Path
const DB_FILE = path.join(__dirname, '..', 'data', 'db.json');

// Ensure database directory exists
const ensureDbDirExists = () => {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Initial database seeding data
const initialData = {
  generations: [],
  feedback: [],
  templates: [
    {
      "id": "tpl_1",
      "template_name": "RGB Cyberpunk PC Setup",
      "input_values": {
        "customer_name": "Nikhil Rao",
        "room_length": "12",
        "room_width": "10",
        "room_height": "9",
        "budget": "75000",
        "device_type": "PC",
        "current_setup": "Single monitor on an old standard wooden office table.",
        "theme": "RGB",
        "desk_size": "Standard L-Shape (60x30 in)",
        "lighting": "RGB Strips, Ambient Lighting, Neon sign",
        "cable_management": "Under desk tray, Zip ties",
        "storage": "Pegboard, Under desk drawers",
        "notes": "Mainly plays multiplayer competitive shooter games, wants the setup to look clean and futuristic."
      },
      "created_at": "2026-06-15T00:00:00Z"
    },
    {
      "id": "tpl_2",
      "template_name": "Minimalist Warm Wood Laptop Setup",
      "input_values": {
        "customer_name": "Ananya Sharma",
        "room_length": "10",
        "room_width": "8",
        "room_height": "8.5",
        "budget": "45000",
        "device_type": "Laptop",
        "current_setup": "MacBook Pro on a small desk in the corner.",
        "theme": "Minimal",
        "desk_size": "Compact Straight Desk (48x24 in)",
        "lighting": "Warm white desk lamp, Screenbar light",
        "cable_management": "Velcro cable sleeve, adhesive clips",
        "storage": "Monitor riser with drawer",
        "notes": "Focuses on productivity and occasional light gaming. Prefers natural/minimal aesthetics with wood accents."
      },
      "created_at": "2026-06-15T00:00:00Z"
    },
    {
      "id": "tpl_3",
      "template_name": "Futuristic Console Command Center",
      "input_values": {
        "customer_name": "Pavan Kalyan",
        "room_length": "14",
        "room_width": "12",
        "room_height": "9",
        "budget": "120000",
        "device_type": "Console",
        "current_setup": "PS5 connected to a 55\" TV on a simple cabinet, sitting on a sofa.",
        "theme": "Futuristic",
        "desk_size": "Large Custom Console Center",
        "lighting": "Smart lightbars, reactive backlighting",
        "cable_management": "In-wall run, cable trunking",
        "storage": "Floating shelves for physical game disks and controllers",
        "notes": "Plays PS5 games, wants comfortable gaming chair or bean bag, wants a premium experience."
      },
      "created_at": "2026-06-15T00:00:00Z"
    },
    {
      "id": "tpl_4",
      "template_name": "Premium Multi-Device Powerstation",
      "input_values": {
        "customer_name": "Vikram Sen",
        "room_length": "15",
        "room_width": "12",
        "room_height": "9.5",
        "budget": "200000",
        "device_type": "Multi-device",
        "current_setup": "Gaming PC + Mac Studio + Dual Monitors + iPad. Table is crowded.",
        "theme": "Premium",
        "desk_size": "Dual-motor Sit-Stand Desk (72x30 in)",
        "lighting": "Smart LED Panels (Nanoleaf), task lighting, floor lamps",
        "cable_management": "Cable tray, magnetic snake guide, braided wraps",
        "storage": "Drawer cabinet, headphone stand, accessory docks",
        "notes": "Works in software dev, streams console/PC games. Needs smooth switching between systems and excellent ergonomics."
      },
      "created_at": "2026-06-15T00:00:00Z"
    }
  ]
};

// Read database
export const readDb = () => {
  ensureDbDirExists();
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading JSON DB file, reverting to defaults:', err);
    return initialData;
  }
};

// Write database
export const writeDb = (data) => {
  ensureDbDirExists();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing JSON DB file:', err);
    return false;
  }
};

// CRUD Helpers
export const db = {
  // Get all items from a collection
  getAll: (collection) => {
    const data = readDb();
    return data[collection] || [];
  },

  // Find single item by ID
  findById: (collection, id) => {
    const data = readDb();
    const list = data[collection] || [];
    return list.find(item => item.id === id);
  },

  // Insert an item
  insert: (collection, item) => {
    const data = readDb();
    if (!data[collection]) {
      data[collection] = [];
    }
    
    // Auto-generate id if not present
    if (!item.id) {
      const prefix = collection.substring(0, 3);
      item.id = `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    }
    
    item.created_at = item.created_at || new Date().toISOString();
    data[collection].push(item);
    writeDb(data);
    return item;
  },

  // Update item by ID
  update: (collection, id, updates) => {
    const data = readDb();
    const list = data[collection] || [];
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    list[index] = { ...list[index], ...updates, id }; // ensure ID doesn't change
    data[collection] = list;
    writeDb(data);
    return list[index];
  },

  // Delete item by ID
  delete: (collection, id) => {
    const data = readDb();
    const list = data[collection] || [];
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return false;

    list.splice(index, 1);
    data[collection] = list;
    writeDb(data);
    return true;
  }
};
