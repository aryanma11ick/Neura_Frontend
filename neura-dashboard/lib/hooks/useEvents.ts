"use client";

import useSWR from "swr";
import { apiGet } from "@/lib/api";
import type { CalendarEvent } from "@/lib/types";

/**
 * Fetch events between from (ISO) and to (ISO).
 * refreshInterval: 30s
 */
export function useEventsForRange(from?: string, to?: string) {
  const key = from && to ? ["/events", from, to] : null;
  const fetcher = () => apiGet("/events", from && to ? { from, to } : undefined);
  const { data, error, mutate, isValidating } = useSWR(key, fetcher, {
    refreshInterval: 30000,
  });

  return {
    events: (data ?? []) as CalendarEvent[],
    error,
    refresh: mutate,
    loading: isValidating,
  };
}
