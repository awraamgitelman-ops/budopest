import express from 'express';
import path from 'path';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Express JSON Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security & Header Masking: Hide Express / Node / Host fingerprints
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('Server', 'nginx');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.removeHeader('X-Powered-By');
  next();
});

// ==========================================
// TELEGRAM BOT INTEGRATION & ENGINE
// ==========================================
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8986924734:AAE5TIbbb7BFEgWfyaHFov2aoKDA52UIBo8';
const CONFIG_FILE = path.join(__dirname, 'telegram_config.json');

// Load or Initialize Telegram Config
let telegramConfig = {
  chatIds: [],
  lastUpdateId: 0,
  ordersCount: 0
};

function loadTelegramConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf8');
      telegramConfig = { ...telegramConfig, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('[Telegram] Config load error:', err.message);
  }

  // Include env chat ID if specified
  if (process.env.TELEGRAM_CHAT_ID) {
    const envChatId = String(process.env.TELEGRAM_CHAT_ID).trim();
    if (envChatId && !telegramConfig.chatIds.includes(envChatId)) {
      telegramConfig.chatIds.push(envChatId);
    }
  }
}

function saveTelegramConfig() {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(telegramConfig, null, 2), 'utf8');
  } catch (err) {
    console.error('[Telegram] Config save error:', err.message);
  }
}

loadTelegramConfig();

// Helper: Make Telegram API Request
function callTelegramApi(method, payload = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${TELEGRAM_BOT_TOKEN}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          reject(new Error(`Failed to parse Telegram response: ${body}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Telegram API request timeout'));
    });

    req.write(data);
    req.end();
  });
}

// Helper: Send Message to all connected chats
async function sendTelegramMessage(htmlText) {
  // If no chat IDs are saved, check getUpdates first to capture any recently added groups
  if (!telegramConfig.chatIds || telegramConfig.chatIds.length === 0) {
    await pollTelegramUpdates();
  }

  if (!telegramConfig.chatIds || telegramConfig.chatIds.length === 0) {
    console.warn('[Telegram] No chat IDs configured. Please add bot to a group or send /start in Telegram.');
    return { success: false, reason: 'No active chat IDs configured' };
  }

  const results = [];
  for (const chatId of telegramConfig.chatIds) {
    try {
      const res = await callTelegramApi('sendMessage', {
        chat_id: chatId,
        text: htmlText,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      });

      if (res.ok) {
        results.push({ chatId, ok: true });
      } else {
        console.error(`[Telegram] Error sending to chat ${chatId}:`, res.description);
        results.push({ chatId, ok: false, error: res.description });
      }
    } catch (err) {
      console.error(`[Telegram] Exception sending to chat ${chatId}:`, err.message);
      results.push({ chatId, ok: false, error: err.message });
    }
  }

  telegramConfig.ordersCount += 1;
  saveTelegramConfig();

  return { success: true, results };
}

// Helper: Poll updates to auto-discover groups where bot was added as admin or received /start
async function pollTelegramUpdates() {
  try {
    const res = await callTelegramApi('getUpdates', {
      offset: telegramConfig.lastUpdateId + 1,
      timeout: 0,
      allowed_updates: ['message', 'my_chat_member', 'channel_post']
    });

    if (!res.ok || !Array.isArray(res.result)) {
      return;
    }

    let hasNewChats = false;

    for (const update of res.result) {
      if (update.update_id > telegramConfig.lastUpdateId) {
        telegramConfig.lastUpdateId = update.update_id;
      }

      // Extract chat object from update
      const msg = update.message || update.channel_post;
      const myMember = update.my_chat_member;
      const chat = (msg && msg.chat) || (myMember && myMember.chat);

      if (chat && chat.id) {
        const chatIdStr = String(chat.id);
        if (!telegramConfig.chatIds.includes(chatIdStr)) {
          telegramConfig.chatIds.push(chatIdStr);
          hasNewChats = true;

          console.log(`[Telegram] New chat discovered! Title: "${chat.title || chat.username || 'Private'}" (ID: ${chatIdStr})`);

          // Send welcome/activation message
          callTelegramApi('sendMessage', {
            chat_id: chatIdStr,
            text: `✅ <b>Бот БЕНГС успішно підключено!</b>\n\nЧат <code>${chatIdStr}</code> (<b>${chat.title || chat.username || 'Приватний чат'}</b>) активовано для прийому заявок з порталу. Усі нові замовлення будуть автоматично надходити сюди.`,
            parse_mode: 'HTML'
          }).catch(() => {});
        }
      }
    }

    if (hasNewChats) {
      saveTelegramConfig();
    }
  } catch (err) {
    // Ignore conflict or polling errors silently
  }
}

// Poll Telegram updates periodically every 12 seconds
setInterval(pollTelegramUpdates, 12000);
pollTelegramUpdates();

// Helper to escape HTML tags
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// API Endpoint: Submit New Order
app.post('/api/send-order', async (req, res) => {
  try {
    const { name, phone, product, quantity, unit, price, address, comment, details, page, source } = req.body || {};

    if (!name && !phone) {
      return res.status(400).json({ error: 'Имя или телефон обязательны' });
    }

    const kyivTimeStr = new Date().toLocaleString('uk-UA', {
      timeZone: 'Europe/Kyiv',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    let detailsFormatted = '';
    if (details && typeof details === 'object') {
      const parts = [];
      if (details.fraction) parts.push(`<b>Фракція:</b> ${escapeHtml(details.fraction)}`);
      if (details.zone) parts.push(`<b>Зона доставки:</b> ${escapeHtml(details.zone)}`);
      if (details.truck) parts.push(`<b>Автотранспорт:</b> ${escapeHtml(details.truck)}`);
      if (details.materialTotal) parts.push(`<b>Вартість матеріалу:</b> ${escapeHtml(details.materialTotal)}`);
      if (details.deliveryTotal) parts.push(`<b>Вартість доставки:</b> ${escapeHtml(details.deliveryTotal)}`);
      if (details.grandTotal) parts.push(`<b>ЗАГАЛЬНА СУМА:</b> <u>${escapeHtml(details.grandTotal)}</u>`);

      if (parts.length > 0) {
        detailsFormatted = `\n🧮 <b>Деталі розрахунку:</b>\n${parts.join('\n')}\n`;
      }
    }

    const htmlText = `🚨 <b>НОВА ЗАЯВКА З САЙТУ БЕНГС!</b>\n
👤 <b>Клієнт:</b> ${escapeHtml(name || 'Не вказано')}
📞 <b>Телефон:</b> <code>${escapeHtml(phone || 'Не вказано')}</code>
🏗️ <b>Матеріал:</b> ${escapeHtml(product || 'Запит ціни/консультації')}
📦 <b>Обсяг:</b> ${escapeHtml(quantity ? `${quantity} ${unit || ''}` : (req.body.volume || 'Не вказано'))}
📍 <b>Адреса доставки:</b> ${escapeHtml(address || 'м. Дніпро (уточнюється)')}
💬 <b>Коментар:</b> ${escapeHtml(comment || 'Без коментаря')}
${detailsFormatted}
🌐 <b>Джерело:</b> ${escapeHtml(source || page || 'Головна сторінка')}
⏰ <b>Час заявки:</b> ${kyivTimeStr}`;

    const sendResult = await sendTelegramMessage(htmlText);

    return res.json({
      success: true,
      message: 'Заявка прийнята та відправлена в Telegram',
      telegram: sendResult
    });
  } catch (err) {
    console.error('[API /api/send-order] Error:', err);
    return res.status(500).json({ error: 'Помилка відправки заявки', details: err.message });
  }
});

// API Endpoint: Check Telegram Status
app.get('/api/telegram-status', (req, res) => {
  res.json({
    active: true,
    botToken: TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...` : 'Not Set',
    chatIds: telegramConfig.chatIds,
    chatCount: telegramConfig.chatIds.length,
    ordersCount: telegramConfig.ordersCount,
    lastUpdateId: telegramConfig.lastUpdateId
  });
});

// API Endpoint: Send Test Message
app.post('/api/telegram-test', async (req, res) => {
  const testMsg = `🔔 <b>ТЕСТОВЕ ПОВІДОМЛЕННЯ ВІД БОТА БЕНГС</b>\n\nСистема сповіщень сайту працює справно.\nЧас: ${new Date().toLocaleTimeString('uk-UA')}`;
  const result = await sendTelegramMessage(testMsg);
  res.json(result);
});

// Webhook endpoint (optional if Telegram webhook is enabled)
app.post('/api/telegram-webhook', (req, res) => {
  res.send('OK');
});

// ==========================================
// IMAGE PROXY & STATIC ASSETS
// ==========================================
app.get('/api/img-proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).send('Missing url parameter');
  }

  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    return res.status(400).send('Invalid url format');
  }

  const client = targetUrl.startsWith('https') ? https : http;

  const proxyReq = client.get(targetUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
    }
  }, (proxyRes) => {
    if (proxyRes.statusCode !== 200) {
      return res.status(proxyRes.statusCode || 500).send('Error fetching remote asset');
    }

    const contentType = proxyRes.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    res.setHeader('Server', 'nginx');

    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Image proxy stream error:', err.message);
    res.status(500).send('Proxy failure');
  });
});

// Serve static compiled assets
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '7d',
  setHeaders: (res) => {
    res.setHeader('Server', 'nginx');
  }
}));

// SPA Catch-all routing
app.get('*', (req, res) => {
  res.setHeader('Server', 'nginx');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Corporate portal server listening on port ${PORT}`);
  console.log(`Telegram Bot integration active (Token: ${TELEGRAM_BOT_TOKEN.substring(0, 10)}...)`);
});
