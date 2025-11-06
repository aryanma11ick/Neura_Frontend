// lib/types.ts

export interface CalendarEvent {
  id: string;                // Unique event ID (from DB or Google)
  summary: string;           // Event title
  description?: string;      // Optional event description
  start: string;             // ISO string start datetime
  end: string;               // ISO string end datetime
  meet_link?: string;        // Optional Google Meet link
  location?: string;         // Optional location
  created_at?: string;       // Optional creation date
  updated_at?: string;       // Optional update date
}
