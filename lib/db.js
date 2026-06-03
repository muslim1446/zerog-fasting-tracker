// File: lib/db.js
// Purpose: Cloudflare D1 Database Connection Wrapper
export const getDB = (env) => {
  // In Cloudflare Pages, the D1 database is bound to the environment
  // You will need to add `[[d1_databases]]` to your wrangler.toml
  return env.DB; 
};

export const getUserProfile = async (db, username) => {
  const { results } = await db.prepare('SELECT * FROM users WHERE username = ?').bind(username).all();
  return results[0] || null;
};

export const saveUserProfile = async (db, profileData) => {
  // Open access design: upsert the profile based on username
  const query = `
    INSERT INTO users (username, age, weight, height, activityLevel, region, goal)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(username) DO UPDATE SET
    age=excluded.age, weight=excluded.weight, height=excluded.height, 
    activityLevel=excluded.activityLevel, region=excluded.region, goal=excluded.goal
  `;
  await db.prepare(query).bind(
    profileData.username, profileData.age, profileData.weight, 
    profileData.height, profileData.activityLevel, profileData.region, profileData.goal
  ).run();
};
