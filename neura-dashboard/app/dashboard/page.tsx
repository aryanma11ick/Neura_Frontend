"use client";

import Navbar from "@/components/Navbar";
import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";
import TodaySchedule from "@/components/TodaySchedule";
import MonthCalendar from "@/components/MonthCalendar";
import { useEventsForRange } from "@/lib/hooks/useEvents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Always define hooks first (no conditional hooks)
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Month & day ranges
  const monthStart = useMemo(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
    [selectedDate]
  );
  const monthEnd = useMemo(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59),
    [selectedDate]
  );
  const dayStart = new Date(selectedDate);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(selectedDate);
  dayEnd.setHours(23, 59, 59, 999);

  // Fetch events
  const { events: monthEvents } = useEventsForRange(
    monthStart.toISOString(),
    monthEnd.toISOString()
  );
  const { events: dayEvents } = useEventsForRange(
    dayStart.toISOString(),
    dayEnd.toISOString()
  );

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") window.location.href = "/login";
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center text-muted-foreground">
        Loading your dashboard...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* --- Top Welcome Header --- */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Welcome back, {session.user?.name?.split(" ")[0]} 👋
        </motion.h1>

        {/* --- Info Cards Row --- */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <InfoCard
            icon={<Calendar className="text-indigo-500 w-5 h-5" />}
            title="Your Email"
            value={session.user?.email ?? "Not linked"}
          />
          <InfoCard
            icon={<Clock className="text-purple-500 w-5 h-5" />}
            title="Next Meeting"
            value={getNextMeeting(dayEvents)}
          />
          <InfoCard
            icon={<Plus className="text-pink-500 w-5 h-5" />}
            title="Quick Actions"
            value="Add a new meeting"
            actionLabel="Create"
            onAction={() => alert("Add new meeting modal coming soon!")}
          />
        </motion.div>

        {/* --- Main Grid: Schedule + Calendar --- */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Today’s Schedule */}
          <div className="w-full lg:w-[40%]">
            <TodaySchedule selectedDate={selectedDate} events={dayEvents} />
          </div>

          {/* Right: Month Calendar */}
          <div className="flex-1">
            <MonthCalendar
              events={monthEvents}
              selectedDate={selectedDate}
              onSelectDate={(d) => setSelectedDate(d)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------- InfoCard Component -------------------- */
function InfoCard({
  icon,
  title,
  value,
  actionLabel,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Card className="bg-card/70 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
        </div>
        {actionLabel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAction}
            className="text-xs text-primary hover:text-primary/80"
          >
            {actionLabel}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-base font-medium">{value}</p>
      </CardContent>
    </Card>
  );
}

/* -------------------- Helper: Next Meeting -------------------- */
function getNextMeeting(events: any[]) {
  if (!events?.length) return "No meetings today";
  const now = new Date();
  const upcoming = events.find((e: any) => new Date(e.start) > now);
  if (!upcoming) return "No more meetings today";

  const start = new Date(upcoming.start);
  return `${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} — ${upcoming.summary}`;
}
