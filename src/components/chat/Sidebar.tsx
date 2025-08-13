"use client";

import * as React from "react";
import { useChatStore } from "@/store/chat-store";
import {
  MessageSquare,
  Trash2,
  Sparkles,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Bot,
  Zap,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export function Sidebar() {
  const threads = useChatStore((s: any) => s.threads);
  const activeThreadId = useChatStore((s: any) => s.activeThreadId);
  const setActiveThread = useChatStore((s: any) => s.setActiveThread);
  const deleteThread = useChatStore((s: any) => s.deleteThread);

  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredThreads = threads.filter((t: any) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentThreads = filteredThreads.slice(0, 8);
  const hasMoreThreads = filteredThreads.length > 8;

  return (
    <aside className="hidden md:flex h-full flex-col bg-white/95 backdrop-blur-xl border-r border-slate-200/60 relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/3 via-transparent to-blue-500/3 opacity-60" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-900">Revenie</h1>
              <p className="text-sm text-slate-600">AI Chat Platform</p>
            </div>
          </div>

          {/* <Button
            onClick={() => setShowAgentPicker(true)}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base"
          >
            <Plus size={18} className="mr-2" />
            Start New Chat
          </Button> */}
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-slate-200/60">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 py-3 border-b border-slate-200/60">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-gradient-to-br from-violet-500/8 to-blue-500/8 rounded-lg border border-violet-500/20">
              <div className="text-lg font-bold text-violet-600">
                {threads.length}
              </div>
              <div className="text-xs text-slate-600">Chats</div>
            </div>
            <div className="text-center p-2 bg-gradient-to-br from-blue-500/8 to-violet-500/8 rounded-lg border border-blue-500/20">
              <div className="text-lg font-bold text-blue-600">4</div>
              <div className="text-xs text-slate-600">Agents</div>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MessageSquare className="w-4 h-4 text-violet-600" />
                <span>Conversations</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {recentThreads.map((t: any) => (
                <button
                  key={t.id}
                  onClick={() => setActiveThread(t.id)}
                  className={cn(
                    "group w-full rounded-xl p-3 text-left transition-all duration-300 border-2 relative overflow-hidden",
                    activeThreadId === t.id
                      ? "border-violet-500 bg-gradient-to-r from-violet-500/10 to-blue-500/10 shadow-lg"
                      : "border-transparent hover:border-violet-300/60 hover:bg-gradient-to-r hover:from-violet-500/6 hover:to-blue-500/6"
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
                        "rounded-xl p-2.5 transition-all duration-300 flex-shrink-0 w-9 h-9 flex items-center justify-center",
                        activeThreadId === t.id
                          ? "bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg"
                          : "bg-gradient-to-br from-violet-500/10 to-blue-500/10 text-violet-600 group-hover:from-violet-500/20 group-hover:to-blue-500/20"
                      )}
                    >
                      <MessageSquare size={14} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-slate-900 group-hover:text-violet-600 transition-colors text-sm">
                        {t.title || "New Conversation"}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>
                          {formatDistanceToNow(t.updatedAt, {
                            addSuffix: true,
                          })}
                        </span>
                        {t.messages.length > 0 && (
                          <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded-full">
                            {t.messages.length}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement edit functionality
                        }}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        aria-label="Edit conversation"
                      >
                        <Star className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteThread(t.id);
                        }}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Delete conversation"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </button>
              ))}

              {hasMoreThreads && (
                <div className="text-center py-3">
                  <span className="text-xs text-slate-500">
                    +{filteredThreads.length - 8} more conversations
                  </span>
                </div>
              )}

              {filteredThreads.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">
                    {searchQuery
                      ? "No conversations found"
                      : "No conversations yet"}
                  </p>
                  {!searchQuery && (
                    <p className="text-xs text-slate-400 mt-1">
                      Start your first chat above
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/60">
          <div className="text-center p-3 bg-gradient-to-br from-violet-500/8 to-blue-500/8 rounded-xl border border-violet-500/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-violet-600" />
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Powered by AI
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Advanced language models
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
