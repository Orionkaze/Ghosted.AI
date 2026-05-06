"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ChatMessage {
  role: "user" | "coach";
  content: string;
}

export default function ActionPlanPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ghosted_ai_results");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setChatHistory([
          { role: "coach", content: `Hey! I'm your Ghosted.AI Coach. Based on your chat with ${parsed.participants.B}, here is your custom action plan. Have any opinions on my advice, or want to complain about how unfair texting rules are? Let me know!` }
        ]);
      } catch (e) {
        console.error("Failed to parse results");
      }
    } else {
      router.push("/upload");
    }
  }, [router]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  if (!data) return <div className="min-h-screen flex items-center justify-center text-teal font-mono">Loading coach...</div>;

  const actionPlan = data.analysis.action_plan || [
    { title: "No Action Plan Found", description: "You might need to re-upload your chat to generate a new action plan." }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newMsg: ChatMessage = { role: "user", content: inputValue };
    const updatedHistory = [...chatHistory, newMsg];
    
    setChatHistory(updatedHistory);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: newMsg.content,
          chatHistory: updatedHistory.slice(1), // Don't send the generic intro
          metrics: { participants: data.participants, analysis: data.analysis }
        })
      });
      
      const resData = await res.json();
      setChatHistory([...updatedHistory, { role: "coach", content: resData.reply }]);
    } catch (e) {
      setChatHistory([...updatedHistory, { role: "coach", content: "My brain short-circuited. Try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 md:p-8 max-w-[1280px] mx-auto space-y-8 animate-in fade-in duration-500 flex flex-col h-screen">
      <header className="flex items-center gap-3 pb-4 border-b border-border/50 shrink-0">
        <Link href="/results" className="text-text-secondary hover:text-teal transition-colors">
          <i className="fa-solid fa-arrow-left mr-2" /> Back to Analysis
        </Link>
        <span className="text-border">/</span>
        <h1 className="text-2xl font-display font-bold text-text-primary">
          Your Action Plan
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 pb-6">
        {/* Left Side: The Plan */}
        <div className="w-full lg:w-1/3 overflow-y-auto pr-2 space-y-4 hidden-scrollbar">
          <h2 className="text-xl font-medium text-text-primary mb-4 flex items-center gap-2">
            <i className="fa-solid fa-list-check text-teal" /> The Playbook
          </h2>
          {actionPlan.map((plan: any, idx: number) => (
            <Card key={idx} variant="default" hoverEffect className="p-5 border-l-4 border-l-teal">
              <h3 className="font-bold text-lg text-text-primary mb-2">{idx + 1}. {plan.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{plan.description}</p>
            </Card>
          ))}
        </div>

        {/* Right Side: Interactive Coach */}
        <div className="flex-1 bg-surface border border-border rounded-2xl flex flex-col overflow-hidden">
          <div className="bg-bg-primary/50 border-b border-border p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-teal/10 flex items-center justify-center border border-teal/20">
              <i className="fa-solid fa-robot text-teal"></i>
            </div>
            <div>
              <h3 className="font-bold text-text-primary">Ghosted Coach</h3>
              <p className="text-xs text-text-muted">Online & Ready to Roast</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 hidden-scrollbar">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-teal text-bg-primary rounded-tr-none' 
                  : 'bg-black/40 border border-white/5 text-text-primary rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-black/40 border border-white/5 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-teal animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-teal animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-teal animate-bounce delay-200" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-bg-primary/50 border-t border-border">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Give your opinion or ask for advice..."
                className="flex-1 bg-black/40 border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-teal/50 transition-colors"
                disabled={isLoading}
              />
              <Button type="submit" variant="primary" disabled={isLoading || !inputValue.trim()}>
                <i className="fa-solid fa-paper-plane" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
