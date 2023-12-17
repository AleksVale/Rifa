import { useState } from 'react'
import { Switch } from '@headlessui/react'

interface ToggleProps {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  label?: string
}

export default function Toggle({ enabled, setEnabled, label }: ToggleProps) {
  return (
    <div className="flex items-center py-3">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      {label && <p className="font-medium text-xs px-2">{label}</p>}
    </div>
  )
}
