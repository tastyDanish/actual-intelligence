import { UserRoundPen } from "lucide-react";
import { DialogItem } from "../ui/dialog-item";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type ProfileMenuProps = {
  handleDialogItemSelect: () => void;
  handleDialogItemOpenChange: (open: boolean) => void;
};

export const ProfileMenu = ({
  handleDialogItemSelect,
  handleDialogItemOpenChange,
}: ProfileMenuProps) => {
  return (
    <DialogItem
      triggerChildren={
        <div className="flex gap-4 items-center justify-between w-full">
          <UserRoundPen size={18} />
          <span>Profile</span>
        </div>
      }
      onSelect={handleDialogItemSelect}
      onOpenChange={handleDialogItemOpenChange}>
      <DialogTitle>Profile</DialogTitle>
      <DialogHeader>
        <DialogDescription>
          You would be able to edit your profile here when you can.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>footer</DialogFooter>
    </DialogItem>
  );
};
