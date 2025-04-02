import { ActualRole } from "@/hooks/conversations-provider";
import { NotificationCircle } from "../notification-circle";
import { Button } from "../ui/button";

type ModeSwitchProps = {
  toggleMode: () => void;
  loading: boolean;
  mode: ActualRole;
  showNotification: boolean;
};
export const ModeSwitch = ({
  toggleMode,
  loading,
  mode,
  showNotification,
}: ModeSwitchProps) => {
  return (
    <div>
      <Button
        className="mr-4 relative"
        disabled={loading}
        onClick={() => toggleMode()}>
        <span>{mode === "intelligence" ? "Be a User" : "Be the AI"}</span>

        <div className="absolute -right-2 -top-1">
          <NotificationCircle visible={showNotification} />
        </div>
      </Button>
    </div>
  );
};
