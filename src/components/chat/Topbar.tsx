"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Zap, Sparkles } from "lucide-react";
import { useChatStore } from "@/store/chat-store";

export function Topbar() {
  const setShowAgentPicker = useChatStore((s: any) => s.setShowAgentPicker);
  return (
    <>
      {/* Mobile Topbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/60 bg-white/90 backdrop-blur-xl px-4 py-4 md:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-900">Revenie</div>
            <div className="text-xs text-slate-600">AI Chat</div>
          </div>
        </div>
        <Button
          onClick={() => setShowAgentPicker(true)}
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold shadow-lg"
        >
          <Sparkles size={16} className="mr-2" />
          New Chat
        </Button>
      </div>

      {/* Desktop Topbar */}
      <div className="hidden md:flex items-center justify-between border-b border-slate-200/60 bg-white/95 backdrop-blur-xl px-6 py-4 relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/3 via-transparent to-blue-500/3 opacity-40" />

        <div className="relative z-10 flex items-center gap-6">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Bot className="w-4 h-4 text-violet-600" />
              <span>4 AI Agents</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Real-time Chat</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span>AI-powered responses</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          {/* Removed Start New Chat button */}
        </div>
      </div>
    </>
  );
}
