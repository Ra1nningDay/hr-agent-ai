"use client";

import { useState, useRef, useEffect } from "react";
import { Message as MessageType } from "@/types/chat";
import { ChatInput } from "./chat-input";
import { ChatHeader } from "./chat-header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { sendChatMessage } from "@/lib/api/chatbot-api";
import { Message } from "./message";
import { v4 as uuidv4 } from "uuid";
import { TypingIndicator } from "./typing-indicator";

export function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "สวัสดีค่ะ ดิฉันคือระบบผู้ช่วยสัมภาษณ์อัจฉริยะที่จะดูแลขั้นตอนเบื้องต้นของการสัมภาษณ์งานในวันนี้ ก่อนที่เราจะเริ่ม ดิฉันขอทราบชื่อนามสกุล และตำแหน่งล่าสุดของคุณก่อนนะคะ?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (content: string) => {
    if (isLoading) return;

    setError(null);

    const userMessage: MessageType = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiMessages = messages
        .concat(userMessage)
        .map(({ role, content }) => ({ role, content }));
      const response = await sendChatMessage(apiMessages);

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: response.reply,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get a response. Please try again.";
      setError(errorMessage);
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "สวัสดีค่ะ ดิฉันคือระบบผู้ช่วยสัมภาษณ์อัจฉริยะที่จะดูแลขั้นตอนเบื้องต้นของการสัมภาษณ์งานในวันนี้ ก่อนที่เราจะเริ่ม ดิฉันขอทราบชื่อนามสกุล และตำแหน่งล่าสุดของคุณก่อนนะคะ?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      <ChatHeader onReset={handleReset} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}

          {isLoading && <TypingIndicator />}

          {error && (
            <Alert variant="destructive" className="mx-4 my-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
