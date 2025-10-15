//ChatScreen.js
// ChatScreen.js
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "You", text: "Hey! How’s it going?", time: "10:20 AM" },
    { id: 2, sender: "Alex", text: "Pretty good! Just chilling.", time: "10:21 AM" },
    { id: 3, sender: "You", text: "Nice! Up for a game later?", time: "10:22 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white">
      {/* Header */}
      <div className="p-4 bg-neutral-800 flex items-center justify-between shadow-md">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Chat with Alex</h2>
          <span className="text-sm text-neutral-400">Online</span>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                msg.sender === "You"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-neutral-700 text-gray-100 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-300 block mt-1 text-right">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-neutral-800 flex items-center gap-3 border-t border-neutral-700"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-neutral-700 text-white placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;