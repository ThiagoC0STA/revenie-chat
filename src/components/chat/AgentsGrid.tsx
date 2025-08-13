"use client";

import * as React from "react";
import { AGENTS } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/chat-store";
import { Search, Crown, Zap, Star } from "lucide-react";

export function AgentsGrid() {
  const [query, setQuery] = React.useState("");
  const createThread = useChatStore((s: any) => s.createThread);
  const setActiveThread = useChatStore((s: any) => s.setActiveThread);

  const filtered = AGENTS.filter((a) =>
    [a.name, a.description, ...a.tags]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  function start(id: string, name: string) {
    const threadId = createThread(name);
    setActiveThread(threadId);
  }

  return (
    <div className="mx-auto w-full max-w-7xl p-8">
      {/* Search and Stats */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{filtered.length} agents available</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Crown className="w-4 h-4 text-violet-600" />
            <span>Premium AI models</span>
          </div>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search agents, skills, or capabilities..."
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm border-violet-500/20 focus:border-violet-500"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((agent, index) => (
          <div
            key={agent.id}
            className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-violet-500/20 hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Elements */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 float-animation">
              <div className="w-2 h-2 bg-violet-500 rounded-full" />
            </div>

            <div className="relative p-6">
              {/* Content */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {agent.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gradient-to-r from-violet-500/8 to-blue-500/8 text-violet-600 text-xs font-medium rounded-full border border-violet-500/20 hover:border-violet-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <Button
                  onClick={() => start(agent.id, agent.name)}
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/3 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-500/8 to-blue-500/8 rounded-full flex items-center justify-center border border-violet-500/20">
            <Search className="w-12 h-12 text-violet-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No agents found
          </h3>
          <p className="text-slate-600">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
