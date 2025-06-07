import { chromium } from '@playwright/test';
import fs from 'fs';

export default async function globalSetup() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(process.env.BASE_URL+"/login");
  await page.fill('#email', process.env.EMAIL);
  await page.fill('#password', process.env.PASSWORD);
  await page.click('button[id=login-submit]');

  const storageState = await page.context().storageState();

  
  // Extract cookies and localStorage as usual
  const storage = await page.context().storageState();

  const indexedDBData = await page.evaluate(async () => {
    const dbs = await indexedDB.databases();
    const data = {};

    for (const { name } of dbs) {
      if (!name) continue;
      data[name] = {};

      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(name);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      const transaction = db.transaction(db.objectStoreNames, 'readonly');

      await Promise.all([...db.objectStoreNames].map(async (storeName) => {
        const store = transaction.objectStore(storeName);
        const records = await new Promise((resolve) => {
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => resolve([]); // Handle potential errors gracefully
        });
        data[name][storeName] = records;
      }));

      db.close();
    }

    return data;
  });

  // Save both storage and IndexedDB data to 'auth.json'
  fs.writeFileSync('auth.json', JSON.stringify({ storage, indexedDBData }));
  await browser.close();
}