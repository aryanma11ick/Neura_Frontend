"use client";

import { CalendarEvent } from "@/lib/types";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

export default function EventCard({ event }: { event: CalendarEvent }) {
  const start = new Date(event.start);
  const end = new Date(event.end);

  const timeRange = `${start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })} – ${end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="p-4 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl shadow-sm hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-base">{event.summary}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {event.description || "No description"}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
            <Clock className="w-4 h-4" />
            <span>{timeRange}</span>
          </div>
        </div>

        {event.meet_link ? (
          <a
            href={event.meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-500 underline hover:text-indigo-600"
          >
            Join Meet
          </a>
        ) : (
          <Calendar className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </motion.div>
  );
}
