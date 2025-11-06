"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/lib/types";
import { X, ExternalLink, Trash2, Edit } from "lucide-react";

export default function EventDetailModal({
  events,
  initialOpen,
  onClose,
}: {
  events: CalendarEvent[]; // events for the selected day (or single event)
  initialOpen?: boolean;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(Boolean(initialOpen));
  useEffect(() => setOpen(Boolean(initialOpen)), [initialOpen]);

  function close() {
    setOpen(false);
    onClose?.();
  }

  if (!events || events.length === 0) return null;

  const first = events[0];

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) onClose?.(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{first.summary}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {first.description ?? "No description"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {events.map((ev) => (
            <div key={ev.id} className="p-3 bg-card/50 border border-border/30 rounded-md">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(ev.start).toLocaleString()} — {new Date(ev.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div className="font-medium mt-1">{ev.summary}</div>
                  {ev.attendees && ev.attendees.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Attendees: {ev.attendees.map((a) => a.email ?? a.displayName).join(", ")}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  {ev.meet_link && (
                    <a href={ev.meet_link} target="_blank" rel="noreferrer" className="text-sm underline flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" /> Join
                    </a>
                  )}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                    <Button variant="outline" size="sm" className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={close}><X className="w-4 h-4" /> Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
