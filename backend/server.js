import express from 'express';
import cors from 'cors';

import common from './data/common.json' with { type: 'json' };
import pages from './data/pages.json' with { type: 'json' };

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
  })
);

const PORT = process.env.PORT || 3000;

// Кастомний ендпоінт наскрізних налаштувань (Globals: Common)
app.get(['/api/common', '/api/settings'], (req, res) => {
  res.json(common);
});

// Кастомний ендпоінт отримання сторінки за шляхом ?path=...
app.get(['/api/page', '/api/pages'], (req, res) => {
  const requestedPath = req.query.path || '/';
  const page = pages.find((p) => p.path === requestedPath);

  if (!page) {
    return res.status(404).json({
      error: `Сторінку за шляхом "${requestedPath}" не знайдено`,
      path: requestedPath,
      statusCode: 404,
    });
  }

  res.json(page);
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`MCU Inventory API Server works on http://localhost:${PORT}`);
  });
}

export default app;

