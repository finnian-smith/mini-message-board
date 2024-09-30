import { pool } from "./pool.js";

const db = {
  async getAllMessages() {
    try {
      const { rows } = await pool.query("SELECT * FROM messages");
      return rows;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw new Error("Could not fetch messages");
    }
  },

  async insertNewMessage(text, username) {
    try {
      await pool.query(
        "INSERT INTO messages (text, username, date) VALUES ($1, $2, CURRENT_DATE)",
        [text, username]
      );
    } catch (error) {
      console.error("Error inserting new message:", error);
      throw new Error("Could not insert new message");
    }
  },

  async getMessageById(id) {
    try {
      const result = await pool.query("SELECT * FROM messages WHERE id = $1", [
        id,
      ]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error("Error fetching message:", error);
      throw new Error("Could not fetch message");
    }
  },
};

export default db;
