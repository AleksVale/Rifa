import React from 'react'

interface TailwindBadgeProps {
  color: 'yellow' | 'green'
  text: string
}

export default function TailwindBadge({
  color,
  text,
}: Readonly<TailwindBadgeProps>) {
  const colorVariants = {
    green: 'bg-green-50 text-green-600 ring-green-500/10',
    yellow: 'bg-yellow-50 text-yellow-600 ring-yellow-500/10',
    red: 'bg-red-50 text-red-600 ring-red-500/10',
  }
  return (
    <span
      className={`${colorVariants[color]} inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`}
    >
      {text}
    </span>
  )
}
