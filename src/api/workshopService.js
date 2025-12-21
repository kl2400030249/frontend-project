const KEY = "workshops_data";

const seed = () => {
  const raw = localStorage.getItem(KEY);
  if (raw) return;

  const samples = [
    {
      id: "w-1",
      title: "Intro to React",
      description: "Learn the basics of React and build a small project.",
      date: "2025-12-28",
      seats: 30,
      registered: [],
    },
    {
      id: "w-2",
      title: "Advanced Node.js",
      description: "Deep dive into Node.js internals and performance tuning.",
      date: "2026-01-10",
      seats: 20,
      registered: [],
    },
  ];

  localStorage.setItem(KEY, JSON.stringify(samples));
};

const simulateDelay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function getAllWorkshops() {
  seed();
  await simulateDelay();
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function getWorkshopById(id) {
  await simulateDelay();
  const all = await getAllWorkshops();
  return all.find((w) => w.id === id) || null;
}

export async function createWorkshop(data) {
  await simulateDelay();
  const all = await getAllWorkshops();
  const newW = { id: `w-${Date.now()}`, ...data, registered: data.registered || [] };
  all.push(newW);
  localStorage.setItem(KEY, JSON.stringify(all));
  return newW;
}

export async function updateWorkshop(id, changes) {
  await simulateDelay();
  const all = await getAllWorkshops();
  const idx = all.findIndex((w) => w.id === id);
  if (idx === -1) throw new Error("Workshop not found");
  const updated = { ...all[idx], ...changes };
  all[idx] = updated;
  localStorage.setItem(KEY, JSON.stringify(all));
  return updated;
}

export async function deleteWorkshop(id) {
  await simulateDelay();
  const all = await getAllWorkshops();
  const filtered = all.filter((w) => w.id !== id);
  localStorage.setItem(KEY, JSON.stringify(filtered));
  return true;
}

export default {
  getAllWorkshops,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
};
