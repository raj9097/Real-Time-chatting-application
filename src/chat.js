import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, push, onValue, remove } from "firebase/database"; // Import `remove` for deleting messages
import "./chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [user1Input, setUser1Input] = useState("");
  const [user2Input, setUser2Input] = useState("");

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Include the message keys for deletion
        const messagesWithKeys = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setMessages(messagesWithKeys);
      }
    });
  }, []);

  const sendMessage = (sender, input) => {
    if (input.trim() !== "") {
      push(ref(db, "messages"), {
        text: input,
        timestamp: Date.now(),
        sender: sender,
      });
      if (sender === "user1") {
        setUser1Input("");
      } else {
        setUser2Input("");
      }
    }
  };

  const deleteMessage = (key) => {
    const messageRef = ref(db, `messages/${key}`);
    remove(messageRef); // Remove the message from Firebase
  };

  return (
    <div className="chat-container">
      <div className="chat-section">
        <h2>User 1</h2>
        <div className="messages" style={{ height: 300, overflowY: "scroll" }}>
          {messages.map((msg) =>
            msg.sender === "user1" ? (
              <div key={msg.key} className="message-container">
                <p className="user-message">{msg.text}</p>
                <button
                  className="delete-button"
                  onClick={() => deleteMessage(msg.key)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <p key={msg.key} className="other-message">
                {msg.text}
              </p>
            )
          )}
        </div>
        <input
          type="text"
          value={user1Input}
          onChange={(e) => setUser1Input(e.target.value)}
          placeholder="User 1: Type a message..."
        />
        <button onClick={() => sendMessage("user1", user1Input)}>Send</button>
      </div>

      <div className="chat-section">
        <h2>User 2</h2>
        <div className="messages" style={{ height: 300, overflowY: "scroll" }}>
          {messages.map((msg) =>
            msg.sender === "user2" ? (
              <div key={msg.key} className="message-container">
                <p className="user-message">{msg.text}</p>
                <button
                  className="delete-button"
                  onClick={() => deleteMessage(msg.key)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <p key={msg.key} className="other-message">
                {msg.text}
              </p>
            )
          )}
        </div>
        <input
          type="text"
          value={user2Input}
          onChange={(e) => setUser2Input(e.target.value)}
          placeholder="User 2: Type a message..."
        />
        <button onClick={() => sendMessage("user2", user2Input)}>Send</button>
      </div>
    </div>
  );
};

export default Chat;