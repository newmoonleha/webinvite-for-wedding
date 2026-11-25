import { useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import type { WeddingConfig } from '../../types/wedding';
import { buildVenueRouteUrl } from '../../utils/mapLinks';
import { MediaSlot } from '../media/MediaSlot';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';

interface LocationSectionProps {
  config: WeddingConfig;
}

export function LocationSection({ config }: LocationSectionProps) {
  const { location } = config;
  const [copied, setCopied] = useState(false);

  const routeHref = buildVenueRouteUrl(location);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback если Clipboard API недоступен
      setCopied(false);
    }
  };

  return (
    <SectionContainer id="location" variant="tinted">
      <SectionHeading eyebrow={location.eyebrow} title={location.title} />

      <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
        {/* Левая колонка: фото площадки + информация + маршрут */}
        <div className="flex flex-col justify-between rounded-card border border-line bg-surface p-6 shadow-card sm:p-8 lg:col-span-6">
          <div>
            <MediaSlot
              asset={location.venuePhoto}
              aspectClassName="aspect-[16/10]"
              className="mb-6"
            />

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-medium text-ink">
                  {location.venueName}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-ink/85">
                  {location.address}
                </p>
                {location.details && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {location.details}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={routeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90 sm:flex-initial"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              <span>{location.routeButtonLabel}</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-bg px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-alt"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span>Адрес скопирован</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-muted" aria-hidden="true" />
                  <span>Скопировать адрес</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Правая колонка: слот под интерактивную карту */}
        <div className="flex flex-col rounded-card border border-line bg-surface p-4 shadow-card sm:p-5 lg:col-span-6">
          {location.mapIntegration.embedUrl ? (
            <iframe
              title={`Карта проезда: ${location.venueName}`}
              src={location.mapIntegration.embedUrl}
              loading="lazy"
              className="min-h-[320px] w-full flex-1 rounded-2xl border border-line"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface-alt/55 p-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-accent shadow-sm">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="mb-2 rounded-full border border-line bg-surface px-3 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Заглушка · Карта
              </span>
              <p className="font-serif text-xl font-medium text-ink">
                Интерактивная карта
              </p>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted">
                {location.mapIntegration.providerHint}. После утверждения площадки сюда можно подключить iframe или виджет карты без переделки секции.
              </p>
              {location.coordinates && (
                <p className="mt-4 rounded-lg bg-surface px-3 py-1.5 font-mono text-[11px] text-muted">
                  Координаты: {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
