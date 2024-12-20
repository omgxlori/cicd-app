import mongoose from 'mongoose';
import Word from '../models/Word.js';
import wordData from './wordSeeds.json' assert { type: 'json' };

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🌱 Connected to the database. Seeding data...');

    await Word.deleteMany({});
    await Word.insertMany(wordData);

    console.log('✅ Seeding complete!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    mongoose.connection.close();
  }
})();
