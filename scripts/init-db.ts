/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/init-db.ts
const mongoose = require('mongoose');
const { config } = require('dotenv');
const path = require('path');

// Load environment variables
config({ 
  path: path.resolve(process.cwd(), '.env.local'),
});

// Define Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
}, { timestamps: true });

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  cards: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

async function initDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please set MONGODB_URI in .env.local file');
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const User = mongoose.model('User', userSchema);
    const Topic = mongoose.model('Topic', topicSchema);
    const Chapter = mongoose.model('Chapter', chapterSchema);

    await User.syncIndexes();
    await Topic.syncIndexes();
    await Chapter.syncIndexes();

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

initDatabase().catch(console.error);