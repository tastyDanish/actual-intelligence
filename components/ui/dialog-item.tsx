import React from "react";

import { DropdownMenuItem } from "./dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";

interface DialogItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuItem> {
  triggerChildren: React.ReactNode;
  children: React.ReactNode;
  onSelect?: () => void;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DialogItem = React.forwardRef<HTMLDivElement, DialogItemProps>(
  (
    { triggerChildren, children, onSelect, onOpenChange, open, ...itemProps },
    forwardedRef
  ) => {
    return (
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <DropdownMenuItem
            {...itemProps}
            ref={forwardedRef}
            className="DropdownMenuItem"
            onSelect={(event) => {
              event.preventDefault();
              onSelect && onSelect();
            }}>
            {triggerChildren}
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="max-w-fit sm-max-w-md">
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);

DialogItem.displayName = "DialogItem";
