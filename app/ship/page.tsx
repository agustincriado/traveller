// app/ship/page.tsx
'use client';

import { useState, useEffect } from 'react';

type Ship = {
  name: string;
  model: string;
  hullTons: number;
  jumpRating: number;
  maneuverRating: number;
  powerPlant: number;
  fuelCapacity: number;
  currentFuel: number;
  cargoSpace: number;
};

const defaultShip: Ship = {
  name: 'The Cyclops',
  model: 'Far Trader',
  hullTons: 100,
  jumpRating: 2,
  maneuverRating: 2,
  powerPlant: 90,
  fuelCapacity: 4,
  currentFuel: 4,
  cargoSpace: 50,
};
let didInit = false;
export default function ShipPage() {
  const [ship, setShip] = useState<Ship>(defaultShip);

  function fetchStored () {
    didInit = true
    const stored = window.localStorage.getItem('ship')
    if (stored) setShip(JSON.parse(stored))
  }
  useEffect(() => {
    if (typeof window !== undefined && !didInit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStored()
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem('ship', JSON.stringify(ship))
  }, [ship]);

  const updateField = (field: keyof Ship, value: string) => {
    const numberValue = Number(value)
    if (!isNaN(numberValue)) {
      setShip({ ...ship, [field]: numberValue })
    }
  };

  const fuelPercent = ((ship.currentFuel / ship.fuelCapacity) * 100).toFixed(0);
  const canJump = ship.currentFuel >= ship.hullTons * 0.1 * ship.jumpRating;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateField(name as keyof Ship, value)
  }
  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Ship Management</h1>

      <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md space-y-4">
        <div>
          <label className='block font-semibold mb-1'>Ship Name</label>
          <input
            type='text'
            value={ship.name}
            onChange={(e) => setShip({ ...ship, name: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block font-semibold mb-1'>Hull (tons)</label>
            <input
              type='number'
              value={ship.hullTons}
              name='hullTons'
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className='block font-semibold mb-1'>Jump Rating</label>
            <input
              type='number'
              name='jumpRating'
              value={ship.jumpRating}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className='block font-semibold mb-1'>Maneuver Rating</label>
            <input
              type='number'
              name='maneuverRating'
              value={ship.maneuverRating}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className='block font-semibold mb-1'>Power Plant</label>
            <input
              type='number'
              name='powerPlant'
              value={ship.powerPlant}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className='block font-semibold mb-1'>Fuel Capacity</label>
            <input
              type='number'
              name='fuelCapacity'
              value={ship.fuelCapacity}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className='block font-semibold mb-1'>Current Fuel</label>
            <input
              type='number'
              name='currentFuel'
              value={ship.currentFuel}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className='block font-semibold mb-1'>Cargo Space</label>
            <input
              type='number'
              name='cargoSpace'
              value={ship.cargoSpace}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      <div className='mt-6 bg-gray-50 p-4 rounded-lg shadow-inner space-y-2 dark:text-gray-100 dark:bg-gray-800'>
        <h2 className='text-xl font-semibold'>Derived Stats</h2>
        <p>Fuel: {ship.currentFuel} / {ship.fuelCapacity} ({fuelPercent}%)</p>
        <p>Jump Readiness: {canJump ? '✅ Jump possible' : '❌ Not enough fuel'}</p>
      </div>
    </div>
  );
}
