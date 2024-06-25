"use client";

import React from "react";
import ReactDOM from "react-dom";
import { PageHeading } from "../ui/text";
import { Info } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../ui";

const Modal = ({
  isShowing,
  hide,
  title,
  children,
  toggleModal,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  disableOverlayClose = false,
  buttonProps,
  onCancel = hide,
  className,
}) => {
  const modal = (
    <div
      className={"modal-overlay"}
      onClick={!disableOverlayClose ? hide : null}
    >
      <div className="modal-wrapper">
        <div className="modal space-y-4" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <PageHeading className={"flex gap-4 items-center"}>
              <Info />
              {title}
            </PageHeading>
          </div>
          <div className={cn("modal-body", className)}>{children}</div>
          <div className="modal-footer flex gap-2">
            {onConfirm && (
              <Button
                className={cn(
                  "modal-button w-full py-2 hover:scale-105",
                  buttonProps?.className
                )}
                {...buttonProps}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            )}
            {onCancel && (
              <Button
                className="modal-button w-full py-2 hover:bg-transparent hover:scale-105"
                onClick={onCancel}
                variant={"outline"}
              >
                {cancelLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return isShowing ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
