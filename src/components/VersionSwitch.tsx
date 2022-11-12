import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import { useAtom } from 'jotai';
import { isPocketAtom } from '../utils/atoms';

export default function VersionSwitch() {
  const [isPocket,setIsPocket] = useAtom(isPocketAtom)
  return (
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label className="text-sm leading-4 text-slate-700 select-none font-semibold" htmlFor="airplane-mode" style={{ paddingRight: 15 }}>
          Pocket mode
        </label>
        <Switch.Root onCheckedChange={setIsPocket} checked={isPocket} className="w-10  h-6 bg-slate-800/40 rounded-full relative shadow-md focus:ring focus:ring-slate-400 focus:outline-none data-[state=checked]:bg-black" id="airplane-mode">
          <Switch.Thumb className="block w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-4" />
        </Switch.Root>
      </div>
    </form>
  );
}
