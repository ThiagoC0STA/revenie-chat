import { generateId } from "@/lib/utils";
import { create } from "zustand";

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: number;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatState {
  threads: ChatThread[];
  activeThreadId: string | null;
  showAgentPicker: boolean;
  setShowAgentPicker: (open: boolean) => void;
  createThread: (title?: string) => string;
  setActiveThread: (id: string) => void;
  deleteThread: (id: string) => void;
  addMessage: (threadId: string, role: MessageRole, content: string) => void;
  updateTitleIfNeeded: (threadId: string) => void;
}

function createEmptyThread(title?: string): ChatThread {
  const id = generateId("thread");
  const now = Date.now();
  return {
    id,
    title: title ?? "Nova conversa",
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export const useChatStore = create<ChatState>((set) => ({
  threads: [createEmptyThread("Conversation")],
  activeThreadId: null,
  showAgentPicker: false,
  setShowAgentPicker: (open: boolean) => set({ showAgentPicker: open }),
  createThread: (title?: string) => {
    const newThread = createEmptyThread(title);
    set((state) => ({
      threads: [newThread, ...state.threads],
      activeThreadId: newThread.id,
      showAgentPicker: false,
    }));
    return newThread.id;
  },
  setActiveThread: (id: string) => set(() => ({ activeThreadId: id })),
  deleteThread: (id: string) =>
    set((state) => ({
      threads: state.threads.filter((t) => t.id !== id),
      activeThreadId:
        state.activeThreadId === id && state.threads.length > 1
          ? state.threads.find((t) => t.id !== id)?.id ?? null
          : state.activeThreadId === id
          ? null
          : state.activeThreadId,
    })),
  addMessage: (threadId: string, role: MessageRole, content: string) =>
    set((state) => {
      const threads = state.threads.map((t) => {
        if (t.id !== threadId) return t;
        const message: ChatMessage = {
          id: generateId("msg"),
          role,
          content,
          createdAt: Date.now(),
        };
        return {
          ...t,
          messages: [...t.messages, message],
          updatedAt: Date.now(),
        };
      });
      return { threads };
    }),
  updateTitleIfNeeded: (threadId: string) =>
    set((state) => {
      const threads = state.threads.map((t) => {
        if (t.id !== threadId) return t;
        if (
          t.messages.length > 0 &&
          (!t.title || t.title === "Nova conversa")
        ) {
          const first = t.messages[0]?.content ?? "Conversation";
          const title = first.length > 30 ? `${first.slice(0, 30)}…` : first;
          return { ...t, title };
        }
        return t;
      });
      return { threads };
    }),
}));
