import { useCountdown } from '../../hooks/useCountdown';
import { padTwoDigits, pluralizeRu } from '../../utils/formatters';

interface CountdownTimerProps {
  targetIso: string;
}

export function CountdownTimer({ targetIso }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isReached, isValidDate } = useCountdown(targetIso);

  if (!isValidDate) {
    return null;
  }

  if (isReached) {
    return (
      <div className="inline-flex items-center rounded-full border border-line bg-surface/90 px-6 py-3 text-sm font-medium text-ink shadow-card">
        Этот особенный день уже наступил
      </div>
    );
  }

  const units = [
    {
      value: String(days),
      label: pluralizeRu(days, ['день', 'дня', 'дней']),
    },
    {
      value: padTwoDigits(hours),
      label: pluralizeRu(hours, ['час', 'часа', 'часов']),
    },
    {
      value: padTwoDigits(minutes),
      label: pluralizeRu(minutes, ['минута', 'минуты', 'минут']),
    },
    {
      value: padTwoDigits(seconds),
      label: pluralizeRu(seconds, ['секунда', 'секунды', 'секунд']),
    },
  ];

  return (
    <div
      aria-label="Обратный отсчёт до свадьбы"
      className="mx-auto grid max-w-md grid-cols-4 gap-2.5 sm:max-w-lg sm:gap-4"
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center rounded-2xl border border-line/90 bg-surface/85 px-2 py-3.5 shadow-card backdrop-blur-sm sm:px-4 sm:py-4"
        >
          <span className="font-serif text-2xl font-medium tabular-nums leading-none text-ink sm:text-4xl">
            {unit.value}
          </span>
          <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
