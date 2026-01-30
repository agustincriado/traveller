"use client";

import { useEffect, useState } from "react";

type Ship = {
  name: string;
  hullTons: number;
  jumpRating: number;
  maneuverRating: number;
  powerPlant: number;
  jumpDistance:  number;
  fuelCapacity: number;
  currentFuel: number;
  cargoSpace: number;
};
const defaultShip: Ship = {
  name: 'SS Explorer',
  hullTons: 100,
  jumpRating: 2,
  maneuverRating: 2,
  jumpDistance: 5,
  powerPlant: 5,
  fuelCapacity: 50,
  currentFuel: 50,
  cargoSpace: 30,
};
let didInit = false;
export default function JumpPage() {
  const [ship, setShip] = useState<Ship>(defaultShip);
  const [jumpDistance, setJumpDistance] = useState(1);

  function fetchStored () {
    const stored = localStorage.getItem('ship')
      if (stored) setShip(JSON.parse(stored))
  }
  useEffect(() => {
    if (!didInit) {
      didInit = true
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStored()
    }
  }, [])

  if (!ship) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Jump Calculator</h1>
        <p className="mt-4 opacity-80">
          No ship data found. Please configure a ship first.
        </p>
      </div>
    );
  }

  // Traveller rule of thumb: 10% hull per jump number
  const fuelNeeded = ship.hullTons * 0.1 * jumpDistance;
  const hasFuel = ship.currentFuel >= fuelNeeded;
  const hasJumpDrive = ship.jumpRating >= jumpDistance;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Jump Calculator</h1>

      {/* Ship Summary */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
        <h2 className="text-xl font-semibold">{ship.name}</h2>
        <p>Hull: {ship.hullTons} tons</p>
        <p>Jump Rating: J-{ship.jumpRating}</p>
        <p>
          Fuel: {ship.currentFuel} / {ship.fuelCapacity} tons
        </p>
      </div>

      {/* Jump Selection */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Jump Parameters</h2>

        <label className="block">
          Jump Distance (parsecs)
          <input
            type="number"
            min={1}
            max={6}
            value={jumpDistance}
            onChange={(e) => setJumpDistance(Number(e.target.value))}
            className="mt-1 w-full p-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600"
          />
        </label>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-inner space-y-2">
        <h2 className="text-xl font-semibold">Jump Check</h2>

        <p>
          Fuel required:{" "}
          <strong>{fuelNeeded.toFixed(1)} tons</strong>
        </p>

        <p>
          Fuel available:{" "}
          <strong>{ship.currentFuel} tons</strong>
        </p>

        <p>
          Jump Drive:{" "}
          {hasJumpDrive ? "✅ Sufficient" : "❌ Insufficient"}
        </p>

        <p>
          Fuel Check:{" "}
          {hasFuel ? "✅ Sufficient" : "❌ Insufficient"}
        </p>

        <p className="mt-2 font-semibold">
          Result:{" "}
          {hasFuel && hasJumpDrive ? (
            <span className="text-green-600 dark:text-green-400">
              Jump possible
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400">
              Jump not possible
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
