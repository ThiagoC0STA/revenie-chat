"use client";

import * as React from "react";
import { Sidebar } from "@/components/chat/Sidebar";
import { MessageList } from "@/components/chat/MessageList";
import { Composer } from "@/components/chat/Composer";
import { useChatStore } from "@/store/chat-store";
import { cn } from "@/lib/utils";
import { Topbar } from "@/components/chat/Topbar";
import { AgentsGrid } from "@/components/chat/AgentsGrid";

export interface ChatLayoutProps {
  className?: string;
}

export function ChatLayout({ className }: ChatLayoutProps) {
  const activeThreadId = useChatStore((s: any) => s.activeThreadId ?? s.threads[0]?.id);
  const setActiveThread = useChatStore((s: any) => s.setActiveThread);
  const showAgentPicker = useChatStore((s: any) => s.showAgentPicker);
  React.useEffect(() => {
    if (!activeThreadId) {
      const first = useChatStore.getState().threads[0]?.id;
      if (first) setActiveThread(first);
    }
  }, [activeThreadId, setActiveThread]);

  return (
    <div
      className={cn(
        "grid h-screen w-full grid-cols-1 md:grid-cols-[320px_1fr]",
        className
      )}
    >
      <Sidebar />
      <div className="relative flex flex-col bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">
        <Topbar />
        {showAgentPicker ? (
          <AgentsGrid />
        ) : (
          <>
            <MessageList threadId={activeThreadId!} />
            <Composer threadId={activeThreadId!} />
          </>
        )}
      </div>
    </div>
  );
}


