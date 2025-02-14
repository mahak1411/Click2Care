import React, { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const apiKey = 'AIzaSyAeCEHpLYX7oN5tytddH4A0NK_h99e5x9E';
      if (!apiKey) {
        throw new Error("API key is missing. Set REACT_APP_GEMINI_API_KEY in .env");
      }

      let botText = "";

      // Custom response for specific queries
      if (input.toLowerCase().includes("what do you do")) {
        botText =
          "I am a Health and Mental Well-being Assistant. I’m here to support you with helpful advice, relaxation techniques, and general wellness guidance. 💚";
      } else {
        // Fetch response from Google Gemini API
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          { contents: [{ parts: [{ text: input }] }] }
        );

        console.log("API Response:", response.data);

        botText =
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I'm here to support you. Feel free to share what's on your mind.";
      }

      const botMessage = { text: botText, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: "I'm here for you. If you’re feeling overwhelmed, take a deep breath. You’re not alone. 💚",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-green-50">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Health & Wellness Chatbot</h1>

      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md border border-green-300">
        <div className="h-[500px] overflow-y-auto border-b pb-4 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg mb-2 w-fit max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-white text-gray-800 border border-gray-300 self-end"
                  : "bg-green-100 text-green-900 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How are you feeling today? 💚"
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r-lg transition"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
