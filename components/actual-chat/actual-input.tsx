import { useConversation } from "@/hooks/conversations-provider";
import { CornerDownLeft } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { ChatInput } from "../ui/chat/chat-input";

export const ActualInput = () => {
  const { addMessage, loading, mode, messages } = useConversation();
  const [input, setInput] = useState<string>("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;
    setInput("");
    await addMessage(input);
  };

  const disabled = loading || (mode === "intelligence" && !messages.length);

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border bg-card focus-within:ring-1 focus-within:ring-ring p-1 mx-2 lg:mx-32 my-5 justify-self-end">
      <ChatInput
        disabled={disabled}
        placeholder="type your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-12 resize-none rounded-lg bg-card border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex w-full pr-5 pb-2 justify-end">
        <Button
          disabled={disabled}
          size="sm"
          className="sm:gap-1.5 p-2 sm:p-2 flex justify-center items-center">
          <div className="hidden sm:block">Send Message</div>
          <CornerDownLeft className="size-3.5 flex-shrink-0" />
        </Button>
      </div>
    </form>
  );
};
