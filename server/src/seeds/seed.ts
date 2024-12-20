import fs from 'fs';
import path from 'path';

import db from '../config/connection.js';
import { Word } from '../models/index.js';
import cleanDB from './cleanDB.js';

// Dynamically load the wordSeeds.json file using fs
const wordDataPath = path.resolve('src/seeds/wordSeeds.json');
const wordData = JSON.parse(fs.readFileSync(wordDataPath, 'utf-8'));

(async () => {
  try {
    console.log('🌱 Connecting to the database...');
    await db();

    console.log('🧹 Cleaning up the database...');
    await cleanDB();

    console.log('📦 Inserting word data...');
    await Word.insertMany(wordData);

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
})();
