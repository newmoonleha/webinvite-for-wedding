import {
  Camera,
  Clock,
  GlassWater,
  Heart,
  Music,
  Sparkles,
  Utensils,
  type LucideIcon,
} from 'lucide-react';
import type { TimelineIconKey, WeddingConfig } from '../../types/wedding';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';

interface TimelineSectionProps {
  config: WeddingConfig;
}

const TIMELINE_ICON_MAP: Record<TimelineIconKey, LucideIcon> = {
  sparkles: Sparkles,
  heart: Heart,
  utensils: Utensils,
  music: Music,
  camera: Camera,
  glass: GlassWater,
  clock: Clock,
};

export function TimelineSection({ config }: TimelineSectionProps) {
  const { timeline } = config;

  return (
    <SectionContainer id="timeline" variant="default">
      <SectionHeading
        eyebrow={timeline.eyebrow}
        title={timeline.title}
        subtitle={timeline.subtitle}
      />

      {timeline.events.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-card border border-dashed border-line bg-surface px-6 py-10 text-center text-sm text-muted">
          Расписание пока формируется и появится здесь позже.
        </div>
      ) : (
        <ol className="relative mx-auto max-w-2xl space-y-6 before:absolute before:bottom-4 before:left-6 before:top-4 before:w-px before:bg-line sm:before:left-1/2 sm:before:-translate-x-px">
          {timeline.events.map((event, index) => {
            const Icon = TIMELINE_ICON_MAP[event.icon ?? 'clock'] ?? Clock;
            const isEven = index % 2 === 0;

            return (
              <li
                key={event.id}
                className="relative flex items-start gap-5 pl-14 sm:pl-0"
              >
                {/* Иконка-маркер на линии */}
                <div
                  aria-hidden="true"
                  className="absolute left-1 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-accent shadow-sm sm:left-1/2 sm:-translate-x-1/2"
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Карточка события (на десктопе чередуется слева и справа) */}
                <div
                  className={`w-full sm:w-[calc(50%-2rem)] ${
                    isEven ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
                  }`}
                >
                  <article className="rounded-card border border-line bg-surface p-5 shadow-card transition-shadow hover:shadow-soft sm:p-6">
                    <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold tabular-nums tracking-wider text-ink">
                      {event.time}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl font-medium text-ink">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {event.description}
                    </p>
                  </article>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </SectionContainer>
  );
}
