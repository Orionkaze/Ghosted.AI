"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { ResponseTimeChart } from "@/components/charts/ResponseTimeChart";
import { MessageLengthChart } from "@/components/charts/MessageLengthChart";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("ghosted_ai_results");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse results");
      }
    } else {
      router.push("/upload");
    }
  }, [router]);

  if (!data) return <div className="min-h-screen flex items-center justify-center font-mono text-teal">Loading analysis...</div>;

  const { metrics, participants, analysis, trends } = data;
  const userA = metrics.userA;
  const userB = metrics.userB;

  const interestScore = analysis.interest_score || 50;
  const moreInvested = analysis.more_invested || participants.A;
  const ghostingSigns = analysis.ghosting_signs || [];
  const aiSummary = analysis.summary || "No summary available.";

  const initYou = userA.initiationPercentage || 50;
  const initThem = userB.initiationPercentage || 50;

  return (
    <main className="min-h-screen p-6 md:p-8 max-w-[1280px] mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-text-secondary hover:text-teal transition-colors">
            <i className="fa-solid fa-house" />
          </Link>
          <span className="text-border">/</span>
          <h1 className="text-2xl font-display font-bold text-text-primary">
            Analysis Results
          </h1>
          <Badge variant="neutral" className="ml-2 font-mono lowercase">vs {participants.B}</Badge>
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
            <ScoreRing score={interestScore} size={110} strokeWidth={8} />
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
                <span className="text-blue font-medium">You ({initYou}%)</span>
                <span className="text-text-muted">Them ({initThem}%)</span>
              </div>
              <div className="w-full h-3 bg-surface rounded-full overflow-hidden flex">
                <div className="h-full bg-blue" style={{ width: `${initYou}%` }} />
                <div className="h-full bg-border" style={{ width: `${initThem}%` }} />
              </div>
            </div>
            {initYou > 70 ? (
              <Badge variant="redFlag" className="w-fit">Highly Imbalanced</Badge>
            ) : initYou >= 40 && initYou <= 60 ? (
              <Badge variant="success" className="w-fit">Balanced</Badge>
            ) : null}
          </div>
        </Card>

        <Card variant="metric" hoverEffect>
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Avg Response</h3>
              <p className="text-xs text-text-muted">Their delay</p>
            </div>
            <i className="fa-solid fa-clock text-teal text-xl" />
          </div>
          <div className="flex flex-col justify-center flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-mono font-medium text-text-primary">{userB.avgResponseTimeHours}</span>
              <span className="text-text-secondary">hrs</span>
            </div>
            <p className="text-text-muted text-sm mt-2 flex items-center gap-1">
              vs your {userA.avgResponseTimeHours} hrs
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
            <span className="text-3xl font-display font-bold text-text-primary truncate w-full text-center">{moreInvested}</span>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponseTimeChart data={trends?.responseTime || []} />
        <MessageLengthChart data={trends?.messageLength || []} />
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
                <p className="text-text-secondary">Gemini Analysis</p>
              </div>
            </div>
            
            <blockquote className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed bg-black/20 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-teal" />
              "{aiSummary}"
            </blockquote>
          </div>
          
          <div className="w-full lg:w-80 space-y-4 bg-bg-primary/50 p-6 rounded-2xl border border-border">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">Detected Patterns</h3>
            <div className="flex flex-col gap-3">
              {ghostingSigns.map((sign: string, idx: number) => (
                <Badge key={idx} variant="redFlag" icon="fa-solid fa-flag" className="w-full justify-start py-2 whitespace-normal text-left h-auto">
                  {sign}
                </Badge>
              ))}
              {ghostingSigns.length === 0 && (
                <p className="text-sm text-text-muted italic">No major red flags detected... yet.</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
