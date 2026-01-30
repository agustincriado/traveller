// src/app/tables/page.tsx
"use client";

import Table from "@/components/Table";

import measurements from "@/data/tables/measurements.json";
import timeScales from "@/data/tables/timeScales.json";
import combatRanges from "@/data/tables/combatRanges.json";

export default function TablesPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Reference Tables</h1>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Measurements</h2>

        <Table
          title="Distance"
          rows={measurements.distance}
        />

        <Table
          title="Time"
          rows={measurements.time}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Time Scales</h2>

        <Table
          title="Personal Scale"
          rows={timeScales.personal}
        />

        <Table
          title="Ship Scale"
          rows={timeScales.ship}
        />

        <Table
          title="Campaign Scale"
          rows={timeScales.campaign}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Combat Ranges</h2>

        <Table
          title="Personal Combat"
          rows={combatRanges.personalCombat}
        />

        <Table
          title="Space Combat"
          rows={combatRanges.spaceCombat}
        />
      </section>
    </div>
  );
}
