"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { ResponseTimeChart } from "@/components/charts/ResponseTimeChart";
import { MessageLengthChart } from "@/components/charts/MessageLengthChart";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Mock Data
const mockResponseData = [
  { date: "Oct 01", you: 1.2, them: 2.5 },
  { date: "Oct 08", you: 1.1, them: 3.1 },
  { date: "Oct 15", you: 0.8, them: 4.5 },
  { date: "Oct 22", you: 1.0, them: 6.2 },
  { date: "Oct 29", you: 0.5, them: 12.4 },
];

const mockLengthData = [
  { date: "Oct 01", length: 45 },
  { date: "Oct 08", length: 42 },
  { date: "Oct 15", length: 30 },
  { date: "Oct 22", length: 15 },
  { date: "Oct 29", length: 8 },
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen p-6 md:p-8 max-w-[1280px] mx-auto space-y-8">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-text-secondary hover:text-teal transition-colors">
            <i className="fa-solid fa-house" />
          </Link>
          <span className="text-border">/</span>
          <h1 className="text-2xl font-display font-bold text-text-primary">
            Analysis Results
          </h1>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" onClick={() => alert('Share feature coming soon!')}>
            <i className="fa-solid fa-share-nodes mr-2" /> Share
          </Button>
          <Button variant="primary" size="sm" onClick={() => alert('Export feature coming soon!')}>
            <i className="fa-solid fa-download mr-2" /> Export Report
          </Button>
        </div>
      </header>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="metric" hoverEffect>
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Interest Score</h3>
              <p className="text-xs text-text-muted">Out of 100</p>
            </div>
            <i className="fa-solid fa-heart-pulse text-teal text-xl" />
          </div>
          <div className="flex justify-center flex-1 items-center">
            <ScoreRing score={38} size={110} strokeWidth={8} />
          </div>
        </Card>

        <Card variant="metric" hoverEffect>
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Initiation Ratio</h3>
              <p className="text-xs text-text-muted">Who texts first</p>
            </div>
            <i className="fa-solid fa-hand text-teal text-xl" />
          </div>
          <div className="flex flex-col justify-center flex-1 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue font-medium">You (82%)</span>
                <span className="text-text-muted">Them (18%)</span>
              </div>
              <div className="w-full h-3 bg-surface rounded-full overflow-hidden flex">
                <div className="h-full bg-blue" style={{ width: "82%" }} />
                <div className="h-full bg-border" style={{ width: "18%" }} />
              </div>
            </div>
            <Badge variant="redFlag" className="w-fit">Highly Imbalanced</Badge>
          </div>
        </Card>

        <Card variant="metric" hoverEffect>
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Avg Response</h3>
              <p className="text-xs text-text-muted">Over last 30 days</p>
            </div>
            <i className="fa-solid fa-clock text-teal text-xl" />
          </div>
          <div className="flex flex-col justify-center flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-mono font-medium text-text-primary">12.4</span>
              <span className="text-text-secondary">hrs</span>
            </div>
            <p className="text-red text-sm mt-2 flex items-center gap-1">
              <i className="fa-solid fa-arrow-trend-up" /> +4.2 hrs this week
            </p>
          </div>
        </Card>

        <Card variant="metric" hoverEffect>
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">More Invested</h3>
              <p className="text-xs text-text-muted">Based on effort</p>
            </div>
            <i className="fa-solid fa-scale-unbalanced text-teal text-xl" />
          </div>
          <div className="flex flex-col justify-center flex-1 items-center">
            <span className="text-4xl font-display font-bold text-text-primary">You</span>
            <p className="text-text-muted text-sm mt-2 text-center">By a significant margin.</p>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponseTimeChart data={mockResponseData} />
        <MessageLengthChart data={mockLengthData} />
      </div>

      {/* AI Insight Card */}
      <Card variant="insight" className="p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-teal/10 p-3 rounded-xl border border-teal/20">
                <i className="fa-solid fa-brain text-teal text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-text-primary">AI Verdict</h2>
                <p className="text-text-secondary">GPT-4o Analysis</p>
              </div>
            </div>
            
            <blockquote className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed bg-black/20 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red" />
              "You are initiating 82% of conversations, and their response time has increased 10x over the last month. Their messages have dwindled from thoughtful paragraphs to single words. It's time to pack it up."
            </blockquote>
          </div>
          
          <div className="w-full lg:w-80 space-y-4 bg-bg-primary/50 p-6 rounded-2xl border border-border">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">Detected Patterns</h3>
            <div className="flex flex-col gap-3">
              <Badge variant="redFlag" icon="fa-solid fa-arrow-trend-down" className="w-full justify-start py-2">
                Declining message length
              </Badge>
              <Badge variant="redFlag" icon="fa-solid fa-clock" className="w-full justify-start py-2">
                Response gap > 24hrs
              </Badge>
              <Badge variant="warning" icon="fa-solid fa-face-meh" className="w-full justify-start py-2">
                Low emoji usage (Them)
              </Badge>
              <Badge variant="neutral" icon="fa-solid fa-comment-slash" className="w-full justify-start py-2">
                Zero questions asked (Them)
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
