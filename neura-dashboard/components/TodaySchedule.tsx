"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarEvent } from "@/lib/types";
import EventCard from "./EventCard";
import EventDetailModal from "./EventDetailModal";
import { useState } from "react";

export default function TodaySchedule({
  selectedDate,
  events,
}: {
  selectedDate: Date;
  events: CalendarEvent[];
}) {
  const [openForEventId, setOpenForEventId] = useState<string | null>(null);

  const dateLabel = selectedDate.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  function openEvent(evId: string) {
    setOpenForEventId(evId);
  }

  function closeModal() {
    setOpenForEventId(null);
  }

  const eventToShowInModal = events?.filter(e => e.id === openForEventId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Schedule for</div>
          <div className="text-2xl font-semibold">{dateLabel}</div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-3">
        {events.length === 0 ? (
          <div className="card">No events for this day.</div>
        ) : (
          events.map((ev) => (
            <div key={ev.id} onClick={() => openEvent(ev.id)} className="cursor-pointer">
              <EventCard event={ev} />
            </div>
          ))
        )}
      </motion.div>

      <AnimatePresence>{openForEventId && eventToShowInModal && eventToShowInModal.length > 0 && (
        <EventDetailModal events={eventToShowInModal} initialOpen={true} onClose={closeModal} />
      )}</AnimatePresence>
    </div>
  );
}
