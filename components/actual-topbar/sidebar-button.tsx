import { ActualRole } from "@/hooks/conversations-provider";
import { SidebarTrigger } from "../ui/sidebar";
import { NotificationCircle } from "../notification-circle";

type SidebarButtonProps = {
  mode: ActualRole;
  showNotification: boolean;
};
export const SidebarButton = ({
  mode,
  showNotification,
}: SidebarButtonProps) => {
  return mode === "user" ? (
    <div className="justify-self-start flex relative">
      <SidebarTrigger className="justify-self-start" />
      <div className="absolute right-0">
        <NotificationCircle visible={showNotification} />
      </div>
    </div>
  ) : (
    <div />
  );
};
