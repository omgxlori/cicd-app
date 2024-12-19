import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path'; // Import path for file resolution

import db from './config/connection.js';
import routes from './routes/index.js';

await db();

const PORT = process.env.PORT || 3001; // Use the environment's PORT or 3001 for local
const app = express();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Correctly resolve the path to client/dist
  const clientBuildPath = path.resolve(__dirname, '../../client/dist');

  // Serve static files from the resolved client/dist directory
  app.use(express.static(clientBuildPath));

  // Serve the index.html file for all other routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🌟 API server running on port ${PORT}!`);
});
