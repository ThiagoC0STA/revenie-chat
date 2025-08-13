"use client";

import * as React from "react";
import { AGENTS } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/chat-store";
import {
  Search,
  Zap,
  X,
  Bot,
  Shield,
  Settings,
  Pin,
  TrendingUp,
  Users,
  BarChart3,
  Palette,
  Film,
  DollarSign,
  Eye,
  FileText,
  Presentation,
  Search as SearchIcon,
  ShoppingCart,
  Target,
} from "lucide-react";

// Categorias reais fornecidas pelo usuário
const CATEGORIES = [
  {
    id: "pinned",
    name: "Pinned",
    icon: Pin,
    color: "from-yellow-500 to-orange-500",
    count: 1,
  },
  {
    id: "admin",
    name: "Admin",
    icon: Shield,
    color: "from-red-500 to-pink-500",
  },
  {
    id: "analyst",
    name: "Analyst",
    icon: BarChart3,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "coach",
    name: "Coach",
    icon: Users,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "content",
    name: "Content",
    icon: FileText,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "creative",
    name: "Creative",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "data",
    name: "Data",
    icon: BarChart3,
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "design",
    name: "Design",
    icon: Palette,
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: Film,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "finance",
    name: "Finance",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "foresight",
    name: "Foresight",
    icon: Eye,
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "general",
    name: "General",
    icon: Bot,
    color: "from-slate-500 to-gray-500",
  },
  {
    id: "hr",
    name: "Human Resources",
    icon: Users,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: Target,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "operations",
    name: "Operations",
    icon: Settings,
    color: "from-gray-500 to-slate-500",
  },
  {
    id: "presentation",
    name: "Presentation",
    icon: Presentation,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "research",
    name: "Research",
    icon: SearchIcon,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "sales",
    name: "Sales",
    icon: ShoppingCart,
    color: "from-emerald-500 to-green-500",
  },
  {
    id: "strategy",
    name: "Strategy",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "uncategorized",
    name: "Uncategorized",
    icon: Bot,
    color: "from-slate-400 to-gray-400",
  },
];

export function AgentsGrid() {
  const [query, setQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [sortBy, setSortBy] = React.useState<
    "name" | "relevance" | "category" | "pinned"
  >("pinned");
  const createThread = useChatStore((s: any) => s.createThread);
  const setActiveThread = useChatStore((s: any) => s.setActiveThread);

  const filtered = React.useMemo(() => {
    const filtered = AGENTS.filter((agent) => {
      const matchesQuery = [agent.name, agent.description, ...agent.tags]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) =>
          agent.tags.some((tag) => tag.toLowerCase() === cat.toLowerCase())
        );

      return matchesQuery && matchesCategories;
    });

    // Sort agents
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "category":
        filtered.sort((a, b) => a.tags[0]?.localeCompare(b.tags[0] || "") || 0);
        break;
      case "pinned":
        // Sort by pinned first, then by name
        filtered.sort((a, b) => {
          const aPinned = a.tags.includes("Pinned");
          const bPinned = b.tags.includes("Pinned");
          if (aPinned && !bPinned) return -1;
          if (!aPinned && bPinned) return 1;
          return a.name.localeCompare(b.name);
        });
        break;
      case "relevance":
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [query, selectedCategories, sortBy]);

  function start(id: string, name: string) {
    const threadId = createThread(name);
    setActiveThread(threadId);
  }

  function toggleCategory(category: string) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }

  function clearFilters() {
    setQuery("");
    setSelectedCategories([]);
    setSortBy("pinned");
  }

  const hasActiveFilters =
    query || selectedCategories.length > 0 || sortBy !== "pinned";

  function getCategoryIcon(categoryName: string) {
    const category = CATEGORIES.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    return category?.icon || Bot;
  }

  function getCategoryColor(categoryName: string) {
    const category = CATEGORIES.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    return category?.color || "from-slate-500 to-gray-500";
  }

  return (
    <div className="w-full p-6">
      {/* Advanced Filters Header */}
      <div className="mb-8">
        {/* Search and Sort Row */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500 z-10" />
            <Input
              placeholder="Search agents by name, description, or capabilities..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 w-full bg-white/90 backdrop-blur-sm border-violet-500/20 focus:border-violet-500 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
            >
              <option value="pinned">Sort by Pinned</option>
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
              <option value="relevance">Sort by Relevance</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(
              category.name.toLowerCase()
            );
            const agentCount = AGENTS.filter((agent) =>
              agent.tags.some(
                (tag) => tag.toLowerCase() === category.name.toLowerCase()
              )
            ).length;

            if (agentCount === 0) return null; // Hide empty categories

            return (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.name.toLowerCase())}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 flex items-center gap-2 text-slate-600",
                  isSelected
                    ? `bg-primary border-transparent shadow-md text-primary-foreground`
                    : "bg-white/80 text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50"
                )}
              >
                <Icon className="w-3 h-3" />
                {category.name}
                {category.count && (
                  <span className="ml-1 text-xs opacity-80">
                    ({category.count})
                  </span>
                )}
                <span className="text-xs opacity-70">({agentCount})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Bot className="w-4 h-4 text-violet-600" />
            <span>
              {filtered.length} agent{filtered.length !== 1 ? "s" : ""} found
            </span>
          </div>
          {hasActiveFilters && (
            <div className="text-xs text-slate-500">Filtered results</div>
          )}
        </div>
      </div>

      {/* Agents Grid - Flex Layout */}
      <div className="flex flex-wrap gap-4">
        {filtered.map((agent, index) => (
          <div
            key={agent.id}
            className="group flex-1 min-w-[320px] max-w-[400px] relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-violet-500/20 hover:border-violet-500/40 hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-lg"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Pinned Badge */}
            {agent.tags.includes("Pinned") && (
              <div className="absolute top-3 left-3 z-10">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Pin className="w-4 h-4 text-white" />
                </div>
              </div>
            )}

            {/* Floating Elements */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            </div>

            <div className="relative p-6">
              {/* Header with Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br bg-primary to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                      {agent.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {agent.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gradient-to-r from-violet-500/8 to-blue-500/8 text-violet-600 text-xs font-medium rounded-full border border-violet-500/20 hover:border-violet-500/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <Button
                onClick={() => start(agent.id, agent.name)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 h-11"
              >
                <Zap className="w-4 h-4 mr-2" />
                Start Chat
              </Button>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/3 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-500/8 to-blue-500/8 rounded-full flex items-center justify-center border border-violet-500/20">
            <Search className="w-12 h-12 text-violet-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No agents found
          </h3>
          <p className="text-slate-600 mb-4">
            {query || selectedCategories.length > 0
              ? "Try adjusting your search terms or category filters"
              : "No AI agents available at the moment"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors border border-violet-200"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
