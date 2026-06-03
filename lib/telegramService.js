import { getDB } from './db.js';

// In-memory store for bot instance (will be initialized once)
let botInstance = null;
let dbInstance = null;

/**
 * Initialize the Telegram bot with token from environment
 * @returns {TelegramBot|null} The bot instance or null if token not configured
 */
export const initializeTelegramBot = () => {
  if (botInstance) return botInstance;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.warn('TELEGRAM_BOT_TOKEN not set. Telegram notifications disabled.');
    return null;
  }

  try {
    const TelegramBot = require('node-telegram-bot-api');
    botInstance = new TelegramBot(token, { polling: true });
    
    // Handle /start command - register user
    botInstance.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from.username || `user_${chatId}`;
      
      try {
        const db = getDB(process.env); // In Next.js API routes, we'll pass env
        // Store or update user's Telegram chat ID
        const query = `
          INSERT INTO users (username, telegram_chat_id)
          VALUES (?, ?)
          ON CONFLICT(username) DO UPDATE SET
          telegram_chat_id=excluded.telegram_chat_id
        `;
        await db.prepare(query).bind(username, chatId).run();
        
        botInstance.sendMessage(chatId, 
          '👋 Welcome to ZeroG Fasting Notifications!\n\n' +
          'You are now subscribed to receive alerts about your fasting phase changes.\n\n' +
          'Use /stop to unsubscribe at any time.'
        );
      } catch (error) {
        console.error('Error registering Telegram user:', error);
        botInstance.sendMessage(chatId, 
          'Sorry, there was an error registering you for notifications. Please try again later.'
        );
      }
    });

    // Handle /stop command - unregister user
    botInstance.onText(/\/stop/, async (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from.username || `user_${chatId}`;
      
      try {
        const db = getDB(process.env);
        const query = `
          UPDATE users 
          SET telegram_chat_id = NULL 
          WHERE username = ?
        `;
        await db.prepare(query).bind(username).run();
        
        botInstance.sendMessage(chatId, 
          '🛑 You have been unsubscribed from fasting notifications.\n\n' +
          'Use /start to resubscribe at any time.'
        );
      } catch (error) {
        console.error('Error unregistering Telegram user:', error);
        botInstance.sendMessage(chatId, 
          'Sorry, there was an error processing your request. Please try again later.'
        );
      }
    });

    console.log('Telegram bot initialized successfully');
    return botInstance;
  } catch (error) {
    console.error('Failed to initialize Telegram bot:', error);
    return null;
  }
};

/**
 * Send a Telegram notification to a specific user
 * @param {string|number} chatId - The Telegram chat ID
 * @param {string} message - The message to send
 * @returns {Promise<boolean>} True if sent successfully
 */
export const sendTelegramNotification = async (chatId, message) => {
  if (!botInstance) {
    console.warn('Telegram bot not initialized. Cannot send notification.');
    return false;
  }

  try {
    await botInstance.sendMessage(chatId, message);
    return true;
  } catch (error) {
    console.error(`Failed to send Telegram message to ${chatId}:`, error);
    return false;
  }
};

/**
 * Send a Telegram notification to all subscribed users
 * @param {string} message - The message to send
 * @returns {Promise<number>} Number of successful sends
 */
export const sendTelegramNotificationToAll = async (message) => {
  if (!botInstance) {
    console.warn('Telegram bot not initialized. Cannot send notifications.');
    return 0;
  }

  try {
    const db = getDB(process.env);
    const { results } = await db.prepare(
      'SELECT telegram_chat_id FROM users WHERE telegram_chat_id IS NOT NULL'
    ).all();
    
    let sentCount = 0;
    for (const row of results) {
      if (row.telegram_chat_id) {
        const success = await sendTelegramNotification(row.telegram_chat_id, message);
        if (success) sentCount++;
      }
    }
    
    return sentCount;
  } catch (error) {
    console.error('Error sending Telegram notifications to all users:', error);
    return 0;
  }
};

/**
 * Get the Telegram bot instance (for external access if needed)
 * @returns {TelegramBot|null} The bot instance
 */
export const getTelegramBotInstance = () => botInstance;