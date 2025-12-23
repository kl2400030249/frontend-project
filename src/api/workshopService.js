const WORKSHOPS_KEY = "workshops_data";
const REG_KEY = "workshop_registrations";

// Random delay between 300 and 600ms to simulate network latency
const randomDelay = () => 300 + Math.floor(Math.random() * 301);
const simulateDelay = (ms) => new Promise((r) => setTimeout(r, ms ?? randomDelay()));

const seed = () => {
  try {
    if (localStorage.getItem(WORKSHOPS_KEY)) return;

    const now = new Date().toISOString();

    const samples = [
      {
        id: "w-1",
        title: "Intro to React",
        description: "Learn the basics of React and build a small project.",
        date: "2025-12-28",
        createdBy: "admin@example.com",
        createdAt: now,
        capacity: 30,
      },
      {
        id: "w-2",
        title: "Advanced Node.js",
        description: "Deep dive into Node.js internals and performance tuning.",
        date: "2026-01-10",
        createdBy: "admin@example.com",
        createdAt: now,
        capacity: 30,
      },
    ];

    localStorage.setItem(WORKSHOPS_KEY, JSON.stringify(samples));
    if (!localStorage.getItem(REG_KEY)) localStorage.setItem(REG_KEY, JSON.stringify([]));
  } catch (err) {
    // keep failures local; caller will receive an error if operations fail
    console.error("Failed to seed workshop data", err);
  }
};

const read = (key) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};

const write = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export async function getAllWorkshops() {
  try {
    seed();
    await simulateDelay();
    return read(WORKSHOPS_KEY);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function createWorkshop(payload) {
  try {
    await simulateDelay();
    if (!payload || !payload.title || !payload.description || !payload.date || !payload.createdBy) {
      throw new Error("Missing required fields");
    }

    // Capacity is required and must be a positive number
    if (payload.capacity === undefined || payload.capacity === null) {
      throw new Error("Capacity must be a number greater than 0");
    }
    const capacity = Number(payload.capacity);
    if (!capacity || capacity <= 0) {
      throw new Error("Capacity must be a number greater than 0");
    }

    const all = read(WORKSHOPS_KEY);
    const newWorkshop = {
      id: `w-${Date.now()}`,
      title: payload.title,
      description: payload.description,
      date: payload.date,
      createdBy: payload.createdBy,
      createdAt: new Date().toISOString(),
      capacity,
    };

    all.push(newWorkshop);
    write(WORKSHOPS_KEY, all);
    return newWorkshop;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function deleteWorkshop(workshopId) {
  try {
    await simulateDelay();
    const all = read(WORKSHOPS_KEY);
    const filtered = all.filter((w) => w.id !== workshopId);
    write(WORKSHOPS_KEY, filtered);

    // remove registrations for deleted workshop
    const regs = read(REG_KEY);
    const kept = regs.filter((r) => r.workshopId !== workshopId);
    write(REG_KEY, kept);

    return true;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function registerForWorkshop(workshopId, studentEmail) {
  try {
    await simulateDelay();

    if (!workshopId || !studentEmail) throw new Error("Missing workshopId or studentEmail");

    const workshops = read(WORKSHOPS_KEY);
    const found = workshops.find((w) => w.id === workshopId);
    if (!found) throw new Error("Workshop not found");

    const capacity = typeof found.capacity === 'number' && found.capacity > 0 ? found.capacity : 30;

    const regs = read(REG_KEY);
    const existing = regs.find(
      (r) => r.workshopId === workshopId && r.studentEmail.toLowerCase() === studentEmail.toLowerCase()
    );
    if (existing) throw new Error("Already registered");

    const currentCount = regs.filter((r) => r.workshopId === workshopId).length;
    if (currentCount >= capacity) throw new Error("Workshop is full");

    const reg = { workshopId, studentEmail, registeredAt: new Date().toISOString() };
    regs.push(reg);
    write(REG_KEY, regs);
    return reg;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getStudentRegistrations(studentEmail) {
  try {
    await simulateDelay();
    if (!studentEmail) return [];
    const regs = read(REG_KEY);
    return regs.filter((r) => r.studentEmail.toLowerCase() === studentEmail.toLowerCase());
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function getWorkshopRegistrations(workshopId) {
  try {
    await simulateDelay();
    const regs = read(REG_KEY);
    return regs.filter((r) => r.workshopId === workshopId);
  } catch (err) {
    return Promise.reject(err);
  }
}

export default {
  getAllWorkshops,
  createWorkshop,
  deleteWorkshop,
  registerForWorkshop,
  getStudentRegistrations,
  getWorkshopRegistrations,
};
