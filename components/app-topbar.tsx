"use client";
import { useConversation } from "@/hooks/conversations-provider";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export const AppTopBar = () => {
  const { mode, toggleMode, loading } = useConversation();

  return (
    <div className="grid w-full pt-4 grid-cols-3 justify-self-start">
      {mode === "user" ? (
        <SidebarTrigger className="justify-self-start" />
      ) : (
        <div />
      )}
      <Button
        className="justify-self-center"
        disabled={loading}
        onClick={() => toggleMode()}>
        switch modes
      </Button>
    </div>
  );
};
