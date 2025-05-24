import { Button } from "@/components/ui/button";
import { Bot, RefreshCcw } from "lucide-react";

interface ChatHeaderProps {
  onReset: () => void;
}

export function ChatHeader({ onReset }: ChatHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <h1 className="text-xl font-semibold">HR Agent</h1>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          title="Clear chat"
        >
          <RefreshCcw className="h-5 w-5" />
          <span className="sr-only">Clear chat</span>
        </Button>
      </div>
    </header>
  );
}
