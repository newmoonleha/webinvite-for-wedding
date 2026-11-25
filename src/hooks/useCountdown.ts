import { useEffect, useState } from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReached: boolean;
  isValidDate: boolean;
}

function calculateCountdown(targetIso: string): CountdownState {
  const targetMs = new Date(targetIso).getTime();

  if (Number.isNaN(targetMs)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isReached: false,
      isValidDate: false,
    };
  }

  const diffMs = targetMs - Date.now();

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isReached: true,
      isValidDate: true,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isReached: false,
    isValidDate: true,
  };
}

export function useCountdown(targetIso: string): CountdownState {
  const [state, setState] = useState<CountdownState>(() => calculateCountdown(targetIso));

  useEffect(() => {
    setState(calculateCountdown(targetIso));

    const timerId = window.setInterval(() => {
      setState(calculateCountdown(targetIso));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [targetIso]);

  return state;
}
