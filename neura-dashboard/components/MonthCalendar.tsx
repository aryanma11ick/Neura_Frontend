"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventDetailModal from "./EventDetailModal";
import { CalendarEvent } from "@/lib/types";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

type DayCell = { date: Date; inMonth: boolean };

export default function MonthCalendar({
  events,
  selectedDate,
  onSelectDate,
}: {
  events: CalendarEvent[]; // all events within the month
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
}) {
  const [cursor, setCursor] = useState(() => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  const [openModalFor, setOpenModalFor] = useState<Date | null>(null);

  // map dateKey -> events[]
  const eventsByDay = useMemo(() => {
    const m = new Map<string, CalendarEvent[]>();
    (events || []).forEach((ev) => {
      const key = new Date(ev.start).toISOString().slice(0, 10);
      const arr = m.get(key) ?? [];
      arr.push(ev);
      m.set(key, arr);
    });
    return m;
  }, [events]);

  const grid: DayCell[] = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);

    const startDay = first.getDay();
    const daysInMonth = last.getDate();

    const cells: DayCell[] = [];
    const prevMonthLast = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLast - i);
      cells.push({ date: d, inMonth: false });
    }

    for (let d = 1; d <= daysInMonth; d++) cells.push({ date: new Date(year, month, d), inMonth: true });

    while (cells.length % 7 !== 0) {
      const nextIndex = cells.length - (startDay + daysInMonth);
      const d = new Date(year, month + 1, nextIndex + 1);
      cells.push({ date: d, inMonth: false });
    }

    return cells;
  }, [cursor]);

  function prevMonth() { setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1)); }
  function nextMonth() { setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1)); }

  function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  const monthLabel = cursor.toLocaleString(undefined, { month: "long", year: "numeric" });

  return (
    <div>
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={prevMonth} className="p-2 rounded hover:bg-gray-100/20"><ChevronLeft /></button>
          <div className="text-sm font-medium">{monthLabel}</div>
          <button onClick={nextMonth} className="p-2 rounded hover:bg-gray-100/20"><ChevronRight /></button>
        </div>

        <div className="grid grid-cols-7 text-xs text-muted-foreground mb-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d)=>(
            <div key={d} className="text-center py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {grid.map((cell) => {
            const key = cell.date.toISOString().slice(0,10);
            const dayEvents = eventsByDay.get(key) ?? [];
            const selected = isSameDay(cell.date, selectedDate);

            // a small visual dot palette (up to 3 colors)
            const dots = dayEvents.slice(0, 3).map((e, i) => <span key={e.id} className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: ['#6366F1','#7C3AED','#06B6D4'][i%3] }} />);

            return (
              <div key={key}>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      onClick={() => { onSelectDate(new Date(cell.date)); setOpenModalFor(new Date(cell.date)); }}
                      className={[
                        "p-2 text-left rounded-md w-full h-24 flex flex-col justify-between",
                        cell.inMonth ? "" : "text-muted-foreground opacity-60",
                        selected ? "border-2 border-indigo-400 bg-indigo-50/30" : "hover:bg-gray-100/20"
                      ].join(" ")}
                    >
                      <div className="flex justify-between items-start">
                        <div className="text-sm font-medium">{cell.date.getDate()}</div>
                        {dayEvents.length > 0 && <div className="text-xs px-2 py-0.5 rounded-full bg-indigo-600 text-white">{dayEvents.length}</div>}
                      </div>

                      <div className="text-xs mt-1 text-muted-foreground line-clamp-3">
                        {dayEvents.slice(0, 2).map((e)=>(
                          <div key={e.id} className="truncate">{new Date(e.start).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} • {e.summary}</div>
                        ))}
                      </div>

                      <div className="mt-1">{dots}</div>
                    </button>
                  </PopoverTrigger>

                  <PopoverContent className="w-64">
                    <div className="space-y-2">
                      {dayEvents.length === 0 ? (
                        <div className="text-sm text-muted-foreground">No events</div>
                      ) : (
                        dayEvents.map((ev)=>(
                          <div key={ev.id} className="p-2 border rounded-md bg-card/30">
                            <div className="text-sm font-medium">{ev.summary}</div>
                            <div className="text-xs text-muted-foreground">{new Date(ev.start).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} — {ev.location ?? ''}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event modal: open for the selected day */}
      {openModalFor && (
        <EventDetailModal
          events={eventsByDay.get(openModalFor.toISOString().slice(0,10)) ?? []}
          initialOpen={true}
          onClose={() => setOpenModalFor(null)}
        />
      )}
    </div>
  );
}
