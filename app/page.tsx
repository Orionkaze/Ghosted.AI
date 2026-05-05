"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { useEffect, useState } from "react";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(75);
      setScore(72);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto space-y-12">
      <header className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-display font-bold text-text-primary drop-shadow-[0_0_15px_rgba(240,246,255,0.2)]">
          Ghosted.AI Components
        </h1>
        <p className="text-xl text-text-secondary">21st.dev inspired premium UI elements</p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-semibold border-b border-border pb-2">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="primary">Analyze My Chat</Button>
          <Button variant="secondary">Secondary Action</Button>
          <Button variant="danger">Clear Data</Button>
          <Button variant="icon" icon="fa-solid fa-share-nodes" />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-semibold border-b border-border pb-2">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="neutral" icon="fa-solid fa-chart-line">Trending</Badge>
          <Badge variant="redFlag" icon="fa-solid fa-flag">Left on read</Badge>
          <Badge variant="success" icon="fa-solid fa-check">Healthy</Badge>
          <Badge variant="warning" icon="fa-solid fa-triangle-exclamation">Low Effort</Badge>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-semibold border-b border-border pb-2">Progress</h2>
        <div className="max-w-md">
          <ProgressBar progress={progress} />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-semibold border-b border-border pb-2">Cards & Score</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="metric" hoverEffect>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-text-secondary">Interest Score</h3>
              <i className="fa-solid fa-heart-pulse text-teal text-xl" />
            </div>
            <div className="flex justify-center py-4">
              <ScoreRing score={score} size={140} />
            </div>
          </Card>

          <Card variant="insight" hoverEffect className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal/10 p-3 rounded-xl">
                  <i className="fa-solid fa-brain text-teal text-xl" />
                </div>
                <h3 className="text-xl font-display font-bold">AI Insight</h3>
              </div>
              <p className="text-text-primary text-lg italic bg-black/20 p-4 rounded-xl border border-white/5">
                "You text first. They reply eventually. Classic situationship energy."
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="redFlag">Response time +3x</Badge>
              <Badge variant="warning">They initiate 18%</Badge>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
