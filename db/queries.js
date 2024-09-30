import { pool } from "./pool.js";

const db = {
  // get all messages
  async getAllMessages() {
    try {
      const { rows } = await pool.query("SELECT * FROM messages");
      console.log("getting all messages");
      return rows;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw new Error("Could not fetch messages");
    }
  },

  // insert new message
  async insertNewMessage(text, username) {
    try {
      //   await pool.query(
      //     "INSERT INTO messages (text, username, date) VALUES ($1, $2, CURRENT_DATE)",
      //     [text, username]
      //   );
      console.log("inserting new message");
    } catch (error) {
      console.error("Error inserting new message:", error);
      throw new Error("Could not insert new message");
    }
  },

  // get message by id
  async getMessageById(id) {
    try {
      //   const row = await pool.query("SELECT * FROM messages WHERE id = $1", [
      //     id,
      //   ]);
      console.log("getting message by id");
    } catch (error) {
      console.error("Error fetching message:", error);
      throw new Error("Could not fetch message");
    }
  },
};

export default db;
