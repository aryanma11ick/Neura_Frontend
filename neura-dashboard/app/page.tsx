"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageCircle, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mt-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Neura Assistant
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Your personal AI assistant on WhatsApp that manages your schedule,
          creates meetings, and syncs seamlessly with Google Calendar.
        </p>

        <Link href="/login">
          <Button
            size="lg"
            className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-5xl"
      >
        <FeatureCard
          icon={<MessageCircle className="w-8 h-8 text-indigo-500" />}
          title="Chat on WhatsApp"
          desc="Create events, get reminders, and ask for your schedule using natural language."
        />
        <FeatureCard
          icon={<Calendar className="w-8 h-8 text-purple-500" />}
          title="Google Calendar Sync"
          desc="Everything stays in sync automatically — no app switching needed."
        />
        <FeatureCard
          icon={<Zap className="w-8 h-8 text-pink-500" />}
          title="Smart Reminders"
          desc="Get notified on WhatsApp before your meetings or important tasks."
        />
      </motion.div>

      {/* Footer */}
      <footer className="mt-24 text-sm text-muted-foreground pb-10">
        © {new Date().getFullYear()} <span className="font-medium">Neura Assistant</span> ·
        Built with ❤️ using FastAPI + Next.js
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="transition-transform"
    >
      <Card className="bg-card/70 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-md transition">
        <CardHeader>
          <div className="mb-2 flex items-center justify-center">{icon}</div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
