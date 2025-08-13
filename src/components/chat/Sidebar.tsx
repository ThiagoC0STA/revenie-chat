"use client";

import * as React from "react";
import { useChatStore } from "@/store/chat-store";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MessageSquare,
  Trash2,
  Sparkles,
  Clock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export function Sidebar() {
  const threads = useChatStore((s: any) => s.threads);
  const activeThreadId = useChatStore((s: any) => s.activeThreadId);
  const setActiveThread = useChatStore((s: any) => s.setActiveThread);
  const deleteThread = useChatStore((s: any) => s.deleteThread);

  const setShowAgentPicker = useChatStore((s: any) => s.setShowAgentPicker);

  return (
    <aside className="hidden md:flex h-full flex-col bg-white/95 backdrop-blur-xl border-r border-slate-200/60 relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/3 via-transparent to-blue-500/3 opacity-60" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/60">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900">Revenie</h1>
              <p className="text-xs text-slate-600">AI Chat Platform</p>
            </div>
          </div>

          <Button
            onClick={() => setShowAgentPicker(true)}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus size={16} />
            Start New Chat
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 mb-4 justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>Recent Conversations</span>
            </div>

            {threads.length > 0 && (
              <span className="text-[9px] text-slate-600 rounded-full bg-slate-100 px-[6px] py-[3px]">
                {threads.length}
              </span>
            )}
          </div>

          {threads.map((t: any) => (
            <button
              key={t.id}
              onClick={() => setActiveThread(t.id)}
              className={cn(
                "group w-full rounded-xl p-4 text-left transition-all duration-300 border-2 relative overflow-hidden",
                activeThreadId === t.id
                  ? "border-violet-500 bg-gradient-to-r from-violet-500/8 to-blue-500/8"
                  : "border-transparent hover:border-violet-300/60 hover:bg-gradient-to-r hover:from-violet-500/4 hover:to-blue-500/4"
              )}
            >
              {/* Active Indicator */}
              {activeThreadId === t.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-blue-500 rounded-r-full" />
              )}

              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/3 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center gap-3">
                <div
                  className={cn(
                    "rounded-xl p-3 transition-all duration-300 flex-shrink-0 w-10 h-10 flex items-center justify-center",
                    activeThreadId === t.id
                      ? "bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg"
                      : "bg-gradient-to-br from-violet-500/8 to-blue-500/8 text-violet-600 group-hover:from-violet-500/16 group-hover:to-blue-500/16"
                  )}
                >
                  <MessageSquare size={16} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">
                    {t.title || "Conversation"}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-3 h-3" />
                    <span>
                      {formatDistanceToNow(t.updatedAt, { addSuffix: true })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(t.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-slate-600 hover:text-red-600 hover:scale-110 flex-shrink-0 w-8 h-8 flex items-center justify-center"
                  aria-label="Delete conversation"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/60">
          <div className="text-center p-3 bg-gradient-to-br from-violet-500/8 to-blue-500/8 rounded-xl border border-violet-500/20">
            <TrendingUp className="w-4 h-4 text-violet-600 mx-auto mb-2" />
            <div className="text-xs text-slate-600">
              Powered by advanced AI models
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
