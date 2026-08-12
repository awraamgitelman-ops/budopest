// Telegram Bot Token & Client-Side Direct Dispatch Helper
const TELEGRAM_BOT_TOKEN = '8855934222:AAE7urD82jvaYIf8cJddxnesQwuKVRyw4lY';

export const sendTelegramOrderNotification = async (orderData) => {
  const { name, phone, product, quantity, address, comment, details, page, source } = orderData || {};

  const cleanName = name || 'Не вказано';
  const cleanPhone = phone || 'Не вказано';
  const cleanProduct = product || 'Нерудні матеріали';
  const cleanQuantity = quantity || 'Об\'єм не вказано';
  const cleanAddress = address || 'м. Дніпро (уточнюється з диспетчером)';
  const cleanComment = comment ? `\n📝 <b>Коментар:</b> <i>${comment}</i>` : '';
  const cleanSource = source || 'Форма замовлення на сайті';

  const messageText = `🚚 <b>НОВЕ ЗАМОВЛЕННЯ З САЙТУ БЕНГС!</b>\n\n` +
    `👤 <b>Замовник:</b> ${cleanName}\n` +
    `📞 <b>Телефон:</b> <code>${cleanPhone}</code>\n` +
    `📦 <b>Матеріал:</b> ${cleanProduct}\n` +
    `⚖️ <b>Об'єм:</b> ${cleanQuantity}\n` +
    `📍 <b>Адреса доставки:</b> ${cleanAddress}` +
    `${cleanComment}\n\n` +
    `🌐 <b>Джерело:</b> ${cleanSource}\n` +
    `⏰ <b>Час:</b> ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}`;

  // 1. Try sending to backend API /api/send-order
  try {
    const res = await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        console.log('[Telegram] Order successfully processed via backend server');
        return true;
      }
    }
  } catch (err) {
    console.warn('[Telegram] Backend server endpoint /api/send-order unreachable, attempting direct client fallback...', err.message);
  }

  // 2. Client-Side Fallback: Dispatch directly to Telegram Bot API
  try {
    // Get list of known active chat IDs or fallback to stored chat IDs
    let chatIds = [];
    try {
      const stored = localStorage.getItem('bengs_tg_chat_ids');
      if (stored) chatIds = JSON.parse(stored);
    } catch (e) {}

    // First poll updates to discover any recently started chats
    const updatesRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`);
    if (updatesRes.ok) {
      const updatesData = await updatesRes.json();
      if (updatesData.ok && Array.isArray(updatesData.result)) {
        for (const update of updatesData.result) {
          const msg = update.message || update.channel_post;
          const chat = msg && msg.chat;
          if (chat && chat.id) {
            const idStr = String(chat.id);
            if (!chatIds.includes(idStr)) chatIds.push(idStr);
          }
        }
        localStorage.setItem('bengs_tg_chat_ids', JSON.stringify(chatIds));
      }
    }

    if (chatIds.length === 0) {
      console.warn('[Telegram Client] No Telegram chat IDs found. Manager needs to press /start on the bot first.');
      return false;
    }

    let sentCount = 0;
    for (const chatId of chatIds) {
      const sendRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      });

      if (sendRes.ok) sentCount++;
    }

    return sentCount > 0;
  } catch (err) {
    console.error('[Telegram Client Error]:', err);
    return false;
  }
};
