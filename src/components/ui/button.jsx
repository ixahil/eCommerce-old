// import useStatus from "@/hooks/useStatus";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import React from "react";

const buttonVariants = cva(
  "rounded-md inline-flex gap-2 items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent hover:bg-accent/80",
        destructive: [
          "bg-destructive",
          "text-destructive-foreground",
          "hover:bg-destructive/80",
        ],
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "hover:bg-accent-success border --color:theme(colors.red)",
        black: [
          "text-white",
          "bg-black",
          "border-black",
          "[--color:theme(colors.black)]",
        ],
        delete:
          "bg-destructive text-white hover:bg-transparent hover:text-destructive",
      },
      buttonType: {
        outline: "hover:bg-[--color] border border-[--color]",
      },
      size: {
        default: "px-4 py-3",
        sm: "px-3",
        lg: "px-8",
        icon: "w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = ({
  className,
  title,
  variant,
  size,
  buttonType,
  children,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, buttonType, className }))}
      {...props}
    >
      {isLoading ? (
        <div className={"flex gap-2"}>
          <LoaderCircle className="animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
