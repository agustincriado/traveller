// app/ship/page.tsx
'use client';

import { useState, useEffect } from 'react';

type Sensor = {
  type: string,
  dm: number
}
type Drives = {
  MDrive: number,
  RDrive: number,
  JDrive: number,
}
type Cargo = {
  content: string,
  tons: number
}
type PowerRequirements = {
  basicShipSystems: number,
  manouvreDrive: number,
  jumpDrive: number,
  sensors: number,
  weapons: number,
  fillable1: number,
  fillable2: number,
  fillable3: number
}
type Weapon = {
  name: string,
  mount: string,
  tl: number,
  range: number,
  damage: number,
  ammo: number,
  traits: string
}
type Computer = {
  software: string,
  bandwith: number
}
type ShipSystem = 'Armour' | 'Bridge' | 'Cargo' | 'Crew' | 'Fuel' | 'Hull' | 'J-Drive' | 'M-Drive' | 'Power Plant' |'Sensors' | 'Weapons'
type HitLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6
type CriticalHits = {
  [system in ShipSystem]: HitLevel
}
type Ship = {
  name: string;
  hullPoints: number;
  armour: number;
  model: string;
  class: string;
  powerPoints: number;
  sensors: Sensor[];
  powerRequirements: PowerRequirements;
  powerPlant: number;
  computerPackages: Computer[];
  systems: string[];
  drives: Drives;
  fuelTankCost: number;
  mortgage: number;
  lifeSupport: number;
  salaries: number;
  maintenancePeriodCost: number;
  weapons: Weapon[];
  cargoSpace: number;
  cargoHold: Cargo;
  criticalHits: CriticalHits;
  currentFuel: number;
  fuelCapacity: number;
  hullTons: number;
};

const DICIONARY = {
  basicShipSystems: 'Basic Ship Systems',
  manouvreDrive: 'Manouvre Drive',
  jumpDrive: 'Jump Drive',
  sensors: 'Sensors',
  weapons: 'Weapons'
}

const defaultShip: Ship = {
  name: 'The Cyclops',
  model: 'A2',
  class: 'Far Trader',
  hullTons: 100,
  hullPoints: 100,
  fuelCapacity: 4,
  currentFuel: 4,
  armour: 0,
  powerPoints: 0,
  sensors: [],
  powerRequirements: {
    basicShipSystems: 0,
    manouvreDrive: 0,
    jumpDrive: 0,
    sensors: 0,
    weapons: 0,
    fillable1: 0,
    fillable2: 0,
    fillable3: 0
  },
  powerPlant: 90,
  computerPackages: [{
    software: '',
    bandwith: 0
  }],
  systems: [],
  drives: {
    MDrive: 0,
    RDrive: 0,
    JDrive: 0
  },
  fuelTankCost: 0,
  mortgage: 0,
  lifeSupport: 0,
  salaries: 0,
  maintenancePeriodCost: 0,
  weapons: [],
  cargoSpace: 50,
  cargoHold: {
    content: '',
    tons: 0
  },
  criticalHits: {
    'Armour': 0,
    'Bridge': 0,
    'Cargo': 0,
    'Crew': 0,
    'Fuel': 0,
    'Hull': 0,
    'J-Drive': 0,
    'M-Drive': 0,
    'Power Plant': 0,
    'Sensors': 0,
    'Weapons': 0
  }
};
let didInit = false;
export default function ShipPage() {
  const [ship, setShip] = useState<Ship>(defaultShip);

  function fetchStored () {
    didInit = true
    const stored = window.localStorage.getItem('ship')
    if (stored) setShip((prev) => ({ ...prev, ...JSON.parse(stored)}))
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

  const fuelPercent = ((ship.currentFuel / ship.fuelCapacity) * 100).toFixed(0);
  const canJump = ship.currentFuel >= ship.hullTons * 0.1 * ship.powerRequirements.jumpDrive;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShip({ ...ship, [name]: value })
  }
  const handleChangeChild = <K extends keyof Ship>(e: React.ChangeEvent<HTMLInputElement>, parent: K) => {
  const { name, value, type } = e.target
  setShip(prev => ({
    ...prev,
    [parent]: {
      ...(prev[parent] as Record<string, number>),
      [name]: type === 'number' ? Number(value) : value
    }
  }))
}
  const SHIP_SYSTEMS: ShipSystem[] = [ 'Armour','Bridge','Cargo','Crew','Fuel','Hull','J-Drive','M-Drive','Power Plant','Sensors','Weapons' ]
  // const missing = ['powerRequirements', 'sensors', 'drives', 'systems', 'computerPackages', 'weapons', 'cargoHold']
  const DATA = [
    {
      label: 'Hull (Tons)',
      name: 'hullTons',
      type: 'number',
      value: ship.hullTons
    },
    {
      label: 'Hull Points',
      name: 'hullPoints',
      type: 'number',
      value: ship.hullPoints,
    },
    {
      label: 'Armour',
      name: 'armour',
      type: 'number',
      value: ship.armour,
    },
    {
      label: 'Current Power (Powah!)',
      name: 'powerPoints',
      type: 'number',
      value: ship.powerPoints,
    },
    {
      label: 'Power Plant production',
      name: 'powerPlant',
      type: 'number',
      value: ship.powerPlant,
    },
    {
      label: 'Cargo Space Available',
      name: 'cargoSpace',
      type: 'number',
      value: ship.cargoSpace,
    },
    {
      label: 'Current Fuel',
      name: 'currentFuel',
      type: 'number',
      value: ship.currentFuel,
    },
    {
      label: 'Fuel Capacity',
      name: 'fuelCapacity',
      type: 'number',
      value: ship.fuelCapacity,
    }
  ]
  const COSTS = [
    {
      label: 'Fuel (Full Tank) Cost',
      name: 'fuelTankCost',
      type: 'number',
      value: ship.fuelTankCost,
    },
    {
      label: 'Mortgage',
      name: 'mortgage',
      type: 'number',
      value: ship.mortgage,
    },
    {
      label: 'Life Support',
      name: 'lifeSupport',
      type: 'number',
      value: ship.lifeSupport,
    },
    {
      label: 'Salaries',
      name: 'salaries',
      type: 'number',
      value: ship.salaries,
    },
    {
      label: 'Cost per Maintenance Period',
      name: 'maintenancePeriodCost',
      type: 'number',
      value: ship.maintenancePeriodCost,
    },
  ]
  const InputField = ({ label, name, type, value }: { label: string, name: string, type: string, value: number|string }) => (
  <div>
    <label className='block font-semibold mb-1 ship-label'>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
  </div>
)
  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Ship Management</h1>

      <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md space-y-4">
        <div className='grid grid-cols-3 gap-2'>
          <label className='block font-semibold mb-1'>
            Ship Name
            <input
              type='text'
              value={ship.name}
              name='name'
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            </label>
          <label className='block font-semibold mb-1'>
            Class
            <input
              type='text'
              value={ship.class}
              name='class'
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </label>
          <label className='block font-semibold mb-1'>
            Model
            <input
              type='text'
              value={ship.model}
              name='model'
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            </label>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {DATA.map(field => <InputField key={field.label} {...field} />)}
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {COSTS.map(field => <InputField key={field.label} {...field} />)}
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div className='flex flex-col gap-6'>
            <h1 className=''>Software Packages</h1>
            {ship.computerPackages.map(({ software, bandwith }, idx) => (
              <div key={software + '-' + idx}>
                <div className='flex space-x-1'>
                  <input
                    type='text'
                    name={'softare-line-' + idx}
                    value={software}
                  />
                  <input
                    type='text'
                    name={'bandwith-line-' + idx}
                    value={bandwith}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-6'>
            <h1 className=''>Power Requirement</h1>
            {Object.entries(ship.powerRequirements).map(([key, value], idx) => {
              if (String(key).includes('fillable')) {
                return (
                  <label className='flex items-center justify-between' key={key + '-' + idx}>
                    <input type='text' className='w-20 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={key} onChange={(e) => handleChangeChild(e, 'drives')} />
                    <input type='number' className='w-20 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={ship.drives.MDrive} onChange={(e) => handleChangeChild(e, 'drives')} />
                  </label>
                )
              }
              return (
                <label className='flex items-center justify-between' key={key + '-' + idx}>
                  {DICIONARY[key as keyof typeof DICIONARY]}
                  <input type='number' className='w-20 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={value} onChange={(e) => handleChangeChild(e, 'drives')} />
                </label>
              )
            })}
          </div>
          <div className='flex flex-col gap-6'>
            <h1 className=''>Systems</h1>
            {[...ship.systems].map((value, idx) => (
              <label className='flex items-center justify-between' key={'systems-' + idx}>
                <input type='text' className='w-20 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={value} onChange={(e) => handleChangeChild(e, 'systems')} />
              </label>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <div className='flex flex-col gap-6'>
            <h1 className=''>Drives</h1>
            <label className='flex items-center justify-between'>
              Manoeuvre Drive THRUST
              <input type='number' className='w-20 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={ship.drives.MDrive} onChange={(e) => handleChangeChild(e, 'drives')} />
            </label>
            <label className='flex items-center justify-between'>
              Reaction Drive THRUST
              <input type='number' className='w-20 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={ship.drives.MDrive} onChange={(e) => handleChangeChild(e, 'drives')} />
            </label>
            <label className='flex items-center justify-between'>
              Jump Drive JUMP
              <input type='number' className='w-20 border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100' value={ship.drives.MDrive} onChange={(e) => handleChangeChild(e, 'drives')} />
            </label>
          </div>
          <div className='grid grid-cols-1 gap-2'>
            <h1 className=''>Critical Hits</h1>
            {SHIP_SYSTEMS.map(system => (
              <div key={system}>
                <label className='block font-semibold mb-1'>{system}</label>
                <div className='flex space-x-1'>
                  {Array(6).fill(0).map((_, i) => (
                    <input
                      key={i}
                      type='checkbox'
                      checked={ship.criticalHits[system] > i}
                      onChange={() => {
                        setShip(prev => {
                          const newLevel = prev.criticalHits[system] === i+1 ? i : i+1
                          return {
                            ...prev,
                            criticalHits: { ...prev.criticalHits, [system]: newLevel as HitLevel }
                          }
                        })
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className='grid grid-cols-1 gap-2'>
            <h1 className=''>Critical Hits</h1>
            {SHIP_SYSTEMS.map(system => (
              <div key={system}>
                <label className='block font-semibold mb-1'>{system}</label>
                <div className='flex space-x-1'>
                  {Array(6).fill(0).map((_, i) => (
                    <input
                      key={i}
                      type='checkbox'
                      checked={ship.criticalHits[system] > i}
                      onChange={() => {
                        setShip(prev => {
                          const newLevel = prev.criticalHits[system] === i+1 ? i : i+1
                          return {
                            ...prev,
                            criticalHits: { ...prev.criticalHits, [system]: newLevel as HitLevel }
                          }
                        })
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
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
