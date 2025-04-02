"use client";
import { signOutAction } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import { LogOut, Menu } from "lucide-react";
import { useUser } from "@/hooks/user-provider";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { ProfileMenu } from "./profile-menu";
import { useSidebar } from "../ui/sidebar";

export const UserMenu = () => {
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const { isMobile } = useSidebar();

  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null);
  const focusRef = useRef<HTMLButtonElement | null>(null);

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current;
  };

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  };

  return (
    <div className="flex justify-end gap-4 items-center">
      {!isMobile && (
        <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
          {user?.name}
        </span>
      )}

      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            ref={dropdownTriggerRef}>
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="text-sm py-2"
          hidden={hasOpenDialog || !dropdownOpen}
          onCloseAutoFocus={(e) => {
            if (focusRef.current) {
              focusRef.current.focus();
              focusRef.current = null;
              e.preventDefault();
            }
          }}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <ProfileMenu
              handleDialogItemSelect={handleDialogItemSelect}
              handleDialogItemOpenChange={handleDialogItemOpenChange}
            />

            <DropdownMenuItem onClick={signOutAction}>
              <div className="flex gap-4 items-center justify-between w-full">
                <LogOut size={18} />
                <span>Log out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
