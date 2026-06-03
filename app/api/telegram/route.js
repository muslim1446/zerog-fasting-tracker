import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    // This endpoint is called by Telegram when we set up a webhook
    // The body contains the update from Telegram
    const { message } = body;
    if (!message) {
      return NextResponse.json({ ok: false, error: 'No message' }, { status: 400 });
    }

    const { chat, from } = message;
    const chatId = chat.id;
    const username = from.username || `user_${chatId}`;
    const text = message.text || '';

    const db = getDB(process.env); // In Next.js API route, we can pass process.env as env

    if (text === '/start') {
      // Register the user's Telegram chat ID
      await db.prepare(
        `INSERT INTO users (username, telegram_chat_id) 
         VALUES (?, ?) 
         ON CONFLICT(username) DO UPDATE SET telegram_chat_id=excluded.telegram_chat_id`
      ).bind(username, chatId).run();

      // Send a welcome message
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: '👋 Welcome to ZeroG Fasting Notifications!\n\nYou are now subscribed to receive alerts about your fasting phase changes.\n\nUse /stop to unsubscribe at any time.',
        }),
      });

      return NextResponse.json({ ok: true });
    } else if (text === '/stop') {
      // Unregister the user
      await db.prepare(
        `UPDATE users SET telegram_chat_id = NULL WHERE username = ?`
      ).bind(username).run();

      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: '🛑 You have been unsubscribed from fasting notifications.\n\nUse /start to resubscribe at any time.',
        }),
      });

      return NextResponse.json({ ok: true });
    }

    // For any other message, we can ignore or send a help message
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error in Telegram webhook:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}