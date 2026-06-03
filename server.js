require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SUBSCRIBERS_FILE = path.join(__dirname, 'subscribers.json');

app.use(bodyParser.json());

// Load subscribers from file or initialize empty set
let subscriberChats = new Set();
const loadSubscribers = () => {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
      const arr = JSON.parse(data);
      subscriberChats = new Set(arr);
      console.log(`Loaded ${subscriberChats.size} subscribers from file`);
    }
  } catch (err) {
    console.error('Error loading subscribers:', err);
  }
};
const saveSubscribers = () => {
  try {
    const arr = Array.from(subscriberChats);
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(arr, null, 2));
  } catch (err) {
    console.error('Error saving subscribers:', err);
  }
};
loadSubscribers();

// Initialize Telegram bot
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is not set in environment variables');
  process.exit(1);
}
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  subscriberChats.add(chatId);
  saveSubscribers();
  bot.sendMessage(chatId, '👋 Welcome! You are now subscribed to fasting phase notifications.\n\nYou will receive alerts when your fasting phase changes.');
});

bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  subscriberChats.delete(chatId);
  saveSubscribers();
  bot.sendMessage(chatId, '🛑 You have been unsubscribed from fasting notifications.');
});

// Endpoint for website to register a user's Telegram chat ID
app.post('/register', (req, res) => {
  const { chatId } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: 'chatId is required' });
  }
  subscriberChats.add(chatId);
  saveSubscribers();
  res.json({ status: 'ok', message: 'Chat ID registered successfully' });
});

// Endpoint for website to unregister
app.post('/unregister', (req, res) => {
  const { chatId } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: 'chatId is required' });
  }
  subscriberChats.delete(chatId);
  saveSubscribers();
  res.json({ status: 'ok', message: 'Chat ID unregistered successfully' });
});

// Endpoint for website to trigger a notification (e.g., when fasting phase changes)
app.post('/webhook', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  let sentCount = 0;
  for (const chatId of subscriberChats) {
    bot.sendMessage(chatId, message)
      .then(() => sentCount++)
      .catch(err => {
        console.error(`Failed to send message to ${chatId}:`, err.response.body);
      });
  }

  res.json({ status: 'ok', sentCount, totalSubscribers: subscriberChats.size });
});

// Health check
app.get('/', (req, res) => {
  res.send('Fasting notification server is running.');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});