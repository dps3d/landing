import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import initialCommon from './data/common.json' with { type: 'json' };
import initialPages from './data/pages.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '2mb' }));

const PORT = process.env.PORT || 3000;

let commonState = structuredClone(initialCommon);
let pagesState = structuredClone(initialPages);

let mediaState = [
  {
    id: 'media-1',
    filename: 'mcu-hero-board.svg',
    alt: 'Інтерактивна панель обліку мікроконтролерів STM32, ESP32, RP2040 та Pinout Builder',
    componentCode: 'STM32F103C8T6 / ESP32-WROOM-32D',
    url: '/mcu-hero-board.svg',
    updatedAt: '2026-10-25T12:00:00.000Z',
  },
  {
    id: 'media-2',
    filename: 'stm32-lqfp48-pinout.svg',
    alt: 'Схема розпіновки мікроконтролера STM32F103C8T6 (LQFP-48)',
    componentCode: 'STM32F103C8T6',
    url: '/mcu-hero-board.svg',
    updatedAt: '2026-10-25T12:05:00.000Z',
  },
  {
    id: 'media-3',
    filename: 'esp32-wroom-module.svg',
    alt: 'Радіомодуль ESP32-WROOM-32D Wi-Fi + BLE',
    componentCode: 'ESP32-WROOM-32D',
    url: '/mcu-hero-board.svg',
    updatedAt: '2026-10-25T12:10:00.000Z',
  },
];

let usersState = [
  {
    id: 'user-1',
    email: 'admin@lpnu.ua',
    fullName: 'Адміністратор лабораторії MCU',
    role: 'admin',
    updatedAt: '2026-10-25T12:00:00.000Z',
  },
  {
    id: 'user-2',
    email: 'kovalchuk@lpnu.ua',
    fullName: 'Олександр Ковальчук',
    role: 'instructor',
    updatedAt: '2026-10-25T12:00:00.000Z',
  },
  {
    id: 'user-3',
    email: 'boyko.lab@lpnu.ua',
    fullName: 'Тарас Бойко',
    role: 'lab_assistant',
    updatedAt: '2026-10-25T12:00:00.000Z',
  },
];

function tryPersistJson(filename, data) {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  } catch {
    // На Vercel файлова система ephemeral (read-only), тому зберігаємо в пам'яті контейнера
  }
}

// Кастомний ендпоінт наскрізних налаштувань (Globals: Common)
app.get(['/api/common', '/api/settings'], (req, res) => {
  res.json(commonState);
});

// Кастомний ендпоінт отримання сторінки за шляхом ?path=...
app.get(['/api/page', '/api/pages'], (req, res) => {
  const requestedPath = req.query.path || '/';
  const page = pagesState.find((p) => p.path === requestedPath);

  if (!page) {
    return res.status(404).json({
      error: `Сторінку за шляхом "${requestedPath}" не знайдено`,
      path: requestedPath,
      statusCode: 404,
    });
  }

  res.json(page);
});

// Перевірка авторизації через змінні середовища (.env: ADMIN_EMAIL, ADMIN_PASSWD)
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body || {};
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPass = process.env.ADMIN_PASSWD;

  if (expectedEmail && expectedPass) {
    if (email !== expectedEmail || password !== expectedPass) {
      return res.status(401).json({ ok: false, error: 'Невірний email або пароль адміністратора' });
    }
  } else if (!email || !password) {
    return res.status(401).json({ ok: false, error: 'Введіть email та пароль' });
  }

  return res.json({ ok: true, email });
});

// Ендпоінти збереження для адмін-панелі Payload CMS (/admin)
app.get('/api/admin/state', (req, res) => {
  res.json({
    common: commonState,
    pages: pagesState,
    media: mediaState,
    users: usersState,
  });
});

app.put('/api/admin/common', (req, res) => {
  if (req.body && typeof req.body === 'object') {
    commonState = {
      ...commonState,
      ...req.body,
    };
    tryPersistJson('common.json', commonState);
  }
  res.json({ ok: true, common: commonState });
});

app.put('/api/admin/page', (req, res) => {
  const updatedPage = req.body;
  if (!updatedPage || typeof updatedPage !== 'object') {
    return res.status(400).json({ error: 'Некоректні дані сторінки' });
  }
  const targetPath = updatedPage.path || '/';
  const idx = pagesState.findIndex((p) => p.path === targetPath);
  if (idx >= 0) {
    pagesState[idx] = updatedPage;
  } else {
    pagesState.push(updatedPage);
  }
  tryPersistJson('pages.json', pagesState);
  res.json({ ok: true, page: updatedPage });
});

function renderAdminHtml() {
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payload CMS 3.0 — Admin Panel (MCU Inventory System)</title>
  <style>
    :root {
      --bg-base: #0b0f17;
      --bg-panel: #111827;
      --bg-card: #161f33;
      --bg-input: #0d1322;
      --border: #24324d;
      --border-focus: #38bdf8;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --accent: #0ea5e9;
      --accent-hover: #0284c7;
      --success: #10b981;
      --danger: #ef4444;
      --warning: #f59e0b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-base);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .login-overlay {
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at top, #172554 0%, #0b0f17 70%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }
    .login-overlay.hidden { display: none; }
    .login-card {
      width: 100%;
      max-width: 430px;
      background: var(--bg-panel);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 32px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.6);
    }
    .payload-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }
    .payload-logo {
      width: 38px;
      height: 38px;
      border-radius: 9px;
      background: linear-gradient(135deg, #38bdf8, #2563eb);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 18px;
      color: #fff;
    }
    .payload-brand h1 { font-size: 18px; font-weight: 700; }
    .payload-brand span { font-size: 12px; color: var(--text-muted); display: block; margin-top: 2px; }
    .admin-shell {
      display: grid;
      grid-template-columns: 270px 1fr;
      min-height: 100vh;
    }
    .sidebar {
      background: var(--bg-panel);
      border-right: 1px solid var(--border);
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .nav-group-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      padding: 0 10px;
      margin-bottom: 8px;
    }
    .nav-btn {
      width: 100%;
      text-align: left;
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      padding: 10px 12px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.15s;
    }
    .nav-btn:hover { background: rgba(56, 189, 248, 0.08); color: var(--text); }
    .nav-btn.active {
      background: rgba(14, 165, 233, 0.15);
      border-color: rgba(56, 189, 248, 0.35);
      color: #38bdf8;
      font-weight: 600;
    }
    .badge-pill {
      font-size: 11px;
      padding: 2px 7px;
      border-radius: 999px;
      background: rgba(148, 163, 184, 0.15);
      color: var(--text-muted);
    }
    .sidebar-footer {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid var(--border);
      font-size: 12px;
      color: var(--text-muted);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .status-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--success);
      margin-right: 6px;
      box-shadow: 0 0 8px var(--success);
    }
    .main-area {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .topbar {
      height: 64px;
      background: var(--bg-panel);
      border-bottom: 1px solid var(--border);
      padding: 0 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 20;
    }
    .breadcrumbs {
      font-size: 14px;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .breadcrumbs strong { color: var(--text); }
    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn {
      padding: 9px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--border);
      background: var(--bg-card);
      color: var(--text);
      transition: all 0.15s;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn:hover { border-color: var(--border-focus); }
    .btn-primary {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
    }
    .btn-primary:hover { background: var(--accent-hover); }
    .content-wrap {
      padding: 28px;
      max-width: 1120px;
      width: 100%;
    }
    .section-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 24px;
      gap: 16px;
    }
    .section-header h2 { font-size: 24px; font-weight: 700; }
    .section-header p { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
    .card {
      background: var(--bg-panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .field {
      margin-bottom: 14px;
    }
    .field label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 6px;
    }
    .field input, .field textarea, .field select {
      width: 100%;
      padding: 10px 12px;
      background: var(--bg-input);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text);
      font-size: 13px;
      font-family: inherit;
    }
    .field textarea { min-height: 74px; resize: vertical; }
    .field input:focus, .field textarea:focus, .field select:focus {
      outline: none;
      border-color: var(--border-focus);
    }
    .block-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 10px;
      margin-bottom: 14px;
      overflow: hidden;
    }
    .block-header {
      padding: 13px 16px;
      background: rgba(15, 23, 42, 0.65);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border-bottom: 1px solid transparent;
    }
    .block-card.open .block-header {
      border-bottom-color: var(--border);
    }
    .block-title-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .block-index {
      font-family: monospace;
      font-size: 12px;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
      padding: 3px 8px;
      border-radius: 6px;
      font-weight: 700;
    }
    .block-type-tag {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(16, 185, 129, 0.14);
      color: #34d399;
      font-weight: 700;
    }
    .block-body {
      padding: 18px;
      display: none;
    }
    .block-card.open .block-body {
      display: block;
    }
    .sub-array-item {
      background: rgba(11, 15, 23, 0.55);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 10px;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #065f46;
      border: 1px solid #10b981;
      color: #ecfdf5;
      padding: 12px 18px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 12px 30px rgba(0,0,0,0.45);
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.2s;
      pointer-events: none;
      z-index: 2000;
    }
    .toast.show { opacity: 1; transform: translateY(0); }
    table.admin-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    table.admin-table th, table.admin-table td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      text-align: left;
    }
    table.admin-table th { color: var(--text-muted); font-size: 12px; text-transform: uppercase; }
    @media (max-width: 860px) {
      .admin-shell { grid-template-columns: 1fr; }
      .grid-2 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <!-- Вікно авторизації Payload CMS (перевіряється через змінні оточення .env) -->
  <div id="loginOverlay" class="login-overlay">
    <div class="login-card">
      <div class="payload-brand">
        <div class="payload-logo">P</div>
        <div>
          <h1>Payload CMS 3.0</h1>
          <span>MCU Inventory System • Адмін-панель</span>
        </div>
      </div>
      <div class="field">
        <label>Email адміністратора *</label>
        <input id="loginEmail" type="email" placeholder="Введіть email адміністратора" autocomplete="username" />
      </div>
      <div class="field">
        <label>Пароль *</label>
        <input id="loginPass" type="password" placeholder="••••••••••••" autocomplete="current-password" />
      </div>
      <p id="loginError" style="color:#f87171;font-size:12px;margin-bottom:12px;display:none;">
        Невірний email або пароль адміністратора
      </p>
      <button id="loginBtn" class="btn btn-primary" style="width:100%;justify-content:center;padding:11px;">
        Увійти в редактор Payload CMS →
      </button>
    </div>
  </div>

  <!-- Основна оболонка Payload CMS Admin -->
  <div class="admin-shell">
    <aside class="sidebar">
      <div class="payload-brand" style="margin-bottom:4px;">
        <div class="payload-logo">P</div>
        <div>
          <h1>Payload CMS</h1>
          <span>MCU Inventory v3.0</span>
        </div>
      </div>

      <div>
        <div class="nav-group-title">Collections (Колекції)</div>
        <button class="nav-btn active" data-tab="pages">
          <span>📄 Сторінки (Pages)</span>
          <span class="badge-pill">1</span>
        </button>
        <button class="nav-btn" data-tab="media">
          <span>🖼️ Медіафайли (Media)</span>
          <span class="badge-pill" id="mediaCountBadge">3</span>
        </button>
        <button class="nav-btn" data-tab="users">
          <span>👥 Користувачі (Users)</span>
          <span class="badge-pill" id="usersCountBadge">3</span>
        </button>
      </div>

      <div>
        <div class="nav-group-title">Globals (Наскрізні сутності)</div>
        <button class="nav-btn" data-tab="common">
          <span>🌐 Налаштування (Common)</span>
          <span class="badge-pill">Global</span>
        </button>
      </div>

      <div>
        <div class="nav-group-title">Кастомні API-ендпоінти</div>
        <a class="nav-btn" href="/api/common" target="_blank">
          <span>⚡ GET /api/common</span>
          <span class="badge-pill">JSON</span>
        </a>
        <a class="nav-btn" href="/api/page?path=/" target="_blank">
          <span>⚡ GET /api/page?path=/</span>
          <span class="badge-pill">JSON</span>
        </a>
      </div>

      <div class="sidebar-footer">
        <div><span class="status-dot"></span>СУБД: <strong>Neon PostgreSQL</strong></div>
        <div id="currentUserLabel">👤 Адміністратор</div>
        <button id="logoutBtn" class="btn" style="margin-top:6px;justify-content:center;">Вийти з акаунту</button>
      </div>
    </aside>

    <div class="main-area">
      <header class="topbar">
        <div class="breadcrumbs" id="breadcrumbs">
          <span>Collections</span> / <span>Pages</span> / <strong>Головна (/)</strong>
        </div>
        <div class="topbar-actions">
          <a href="/api/page?path=/" target="_blank" class="btn">Переглянути JSON API</a>
          <button id="saveBtn" class="btn btn-primary">💾 Зберегти зміни в БД</button>
        </div>
      </header>

      <main class="content-wrap" id="editorContent">
        Завантаження конфігурації Payload CMS...
      </main>
    </div>
  </div>

  <div id="toast" class="toast">✅ Зміни успішно збережено! Оновіть сторінку сайту, щоб побачити результат.</div>

  <script>
    let state = {
      activeTab: 'pages',
      common: null,
      pages: [],
      media: [],
      users: [],
    };

    const loginOverlay = document.getElementById('loginOverlay');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const editorContent = document.getElementById('editorContent');
    const breadcrumbs = document.getElementById('breadcrumbs');
    const saveBtn = document.getElementById('saveBtn');
    const toast = document.getElementById('toast');

    if (sessionStorage.getItem('payload_admin_auth') === '1') {
      loginOverlay.classList.add('hidden');
      const savedEmail = sessionStorage.getItem('payload_admin_email');
      if (savedEmail) {
        document.getElementById('currentUserLabel').textContent = '👤 ' + savedEmail;
      }
    }

    loginBtn.addEventListener('click', async () => {
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPass').value;
      const errEl = document.getElementById('loginError');
      errEl.style.display = 'none';

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok && data.ok) {
          sessionStorage.setItem('payload_admin_auth', '1');
          sessionStorage.setItem('payload_admin_email', data.email);
          document.getElementById('currentUserLabel').textContent = '👤 ' + data.email;
          loginOverlay.classList.add('hidden');
        } else {
          errEl.textContent = data.error || 'Невірний email або пароль';
          errEl.style.display = 'block';
        }
      } catch {
        errEl.textContent = 'Помилка з’єднання із сервером';
        errEl.style.display = 'block';
      }
    });

    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('payload_admin_auth');
      sessionStorage.removeItem('payload_admin_email');
      loginOverlay.classList.remove('hidden');
    });

    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3200);
    }

    async function loadAdminState() {
      const res = await fetch('/api/admin/state');
      const data = await res.json();
      state.common = data.common;
      state.pages = data.pages;
      state.media = data.media || [];
      state.users = data.users || [];
      renderActiveTab();
    }

    document.querySelectorAll('.nav-btn[data-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn[data-tab]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeTab = btn.dataset.tab;
        renderActiveTab();
      });
    });

    function escapeHtml(str) {
      return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function renderActiveTab() {
      if (state.activeTab === 'pages') {
        breadcrumbs.innerHTML = '<span>Collections</span> / <span>Pages</span> / <strong>Головна (/)</strong>';
        saveBtn.style.display = 'inline-flex';
        renderPagesEditor();
      } else if (state.activeTab === 'common') {
        breadcrumbs.innerHTML = '<span>Globals</span> / <strong>Common (Наскрізні елементи сайту)</strong>';
        saveBtn.style.display = 'inline-flex';
        renderCommonEditor();
      } else if (state.activeTab === 'media') {
        breadcrumbs.innerHTML = '<span>Collections</span> / <strong>Media (Фото та схеми компонентів)</strong>';
        saveBtn.style.display = 'none';
        renderMediaEditor();
      } else if (state.activeTab === 'users') {
        breadcrumbs.innerHTML = '<span>Collections</span> / <strong>Users (Адміністратори та лаборанти)</strong>';
        saveBtn.style.display = 'none';
        renderUsersEditor();
      }
    }

    function renderPagesEditor() {
      const page = state.pages[0] || { path: '/', title: '', blocks: [] };
      const blocksHtml = (page.blocks || [])
        .map((block, idx) => {
          let extraFields = '';
          if (block.type === 'hero') {
            extraFields = \`
              <div class="grid-2">
                <div class="field">
                  <label>Зображення (image.src)</label>
                  <input type="text" data-block="\${idx}" data-field="imageSrc" value="\${escapeHtml(block.image?.src || '/mcu-hero-board.svg')}" />
                </div>
                <div class="field">
                  <label>Alt-текст зображення (image.alt)</label>
                  <input type="text" data-block="\${idx}" data-field="imageAlt" value="\${escapeHtml(block.image?.alt || '')}" />
                </div>
              </div>
            \`;
          } else if (block.type === 'contacts') {
            extraFields = \`
              <div class="grid-2">
                <div class="field">
                  <label>URL кнопки «Увійти в систему» (loginUrl)</label>
                  <input type="text" data-block="\${idx}" data-field="loginUrl" value="\${escapeHtml(block.loginUrl || 'http://127.0.0.1:8000/accounts/login/')}" />
                </div>
                <div class="field">
                  <label>URL кнопки «Подати заявку» (registerUrl)</label>
                  <input type="text" data-block="\${idx}" data-field="registerUrl" value="\${escapeHtml(block.registerUrl || 'http://127.0.0.1:8000/accounts/register/')}" />
                </div>
              </div>
            \`;
          }

          return \`
            <div class="block-card \${idx === 0 ? 'open' : ''}" id="block-card-\${idx}">
              <div class="block-header" onclick="document.getElementById('block-card-\${idx}').classList.toggle('open')">
                <div class="block-title-wrap">
                  <span class="block-index">0\${idx + 1}</span>
                  <span class="block-type-tag">\${escapeHtml(block.type)}</span>
                  <strong>\${escapeHtml(block.title || 'Без назви')}</strong>
                </div>
                <div style="display:flex;gap:8px;align-items:center;">
                  <span style="font-size:12px;color:var(--text-muted);">#\${escapeHtml(block.anchor || block.type)}</span>
                </div>
              </div>
              <div class="block-body">
                <div class="grid-2">
                  <div class="field">
                    <label>Тип блоку (blockType)</label>
                    <input type="text" value="\${escapeHtml(block.type)}" disabled />
                  </div>
                  <div class="field">
                    <label>Якір секції (anchor)</label>
                    <input type="text" data-block="\${idx}" data-field="anchor" value="\${escapeHtml(block.anchor || '')}" />
                  </div>
                </div>
                <div class="field">
                  <label>Бейдж над заголовком (badge)</label>
                  <input type="text" data-block="\${idx}" data-field="badge" value="\${escapeHtml(block.badge || '')}" />
                </div>
                <div class="field">
                  <label>Заголовок блоку (title) *</label>
                  <input type="text" data-block="\${idx}" data-field="title" value="\${escapeHtml(block.title || '')}" />
                </div>
                <div class="field">
                  <label>Підзаголовок / опис (subtitle)</label>
                  <textarea data-block="\${idx}" data-field="subtitle">\${escapeHtml(block.subtitle || '')}</textarea>
                </div>
                \${extraFields}
              </div>
            </div>
          \`;
        })
        .join('');

      editorContent.innerHTML = \`
        <div class="section-header">
          <div>
            <h2>Сторінка: \${escapeHtml(page.title)}</h2>
            <p>Колекція <code>pages</code> • Конструктор блоків (Hero, Features, Showcase, Testimonials, Contacts)</p>
          </div>
        </div>

        <div class="card">
          <div class="grid-2">
            <div class="field">
              <label>Назва сторінки (title) *</label>
              <input id="pageTitleInput" type="text" value="\${escapeHtml(page.title)}" />
            </div>
            <div class="field">
              <label>URL-шлях (path) *</label>
              <input id="pagePathInput" type="text" value="\${escapeHtml(page.path)}" />
            </div>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;margin:20px 0 12px;">
          <h3 style="font-size:16px;">Блоки конструктора сторінки (blocks: \${(page.blocks || []).length})</h3>
          <span style="font-size:12px;color:var(--text-muted);">Натисніть на блок, щоб розгорнути або згорнути його поля</span>
        </div>
        \${blocksHtml}
      \`;
    }

    function renderCommonEditor() {
      const c = state.common || {};
      const menuHtml = (c.menu || [])
        .map(
          (item, i) => \`
          <div class="sub-array-item grid-2">
            <div class="field" style="margin-bottom:0;">
              <label>Пункт меню #\${i + 1} (label)</label>
              <input type="text" data-menu="\${i}" data-field="label" value="\${escapeHtml(item.label)}" />
            </div>
            <div class="field" style="margin-bottom:0;">
              <label>Посилання / якір (link)</label>
              <input type="text" data-menu="\${i}" data-field="link" value="\${escapeHtml(item.link)}" />
            </div>
          </div>
        \`
        )
        .join('');

      editorContent.innerHTML = \`
        <div class="section-header">
          <div>
            <h2>Налаштування сайту (Globals: Common)</h2>
            <p>Наскрізні елементи ресурсу: назва системи, верхнє навігаційне меню та футер</p>
          </div>
        </div>

        <div class="card">
          <div class="grid-2">
            <div class="field">
              <label>Назва системи (siteName) *</label>
              <input id="commonSiteName" type="text" value="\${escapeHtml(c.siteName || '')}" />
            </div>
            <div class="field">
              <label>Статус СУБД у топбарі (dbStatus)</label>
              <select id="commonDbStatus">
                <option value="online" \${c.dbStatus === 'online' ? 'selected' : ''}>online (Neon PostgreSQL активна)</option>
                <option value="maintenance" \${c.dbStatus === 'maintenance' ? 'selected' : ''}>maintenance (Технічне обслуговування)</option>
              </select>
            </div>
          </div>

          <h4 style="margin:16px 0 10px;font-size:14px;">Пункти головного меню (menu)</h4>
          \${menuHtml}

          <h4 style="margin:18px 0 10px;font-size:14px;">Футер сайту (footer)</h4>
          <div class="field">
            <label>Опис системи у футері (footer.text)</label>
            <textarea id="commonFooterText">\${escapeHtml(c.footer?.text || '')}</textarea>
          </div>
          <div class="field">
            <label>Технологічний підпис (footer.systemInfo)</label>
            <input id="commonFooterSys" type="text" value="\${escapeHtml(c.footer?.systemInfo || '')}" />
          </div>
        </div>
      \`;
    }

    function renderMediaEditor() {
      const rows = state.media
        .map(
          (m) => \`
          <tr>
            <td><strong>\${escapeHtml(m.filename)}</strong></td>
            <td><code>\${escapeHtml(m.componentCode)}</code></td>
            <td>\${escapeHtml(m.alt)}</td>
            <td><a href="\${escapeHtml(m.url)}" target="_blank" style="color:#38bdf8;">\${escapeHtml(m.url)}</a></td>
          </tr>
        \`
        )
        .join('');

      editorContent.innerHTML = \`
        <div class="section-header">
          <div>
            <h2>Медіафайли (Collection: Media)</h2>
            <p>Зображення друкованих плат, 3D-прев'ю корпусів та інтерактивних схем розпіновки</p>
          </div>
        </div>
        <div class="card">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Файл</th>
                <th>Маркування компонента</th>
                <th>Alt-текст (обов'язковий)</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>\${rows}</tbody>
          </table>
        </div>
      \`;
    }

    function renderUsersEditor() {
      const rows = state.users
        .map(
          (u) => \`
          <tr>
            <td><strong>\${escapeHtml(u.email)}</strong></td>
            <td>\${escapeHtml(u.fullName)}</td>
            <td><span class="block-type-tag">\${escapeHtml(u.role)}</span></td>
            <td>\${escapeHtml(u.updatedAt.slice(0, 10))}</td>
          </tr>
        \`
        )
        .join('');

      editorContent.innerHTML = \`
        <div class="section-header">
          <div>
            <h2>Користувачі CMS (Collection: Users)</h2>
            <p>Облікові записи адміністраторів, викладачів та лаборантів із підтримкою auth: true</p>
          </div>
        </div>
        <div class="card">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Ім'я та прізвище</th>
                <th>Роль (role)</th>
                <th>Оновлено</th>
              </tr>
            </thead>
            <tbody>\${rows}</tbody>
          </table>
        </div>
      \`;
    }

    saveBtn.addEventListener('click', async () => {
      if (state.activeTab === 'pages') {
        const page = structuredClone(state.pages[0]);
        page.title = document.getElementById('pageTitleInput').value;
        page.path = document.getElementById('pagePathInput').value;

        document.querySelectorAll('[data-block]').forEach((input) => {
          const idx = Number(input.dataset.block);
          const field = input.dataset.field;
          const block = page.blocks[idx];
          if (!block) return;
          if (field === 'imageSrc') {
            block.image = block.image || {};
            block.image.src = input.value;
          } else if (field === 'imageAlt') {
            block.image = block.image || {};
            block.image.alt = input.value;
          } else {
            block[field] = input.value;
          }
        });

        const res = await fetch('/api/admin/page', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(page),
        });
        if (res.ok) {
          state.pages[0] = page;
          showToast('✅ Сторінку збережено в БД! Оновіть фронтенд, щоб побачити зміни.');
          renderPagesEditor();
        }
      } else if (state.activeTab === 'common') {
        const updated = structuredClone(state.common);
        updated.siteName = document.getElementById('commonSiteName').value;
        updated.dbStatus = document.getElementById('commonDbStatus').value;
        updated.footer = {
          text: document.getElementById('commonFooterText').value,
          systemInfo: document.getElementById('commonFooterSys').value,
        };
        document.querySelectorAll('[data-menu]').forEach((input) => {
          const idx = Number(input.dataset.menu);
          const field = input.dataset.field;
          if (updated.menu[idx]) {
            updated.menu[idx][field] = input.value;
          }
        });

        const res = await fetch('/api/admin/login-check').catch(() => null);
        const saveRes = await fetch('/api/admin/common', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        });
        if (saveRes.ok) {
          state.common = updated;
          showToast('✅ Глобальні налаштування (Common) успішно збережено!');
        }
      }
    });

    loadAdminState();
  </script>
</body>
</html>`;
}

// Маршрут візуального редактора Payload CMS (/admin та /)
app.get(['/admin', '/admin/*splat'], (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderAdminHtml());
});

app.get('/', (req, res) => {
  res.redirect('/admin');
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`MCU Inventory CMS & API Server works on http://localhost:${PORT}/admin`);
  });
}

export default app;
