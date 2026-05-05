"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full max-w-[1280px] mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center border border-teal/20">
            <i className="fa-solid fa-ghost text-teal text-xl" />
          </div>
          <span className="font-display font-bold text-xl tracking-wide">Ghosted.AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <a href="#how-it-works" className="hover:text-teal transition-colors">How It Works</a>
          <a href="#features" className="hover:text-teal transition-colors">Features</a>
          <a href="#faq" className="hover:text-teal transition-colors">FAQ</a>
        </div>
        <Link href="/upload">
          <Button variant="secondary" size="sm" className="hidden md:flex">Try Now</Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl space-y-8 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-medium text-text-secondary mb-4">
            <span className="flex h-2 w-2 rounded-full bg-teal animate-pulse" />
            Gemini Powered Analysis
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tight">
            Turning emotional damage <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue">into analytics.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
            Upload your chat exports. Get a brutally honest, data-backed analysis of your situationship.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/upload">
              <Button size="lg" className="w-full sm:w-auto text-lg group">
                Analyze My Chat
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-text-muted mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2">
              <i className="fa-solid fa-shield-halved" /> 100% Private & Local
            </p>
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-bg-secondary/50 border-y border-border">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-text-secondary">Three steps to finding out the truth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
            
            {[
              { icon: "fa-file-arrow-up", title: "1. Upload Chat", desc: "Export your chat from WhatsApp and upload the .txt file securely." },
              { icon: "fa-brain", title: "2. AI Analyzes", desc: "Our engine computes response times, initiation ratios, and emotional context." },
              { icon: "fa-chart-line", title: "3. Get The Truth", desc: "Receive a detailed dashboard and a brutally honest AI verdict." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative bg-surface border border-border p-8 rounded-3xl flex flex-col items-center text-center backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-bg-primary border border-teal/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,229,192,0.1)] relative z-10">
                  <i className={`fa-solid ${step.icon} text-2xl text-teal`} />
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{step.title}</h3>
                <p className="text-text-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Features</h2>
            <p className="text-text-secondary">Everything you need to overanalyze your conversations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "fa-clock", title: "Response Time Tracking", desc: "See exactly how long it takes them to text back over time." },
              { icon: "fa-scale-unbalanced", title: "Investment Ratio", desc: "Find out who is actually carrying the conversation." },
              { icon: "fa-flag", title: "Red Flag Detection", desc: "Automated alerts for ghosting signals and fading interest." },
              { icon: "fa-brain", title: "AI Brutal Honesty", desc: "Gemini delivers the truth you probably don't want to hear." }
            ].map((feature, i) => (
              <div key={i} className="bg-surface border border-border p-6 rounded-2xl hover:border-teal/50 transition-colors">
                <i className={`fa-solid ${feature.icon} text-2xl text-teal mb-4`} />
                <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-bg-secondary/50 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-text-secondary">Because we know you're overthinking this.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is my chat data saved?", a: "No. Your chat is processed in memory and immediately discarded. We don't have a database, and we couldn't read your chats even if we wanted to." },
              { q: "What chat platforms are supported?", a: "Currently, we only support WhatsApp .txt exports (without media). We're working on adding iMessage and Telegram support soon." },
              { q: "How accurate is the AI?", a: "It's powered by Gemini, which is scarily good at reading between the lines. But remember, it's just an AI—don't make major life decisions based solely on its roast." }
            ].map((faq, i) => (
              <div key={i} className="bg-surface border border-border p-6 rounded-2xl">
                <h3 className="font-medium text-lg mb-2 text-text-primary">{faq.q}</h3>
                <p className="text-text-secondary">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-text-muted border-t border-border mt-auto">
        <p className="flex items-center justify-center gap-2">
          Built with <i className="fa-solid fa-heart text-red" /> by someone who was also left on read.
        </p>
      </footer>
    </main>
  );
}
