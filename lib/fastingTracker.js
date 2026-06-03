import { getDB } from './db.js';
import { sendTelegramNotification, getTelegramBotInstance } from './telegramService.js';
import { getFastingPhase } from '@/utils/algorithm.js';

/**
 * Check a user's fasting phase and send notification if changed
 * @param {string} username - The username of the user to check
 * @returns {Promise<Object>} Result object with status and details
 */
export const checkUserFastingPhase = async (username) => {
  try {
    const db = getDB(process.env);
    
    // Get user profile including fasting tracking fields
    const { results } = await db.prepare(
      `SELECT id, username, fasting_start_time, last_notified_phase, 
              weight, height, age, sex, activityLevel
       FROM users 
       WHERE username = ?`
    ).bind(username).all();
    
    if (results.length === 0) {
      return { success: false, error: 'User not found' };
    }
    
    const user = results[0];
    
    // If not currently fasting, nothing to check
    if (!user.fasting_start_time) {
      return { success: true, message: 'User is not currently fasting' };
    }
    
    // Calculate hours fasted
    const startTime = new Date(user.fasting_start_time);
    const now = new Date();
    const hoursFasted = (now - startTime) / (1000 * 60 * 60);
    
    // Get current fasting phase
    const currentPhase = getFastingPhase(hoursFasted, user.activityLevel || 'sedentary');
    const currentPhaseId = currentPhase.id;
    
    // Check if phase has changed since last notification
    if (user.last_notified_phase === currentPhaseId) {
      return { success: true, message: 'Phase unchanged', phase: currentPhaseId };
    }
    
    // Prepare notification message
    let message = `🔄 Your fasting phase has changed!\n\n`;
    message += `Current phase: ${currentPhase.title}\n`;
    message += `${currentPhase.description}\n\n`;
    message += `⏱️ Hours fasted: ${hoursFasted.toFixed(1)}`;
    
    // Send Telegram notification if user has a chat ID
    // We need to get the user's telegram_chat_id from the database
    // For simplicity, we'll assume we have a way to get it - in a real app,
    // we would join with the users table or have a separate telegram_users table
    
    // Since we added telegram_chat_id to users table in our telegramService,
    // we can retrieve it here
    const { results: chatResults } = await db.prepare(
      `SELECT telegram_chat_id FROM users WHERE username = ?`
    ).bind(username).all();
    
    if (chatResults.length > 0 && chatResults[0].telegram_chat_id) {
      const chatId = chatResults[0].telegram_chat_id;
      const sent = await sendTelegramNotification(chatId, message);
      
      if (sent) {
        // Update last_notified_phase in database
        await db.prepare(
          `UPDATE users SET last_notified_phase = ? WHERE username = ?`
        ).bind(currentPhaseId, username).run();
        
        return { 
          success: true, 
          message: 'Notification sent and phase updated', 
          phase: currentPhaseId,
          hoursFasted: hoursFasted.toFixed(1)
        };
      } else {
        return { 
          success: false, 
          error: 'Failed to send Telegram notification', 
          phase: currentPhaseId 
        };
      }
    } else {
      // User hasn't linked Telegram yet
      return { 
        success: false, 
        error: 'User has not linked Telegram account', 
        phase: currentPhaseId 
      };
    }
  } catch (error) {
    console.error(`Error checking fasting phase for ${username}:`, error);
    return { success: false, error: 'Internal error' };
  }
};

/**
 * Check fasting phase for all users who are currently fasting
 * @returns {Promise<Object>>} Summary of checks
 */
export const checkAllFastingUsers = async () => {
  try {
    const db = getDB(process.env);
    
    // Get all users who are currently fasting (have a fasting_start_time)
    const { results } = await db.prepare(
      `SELECT username FROM users WHERE fasting_start_time IS NOT NULL`
    ).all();
    
    const resultsPromises = results.map(row => 
      checkUserFastingPhase(row.username)
    );
    
    const resultsArray = await Promise.all(resultsPromises);
    
    const summary = {
      totalChecked: results.length,
      notificationsSent: resultsArray.filter(r => r.success && r.message.includes('Notification sent')).length,
      errors: resultsArray.filter(r => !r.success).length,
      details: resultsArray
    };
    
    return summary;
  } catch (error) {
    console.error('Error checking all fasting users:', error);
    return { success: false, error: 'Internal error' };
  }
};

export default { checkUserFastingPhase, checkAllFastingUsers };