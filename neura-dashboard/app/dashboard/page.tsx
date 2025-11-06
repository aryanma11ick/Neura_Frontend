"use client";

import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { Calendar, LogOut, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading your dashboard...
      </div>
    );
  }

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
          >
            Welcome, {session.user?.name?.split(" ")[0]} 👋
          </motion.h1>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <InfoCard
            icon={<Calendar className="text-indigo-500 w-6 h-6" />}
            title="Linked Google Account"
            value={session.user?.email ?? "Not linked"}
          />
          <InfoCard
            icon={<Clock className="text-purple-500 w-6 h-6" />}
            title="Next Event"
            value="Fetching from Google Calendar..."
          />
          <InfoCard
            icon={<Plus className="text-pink-500 w-6 h-6" />}
            title="Quick Action"
            value="Add new meeting"
            actionLabel="Create"
            onAction={() => alert("Coming soon!")}
          />
        </motion.div>

        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Card className="border border-border/50 bg-card/70 backdrop-blur-sm shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Today’s Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-sm">
                Your calendar events will appear here once connected.
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={() => alert("Syncing soon...")}>
                  Refresh Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

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
