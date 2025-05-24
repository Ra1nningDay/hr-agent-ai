import { Message as MessageType } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";
import { format } from "date-fns";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3 p-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border bg-primary text-primary-foreground">
          <Bot className="h-7 w-7" />
        </Avatar>
      )}

      <div className="flex flex-col gap-1 max-w-[80%]">
        <div
          className={cn(
            "rounded-lg p-3",
            isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {format(message.timestamp, "h:mm a")}
        </span>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 border bg-secondary">
          <User className="h-7 w-7" />
        </Avatar>
      )}
    </div>
  );
}
