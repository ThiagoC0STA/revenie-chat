"use client";

import * as React from "react";
import { Paperclip, Send, Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";

export interface ComposerProps {
  threadId: string;
}

export function Composer({ threadId }: ComposerProps) {
  const [value, setValue] = React.useState("");
  const addMessage = useChatStore((s: any) => s.addMessage);
  const updateTitleIfNeeded = useChatStore((s: any) => s.updateTitleIfNeeded);

  function send() {
    const content = value.trim();
    if (!content) return;
    addMessage(threadId, "user", content);
    updateTitleIfNeeded(threadId);
    setValue("");
    // Placeholder assistant echo for now
    setTimeout(() => {
      addMessage(threadId, "assistant", `You said: ${content}`);
    }, 350);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="sticky bottom-0 border-t border-slate-200/60 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto w-full p-6">
        <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-violet-500/20 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-blue-500/3 opacity-60" />

          <div className="relative px-4 py-2">
            {/* Input Row */}
            <div className="flex items-end gap-3">
              {/* Textarea */}
              <div className="flex-1 relative">
                <Textarea
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type your message here... Ask anything to your AI assistant..."
                  className="w-full min-h-[48px] max-h-32 bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-base placeholder:text-slate-500/60"
                  minRows={1}
                  maxRows={6}
                />

                {/* Character Count */}
                {value.length > 0 && (
                  <div className="absolute bottom-1 right-2 text-xs text-slate-500">
                    {value.length}
                  </div>
                )}
              </div>

              {/* Send Button */}
              <Button
                onClick={send}
                disabled={!value.trim()}
                className="h-12 px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={18} className="mr-2" />
                Send
              </Button>
            </div>

            {/* Footer with Action Buttons */}
            <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-200/60 mt-2">
              <div className="flex items-center gap-3">
                {/* Attach Button */}
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:text-violet-600 hover:bg-gradient-to-br hover:from-violet-500/8 hover:to-blue-500/8 transition-all duration-300 border border-transparent hover:border-violet-500/20"
                  aria-label="Attach files"
                >
                  <Paperclip size={18} />
                </button>

                {/* Voice Button */}
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:text-blue-600 hover:bg-gradient-to-br hover:from-blue-500/8 hover:to-violet-500/8 transition-all duration-300 border border-transparent hover:border-blue-500/20"
                  aria-label="Voice input"
                >
                  <Mic size={18} />
                </button>
              </div>

              <div className="text-xs text-slate-600">
                <kbd className="px-2 py-1 bg-slate-100 rounded text-xs">
                  Shift + Enter
                </kbd>{" "}
                for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
