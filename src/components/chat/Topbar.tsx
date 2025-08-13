"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Plus } from "lucide-react";
import { useChatStore } from "@/store/chat-store";

export function Topbar() {
  const setShowAgentPicker = useChatStore((s: any) => s.setShowAgentPicker);
  return (
    <>
      {/* Mobile Topbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/60 bg-white/90 backdrop-blur-xl px-4 py-4 md:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-slate-900">Revenie</div>
            <div className="text-xs text-slate-600">AI Chat</div>
          </div>
        </div>
        <Button
          onClick={() => setShowAgentPicker(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6"
        >
          <Plus size={16} />
          Start New Chat
        </Button>
      </div>

      {/* Desktop Topbar */}
      <div className="hidden md:flex items-center justify-between border-b border-slate-200/60 bg-white/95 backdrop-blur-xl px-6 py-4 relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-primary/3 opacity-40" />

        <div className="relative z-10 flex items-center gap-6">
          {/* Agent Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">AI Assistant</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Button
            onClick={() => setShowAgentPicker(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 px-6"
          >
            <Plus size={16}/>
            Start New Chat
          </Button>
        </div>
      </div>
    </>
  );
}
