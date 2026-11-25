import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import type { WeddingConfig } from '../../types/wedding';
import { resolveAssetUrl } from '../../utils/assetUrl';
import { CountdownTimer } from './CountdownTimer';

interface HeroSectionProps {
  config: WeddingConfig;
  nextSectionId: string;
}

export function HeroSection({ config, nextSectionId }: HeroSectionProps) {
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const resolvedHeroSrc = resolveAssetUrl(config.hero.photo.src);
  const hasPhoto = Boolean(resolvedHeroSrc) && !heroImgFailed;

  const handleScrollToInvitation = () => {
    const target = document.getElementById(nextSectionId);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-57px)] items-center justify-center overflow-hidden bg-bg px-5 py-16 sm:px-8 sm:py-24"
    >
      {/* Фон: либо реальное фото пары, либо нейтральная декоративная композиция */}
      {hasPhoto ? (
        <>
          <img
            src={resolvedHeroSrc}
            alt={config.hero.photo.alt}
            style={{ objectPosition: config.hero.photo.objectPosition ?? 'center center' }}
            onError={() => setHeroImgFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-bg/75 backdrop-blur-[2px]"
          />
        </>
      ) : (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Мягкие нейтральные световые акценты */}
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent-soft/60 blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-surface-alt blur-3xl" />

          {/* Тонкая минималистичная декоративная арка */}
          <svg
            viewBox="0 0 800 800"
            fill="none"
            className="absolute left-1/2 top-1/2 h-[120%] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-35"
          >
            <circle cx="400" cy="400" r="290" stroke="currentColor" strokeWidth="0.75" className="text-line" />
            <circle cx="400" cy="400" r="340" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 8" className="text-accent/50" />
            <path
              d="M170 620 C210 510, 280 460, 400 460 C520 460, 590 510, 630 620"
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-line"
            />
          </svg>
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <span className="mb-5 inline-flex items-center rounded-full border border-line bg-surface/80 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted backdrop-blur-sm">
          {config.hero.eyebrow}
        </span>

        <h1 className="font-serif text-5xl font-normal tracking-wide text-ink sm:text-6xl md:text-7xl">
          <span>{config.couple.firstPartner}</span>
          <span className="mx-3 font-serif italic text-accent sm:mx-5">
            {config.couple.separator}
          </span>
          <span>{config.couple.secondPartner}</span>
        </h1>

        {config.couple.familyName && (
          <p className="mt-2 font-serif text-xl tracking-[0.18em] text-muted uppercase sm:text-2xl">
            {config.couple.familyName}
          </p>
        )}

        <div className="mt-6 flex flex-col items-center gap-1.5">
          <p className="font-serif text-2xl tracking-wide text-ink sm:text-3xl">
            {config.date.displayDate}
          </p>
          {config.date.displaySubtitle && (
            <p className="text-xs uppercase tracking-[0.18em] text-muted sm:text-sm">
              {config.date.displaySubtitle}
            </p>
          )}
        </div>

        <div className="mt-9 w-full sm:mt-11">
          <CountdownTimer targetIso={config.date.isoDateTime} />
        </div>

        <div className="mt-10 sm:mt-12">
          <button
            type="button"
            onClick={handleScrollToInvitation}
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium tracking-wide text-accent-contrast shadow-soft transition-all hover:opacity-90 active:scale-[0.99]"
          >
            <span>{config.hero.ctaLabel}</span>
            <ArrowDown
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>

        {!hasPhoto && (
          <p className="mt-6 text-[11px] tracking-wide text-muted/80">
            {config.hero.photo.placeholderSubtitle}
          </p>
        )}
      </div>
    </section>
  );
}
