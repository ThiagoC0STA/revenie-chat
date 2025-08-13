"use client";

import * as React from "react";
import { useChatStore, ChatMessage } from "@/store/chat-store";
import { Bot, User, Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MessageListProps {
  threadId: string;
}

export function MessageList({ threadId }: MessageListProps) {
  const thread = useChatStore((s: any) => s.threads.find((t: any) => t.id === threadId));
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight });
    }
  }, [thread?.messages.length]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-8 space-y-8">
      {thread?.messages.length ? (
        thread.messages.map((m: any, index: number) => (
          <MessageBubble key={m.id} message={m} index={index} />
        ))
      ) : (
        <div className="mx-auto max-w-3xl text-center pt-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-500/8 to-blue-500/8 rounded-full flex items-center justify-center border border-violet-500/20">
            <Sparkles className="w-12 h-12 text-violet-600" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Start Your AI Journey
          </h3>
          <p className="text-md text-slate-600 max-w-md mx-auto">
            Choose an AI agent and begin your first conversation. Ask questions, get insights, and explore the power of AI.
          </p>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message, index }: { message: ChatMessage; index: number }) {
  const isUser = message.role === "user";
  
  return (
    <div 
      className="mx-auto w-full max-w-3xl animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >   
      <div className="flex items-start gap-4 group">
        {/* Avatar */}
        <div className={cn(
          "relative mt-2 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0",
          isUser 
            ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white" 
            : "bg-gradient-to-br from-violet-600 to-blue-600 text-white"
        )}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="font-semibold text-slate-900">
              {isUser ? "You" : "AI Assistant"}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <Clock className="w-3 h-3" />
              <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Message Bubble */}
          <div className={cn(
            "relative rounded-2xl p-4 border-2 transition-all duration-300",
            isUser 
              ? "bg-gradient-to-r from-blue-500/8 to-violet-500/8 border-blue-500/60" 
              : "bg-gradient-to-r from-violet-500/8 to-blue-500/8 border-violet-500/60"
          )}>
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent rounded-2xl opacity-60" />
            
            <div className="relative">
              <div className="whitespace-pre-wrap text-slate-900 leading-relaxed text-base">
                {message.content}
              </div>
            </div>

            {/* Corner Accent */}
            <div className={cn(
              "absolute top-0 right-0 w-4 h-4 rounded-bl-full",
              isUser 
                ? "bg-gradient-to-br from-blue-600 to-violet-600" 
                : "bg-gradient-to-br from-violet-600 to-blue-600"
            )} />
          </div>
        </div>
      </div>
    </div>
  );
}


