"use client";

import { useMemo, useState } from "react";

import EventCards from "@/components/EventCards";
import SearchSection from "@/components/SearchSection";
import { EVENTS, Event } from "@/lib/events";
import {
  CategoryFilter,
  DEFAULT_CATEGORY,
} from "@/lib/eventFilters";

const POPULAR_LIMIT = 4;

function matchesQuery(event: Event, query: string): boolean {
  const haystack = `${event.title} ${event.location} ${event.category}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export default function EventExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(DEFAULT_CATEGORY);

  const trimmedQuery = query.trim();
  const isFiltering = trimmedQuery.length > 0 || category !== DEFAULT_CATEGORY;

  const filteredEvents = useMemo(() => {
    if (!isFiltering) return EVENTS;

    return EVENTS.filter((event) => {
      const matchesCategory =
        category === DEFAULT_CATEGORY || event.category === category;
      const matchesSearch =
        trimmedQuery.length === 0 || matchesQuery(event, trimmedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [category, trimmedQuery, isFiltering]);

  const visibleEvents = isFiltering ? filteredEvents : filteredEvents.slice(0, POPULAR_LIMIT);

  const subtitle = useMemo(() => {
    if (!isFiltering) return undefined;
    const count = filteredEvents.length;
    const eventLabel = count === 1 ? "event" : "event";
    if (trimmedQuery && category !== DEFAULT_CATEGORY) {
      return `Menampilkan ${count} ${eventLabel} untuk "${trimmedQuery}" di kategori ${category}`;
    }
    if (trimmedQuery) {
      return `Menampilkan ${count} ${eventLabel} untuk "${trimmedQuery}"`;
    }
    return `Menampilkan ${count} ${eventLabel} di kategori ${category}`;
  }, [filteredEvents.length, isFiltering, trimmedQuery, category]);

  const emptyDescription = useMemo(() => {
    if (trimmedQuery && category !== DEFAULT_CATEGORY) {
      return `Tidak ada event di kategori ${category} yang cocok dengan "${trimmedQuery}". Coba kata kunci lain atau pilih kategori berbeda.`;
    }
    if (trimmedQuery) {
      return `Tidak ada event yang cocok dengan "${trimmedQuery}". Coba kata kunci lain.`;
    }
    return "Belum ada event untuk kategori ini. Coba pilih kategori lain.";
  }, [trimmedQuery, category]);

  const handleReset = () => {
    setQuery("");
    setCategory(DEFAULT_CATEGORY);
  };

  return (
    <>
      <SearchSection
        value={query}
        onChange={setQuery}
        activeCategory={category}
        onCategoryChange={setCategory}
      />
      <EventCards
        events={visibleEvents}
        title={isFiltering ? "Hasil Pencarian" : "Event Populer"}
        subtitle={subtitle}
        showViewAll={!isFiltering}
        onReset={isFiltering ? handleReset : undefined}
        emptyTitle={isFiltering ? "Event tidak ditemukan" : undefined}
        emptyDescription={isFiltering ? emptyDescription : undefined}
      />
    </>
  );
}
