import { cn } from "@/lib/utils";

type NotificationCircleProps = {
  visible: boolean;
};

export const NotificationCircle = ({ visible }: NotificationCircleProps) => {
  return (
    <svg
      width="12"
      height="12"
      className={cn("fill-accent", visible ? "opacity-100" : "opacity-0")}>
      <circle
        cx="6"
        cy="6"
        r="6"
      />
    </svg>
  );
};
