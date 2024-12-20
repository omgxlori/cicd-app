import db from '../config/connection.js';
import { Word } from '../models/index.js';
import cleanDB from './cleanDB.js';

// Load word data
import wordData from './wordSeeds.json'; // Ensure resolveJsonModule is enabled in tsconfig.json

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
