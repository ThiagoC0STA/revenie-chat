import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "outline";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", fullWidth, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-xl transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4";
    const styles: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
      secondary:
        "bg-muted text-muted-foreground hover:bg-muted/80 border border-border",
      ghost:
        "bg-transparent hover:bg-muted/50 text-foreground",
      destructive:
        "bg-red-600 text-white hover:bg-red-700",
      outline:
        "border border-border bg-background hover:bg-muted/50 text-foreground",
    };
    return (
      <button
        ref={ref}
        className={cn(base, styles[variant], fullWidth && "w-full", className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";


