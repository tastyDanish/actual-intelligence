"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";

const storedStateKey = "actual-intelligence-prompt-state";

export const IntelligencePrompt = () => {
  const storedState = localStorage.getItem(storedStateKey);
  const [isOpen, setIsOpen] = useState<"prompt" | "closed">(
    storedState ? JSON.parse(storedState) : "prompt"
  );

  useEffect(() => {
    localStorage.setItem(storedStateKey, JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <>
      <Accordion
        type="single"
        collapsible
        defaultValue={isOpen}
        className="px-4 sm:px-48">
        <AccordionItem value="prompt">
          <AccordionTrigger
            onClick={() =>
              isOpen === "prompt" ? setIsOpen("closed") : setIsOpen("prompt")
            }>
            User Prompt
          </AccordionTrigger>
          <AccordionContent>
            Thanks for helping out as my AI (Actual Intelligence) LLM model. I
            really appreciate it! Act like a helpful AI assistant - friendly,
            clear, and a bit witty. You can add exactly one message to the
            conversation before the next one is given to you.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator />
    </>
  );
};
