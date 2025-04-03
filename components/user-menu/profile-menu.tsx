"use client";
import { UserRoundPen } from "lucide-react";
import { DialogItem } from "../ui/dialog-item";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ProfileForm } from "./profile-form";
import { useState } from "react";

type ProfileMenuProps = {
  handleDialogItemSelect: () => void;
  handleDialogItemOpenChange: (open: boolean) => void;
};

export const ProfileMenu = ({
  handleDialogItemSelect,
  handleDialogItemOpenChange,
}: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
    handleDialogItemOpenChange(false);
  };
  const handleOpenChange = (e: boolean) => {
    setOpen(e);
    handleDialogItemOpenChange(e);
  };

  return (
    <DialogItem
      open={open}
      triggerChildren={
        <div className="flex gap-4 items-center justify-between w-full">
          <UserRoundPen size={18} />
          <span>Profile</span>
        </div>
      }
      onSelect={handleDialogItemSelect}
      onOpenChange={handleOpenChange}>
      <DialogTitle>Profile</DialogTitle>
      <DialogHeader>
        <DialogDescription>Change your Avatar and hat!</DialogDescription>
      </DialogHeader>
      <ProfileForm handleSubmit={handleSubmit} />
    </DialogItem>
  );
};
