"use client"

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: string
}

interface TimeLeft {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft: TimeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-white">{value}</div>
          <div className="text-sm text-white/80 capitalize">{interval}</div>
        </div>
      ))}
    </div>
  )
}

