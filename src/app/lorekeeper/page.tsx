import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Share2 } from 'lucide-react'

export default function Lorekeeper() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-zinc-800 rounded-full px-3 py-1 text-sm">LOREKEEPER</div>
            <div className="bg-zinc-800 rounded-full px-3 py-1 text-sm">ALPHA</div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-6xl font-mono tracking-tighter">RIFT_LORE //</h1>
            <Button variant="outline" size="lg" className="gap-2">
              <Share2 className="w-4 h-4" />
              SHARE PROFILE
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-24">
          {/* Features Section */}
          <section>
            <h2 className="text-xl mb-8 tracking-wide">FEATURES</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="aspect-square bg-zinc-800/50 rounded-lg p-6 flex items-center justify-center
                           hover:bg-zinc-800 transition-colors cursor-pointer group"
                >
                  <span className="text-lg text-center group-hover:text-orange-500 transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Highlights Section */}
          <section>
            <h2 className="text-xl mb-8 tracking-wide">HIGHLIGHTS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/50 rounded-lg p-6 hover:bg-zinc-800 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                  <p className="text-zinc-400">{highlight.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const features = [
  "Character Arcs",
  "World Building",
  "Timeline Analysis",
  "Lore Connections",
  "Quest Tracking",
  "Achievement Log",
  "Story Paths",
  "Knowledge Base"
]

const highlights = [
  {
    title: "Deep Narrative Analysis",
    description: "Uncover hidden connections and story elements that shape the game's universe."
  },
  {
    title: "Interactive Timelines",
    description: "Navigate complex storylines with our intuitive timeline visualization system."
  },
  {
    title: "Character Relations",
    description: "Map and track character relationships, alliances, and conflicts throughout the story."
  },
  {
    title: "World Encyclopedia",
    description: "Access comprehensive information about locations, items, and historical events."
  },
  {
    title: "Quest Insights",
    description: "Get detailed breakdowns of quest chains and their impact on the overall narrative."
  },
  {
    title: "Community Contributions",
    description: "Collaborate with other players to expand and verify lore information."
  }
]

