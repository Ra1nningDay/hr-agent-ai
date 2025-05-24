"use client";

import useChatbot from "../../hooks/use-chatbot";

export default function InterviewSessionPage() {
  const { messages, input, setInput, handleSend } = useChatbot();

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={
                msg.role === "user"
                  ? "bg-blue-100 px-2 py-1 rounded"
                  : "bg-gray-100 px-2 py-1 rounded"
              }
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
