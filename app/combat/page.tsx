"use client";

import { useEffect, useState } from "react";

type CombatState = {
  hull: number;
  maxHull: number;
  armor: number;
  maneuverPower: number;
  weaponPower: number;
  criticals: string[];
};

const DEFAULT_CRITICALS = [
  "Sensors damaged",
  "Power plant hit",
  "Jump drive offline",
  "Maneuver drive damaged",
  "Weapon system disabled",
];

const defaultCombatState: CombatState = {
  hull: 40,
  maxHull: 40,
  armor: 4,
  maneuverPower: 2,
  weaponPower: 3,
  criticals: [],
};
let didInit = false;

export default function CombatPage() {
  const [combat, setCombat] = useState<CombatState>(defaultCombatState);
  function fetchStored () {
    didInit = true
    const stored = window.localStorage.getItem('combat')
      if (stored) setCombat(JSON.parse(stored))
  }
  useEffect(() => {
    if (typeof window !== undefined && !didInit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStored()
    }
  }, [combat]);

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCombat((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const toggleCritical = (crit: string) => {
    setCombat((prev) => ({
      ...prev,
      criticals: prev.criticals.includes(crit)
        ? prev.criticals.filter((c) => c !== crit)
        : [...prev.criticals, crit],
    }));
  };

  const hullPercent = Math.max(
    0,
    Math.round((combat.hull / combat.maxHull) * 100)
  );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Combat Tracker</h1>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Hull & Armor</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Current Hull</label>
            <input
              type="number"
              name="hull"
              value={combat.hull}
              onChange={handleNumberChange}
              className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Max Hull</label>
            <input
              type="number"
              name="maxHull"
              value={combat.maxHull}
              onChange={handleNumberChange}
              className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Armor</label>
            <input
              type="number"
              name="armor"
              value={combat.armor}
              onChange={handleNumberChange}
              className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <p className="text-sm opacity-80">
          Hull Integrity: <strong>{hullPercent}%</strong>
        </p>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Power Allocation</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Maneuver Power</label>
            <input
              type="number"
              name="maneuverPower"
              value={combat.maneuverPower}
              onChange={handleNumberChange}
              className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Weapon Power</label>
            <input
              type="number"
              name="weaponPower"
              value={combat.weaponPower}
              onChange={handleNumberChange}
              className="w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow space-y-3">
        <h2 className="text-xl font-semibold">Critical Hits</h2>

        {DEFAULT_CRITICALS.map((crit) => (
          <label
            key={crit}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={combat.criticals.includes(crit)}
              onChange={() => toggleCritical(crit)}
              className="accent-red-600"
            />
            <span>{crit}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
