"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AGENTS, Agent } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/chat-store";

interface NewChatDialogProps {
  open: boolean;
  onClose: () => void;
}

export function NewChatDialog({ open, onClose }: NewChatDialogProps) {
  const createThread = useChatStore((s: any) => s.createThread);
  const setActiveThread = useChatStore((s: any) => s.setActiveThread);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (typeof document === "undefined" || !open) return null;

  const agents = AGENTS.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  function startWith(agent: Agent) {
    const threadTitle = `${agent.name}`;
    const id = createThread(threadTitle);
    setActiveThread(id);
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative mx-4 w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200">
          <div className="text-lg font-semibold">Start new chat</div>
          <Button variant="ghost" onClick={onClose} aria-label="Close">
            Close
          </Button>
        </div>
        <div className="p-4">
          <Input
            placeholder="Search agents, tags..."
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            className="mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
            {agents.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-zinc-200 p-4 hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{a.avatarEmoji ?? "🤖"}</div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-zinc-900">{a.name}</div>
                    <div className="text-sm text-zinc-600 line-clamp-2">
                      {a.description}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {a.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-primary/10 text-primary text-xs px-2 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={() => startWith(a)} fullWidth>
                    Chat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


