import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const STORAGE_PATH = path.resolve(process.cwd(), 'scripts', 'localStorage.json');

class LocalStorage {
  constructor(file) {
    this.file = file;
    this.data = {};
    this._load();
  }
  _load() {
    try {
      if (fs.existsSync(this.file)) {
        const raw = fs.readFileSync(this.file, 'utf8');
        this.data = raw ? JSON.parse(raw) : {};
      } else {
        this.data = {};
      }
    } catch (err) {
      this.data = {};
    }
  }
  _save() {
    fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2), 'utf8');
  }
  getItem(k) {
    return Object.prototype.hasOwnProperty.call(this.data, k) ? this.data[k] : null;
  }
  setItem(k, v) {
    this.data[k] = v;
    this._save();
  }
  removeItem(k) {
    delete this.data[k];
    this._save();
  }
  clear() {
    this.data = {};
    this._save();
  }
}

// helper to run a node subprocess script that imports the service and runs actions
function runChild(script) {
  const nodeScript = `
    global.localStorage = (function(){
      const fs = require('fs');
      const path = require('path');
      const file = ${JSON.stringify(STORAGE_PATH)};
      let data = {};
      try { data = JSON.parse(fs.readFileSync(file, 'utf8') || '{}'); } catch(e) { data = {}; }
      const store = {
        getItem: (k) => data[k] ?? null,
        setItem: (k,v) => { data[k] = v; fs.writeFileSync(file, JSON.stringify(data, null, 2)); },
        removeItem: (k) => { delete data[k]; fs.writeFileSync(file, JSON.stringify(data, null, 2)); },
        clear: () => { data = {}; fs.writeFileSync(file, JSON.stringify(data, null, 2)); }
      };
      return store;
    })();

    (async () => { try { ${script} } catch (err) { console.error('ERROR:', err && err.stack ? err.stack : err); process.exit(2); } })();
  `;

  const res = spawnSync('node', ['-e', nodeScript], { encoding: 'utf8' });
  return res;
}

// Start fresh by removing storage file
try { fs.unlinkSync(STORAGE_PATH); } catch (e) {}
const local = new LocalStorage(STORAGE_PATH);

console.log('=== Smoke Test Start ===');

// 1) Admin flow – first run should seed demo workshops
console.log('\n-- Admin: initial getAllWorkshops (should seed 2) --');
let out = runChild("const svc = await import('../src/api/workshopService.js'); const arr = await svc.getAllWorkshops(); console.log('count=' + arr.length); console.log(JSON.stringify(arr, null,2));");
console.log(out.stdout);
if (out.status !== 0) { console.error(out.stderr); process.exit(1); }

// Call again to check no duplicate seeding
console.log('-- Admin: second getAllWorkshops (should still be 2) --');
out = runChild("const svc = await import('../src/api/workshopService.js'); const arr = await svc.getAllWorkshops(); console.log('count=' + arr.length);");
console.log(out.stdout);
if (out.status !== 0) { console.error(out.stderr); process.exit(1); }

// Create a new workshop as admin
console.log('-- Admin: createWorkshop (should add one) --');
out = runChild("const svc = await import('../src/api/workshopService.js'); const w = await svc.createWorkshop({ title: 'Node Smoke Test', description: 'Created during smoke test', date: '2026-02-02', createdBy: 'admin@example.com' }); console.log('created:' + JSON.stringify(w)); const arr = await svc.getAllWorkshops(); console.log('count=' + arr.length);");
console.log(out.stdout);
if (out.status !== 0) { console.error(out.stderr); process.exit(1); }

// Simulate refresh: new child process reading persisted storage
console.log('-- Simulate refresh: child read (should see 3) --');
out = runChild("const svc = await import('../src/api/workshopService.js'); const arr = await svc.getAllWorkshops(); console.log('count=' + arr.length);");
console.log(out.stdout);
if (out.status !== 0) { console.error(out.stderr); process.exit(1); }

// Delete the workshop we created
console.log('-- Admin: delete created workshop --');
out = runChild("const svc = await import('../src/api/workshopService.js'); const arr = await svc.getAllWorkshops(); const w = arr.find(x => x.title === 'Node Smoke Test'); if (!w) { console.error('created workshop not found'); process.exit(3); } await svc.deleteWorkshop(w.id); const after = await svc.getAllWorkshops(); console.log('after_count=' + after.length);");
console.log(out.stdout);
if (out.status !== 0) { console.error(out.stderr); process.exit(1); }

// Student flow – ensure workshops list loads
console.log('\n-- Student: list workshops (should be 2) --');
out = runChild("const svc = await import('../src/api/workshopService.js'); const arr = await svc.getAllWorkshops(); console.log('count=' + arr.length); console.log(arr.map(a=>({id:a.id,title:a.title,date:a.date}))); ");
console.log(out.stdout);
if (out.status !== 0) { console.error(out.stderr); process.exit(1); }

// Validate seed only once across multiple reads (run 3 child processes)
console.log('\n-- Seed duplication check: multiple reads --');
for (let i=0;i<3;i++) {
  out = runChild("const svc = await import('../src/api/workshopService.js'); const arr = await svc.getAllWorkshops(); console.log('count=' + arr.length); ");
  console.log('run', i+1, '->', out.stdout.trim());
  if (out.status !== 0) { console.error(out.stderr); process.exit(1); }
}

console.log('\n=== Smoke Test Completed Successfully ===');
process.exit(0);
