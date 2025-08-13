export type Agent = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  avatarEmoji?: string;
};

export const AGENTS: Agent[] = [
  {
    id: "content_synth",
    name: "Content Synthesizer",
    description:
      "Synthesizes insights from complex content, summarizing and extracting key information.",
    tags: ["Strategy", "Content", "Admin"],
    avatarEmoji: "✨",
  },
  {
    id: "meeting_sum",
    name: "Meeting Summarizer",
    description:
      "Turns long meetings into crisp, structured notes with action items and decisions.",
    tags: ["Operations", "Notes"],
    avatarEmoji: "📝",
  },
  {
    id: "generalist",
    name: "Generalist Agent",
    description:
      "Helps with research, Q&A, writing, role-play, and miscellaneous tasks.",
    tags: ["Admin", "Research"],
    avatarEmoji: "🤖",
  },
  {
    id: "article_sum",
    name: "Article Summarizer",
    description:
      "Summarizes articles to a target length while preserving key ideas and tone.",
    tags: ["Content", "Operations"],
    avatarEmoji: "📚",
  },
];
