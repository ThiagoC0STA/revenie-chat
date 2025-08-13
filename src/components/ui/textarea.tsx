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
          "w-full resize-none rounded-xl border-none bg-white px-1 py-2 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition ",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
