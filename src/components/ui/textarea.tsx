import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";

export type TextareaProps = React.ComponentProps<typeof TextareaAutosize> & {
  className?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, minRows = 1, maxRows = 8, ...props }, ref) => {
    return (
      <TextareaAutosize
        ref={ref as any}
        minRows={minRows}
        maxRows={maxRows}
        className={cn(
          "w-full resize-none rounded-xl border border-border bg-input px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";


