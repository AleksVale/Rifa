import React from 'react'

interface TailwindBadgeProps {
  color: string
  text: string
}

export default function TailwindBadge({
  color,
  text,
}: Readonly<TailwindBadgeProps>) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-${color}-50 px-2 py-1 text-xs font-medium text-${color}-600 ring-1 ring-inset ring-${color}-500/10`}
    >
      {text}
    </span>
  )
}
