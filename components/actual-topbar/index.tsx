"use client";
import { useConversation } from "@/hooks/conversations-provider";
import { useSidebar } from "../ui/sidebar";
import { UserMenu } from "../user-menu";
import { SidebarButton } from "./sidebar-button";
import { Leaderboard } from "./leaderboard";
import { ModeSwitch } from "./mode-switch";
import { useToast } from "@/hooks/use-toast";

export const ActualTopbar = () => {
  const { mode, toggleMode, loading, newMessage } = useConversation();
  const { isMobile, open } = useSidebar();

  return (
    <div className="w-full pt-4 grid grid-cols-3 justify-between pb-2">
      <SidebarButton
        mode={mode}
        showNotification={newMessage && (isMobile || !open)}
      />
      {/* {user?.role === "admin" && <AdminControls />} */}
      <div className="flex justify-self-center gap-2">
        <Leaderboard isMobile={isMobile} />

        <ModeSwitch
          toggleMode={toggleMode}
          loading={loading}
          mode={mode}
          showNotification={newMessage && (isMobile || !open)}
        />
      </div>

      <UserMenu />
    </div>
  );
};
