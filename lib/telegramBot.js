import TelegramBot from 'node-telegram-bot-api';

// Initialize bot - token will be set via environment variable
let bot = null;
const userChats = new Set(); // In production, use a proper database

export const initializeTelegramBot = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.warn('TELEGRAM_BOT_TOKEN not set. Telegram notifications disabled.');
    return null;
  }

  if (!bot) {
    bot = new TelegramBot(token, { polling: true });
    
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      userChats.add(chatId);
      bot.sendMessage(chatId, '👋 Welcome to ZeroG Fasting Notifications!\n\nYou will now receive alerts about your fasting phase changes.');
    });

    bot.onText(/\/stop/, (msg) => {
      const chatId = msg.chat.id;
      userChats.delete(chatId);
      bot.sendMessage(chatId, '🛑 You have unsubscribed from fasting notifications.');
    });

    console.log('Telegram bot initialized');
  }

  return bot;
};

export const sendTelegramNotification = (message) => {
  if (!bot) {
    console.warn('Telegram bot not initialized. Cannot send notification.');
    return false;
  }

  // Send to all subscribed users
  const sent = [];
  for (const chatId of userChats) {
    bot.sendMessage(chatId, message)
      .then(() => sent.push(chatId))
      .catch(err => {
        console.error(`Failed to send Telegram message to ${chatId}:`, err);
      });
  }
  
  return sent.length > 0;
};

export const getSubscriberCount = () => userChats.size;