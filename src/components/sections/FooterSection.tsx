import { MessageCircle, Phone } from 'lucide-react';
import type { WeddingConfig } from '../../types/wedding';

interface FooterSectionProps {
  config: WeddingConfig;
}

export function FooterSection({ config }: FooterSectionProps) {
  const { couple, date, footer } = config;
  const cleanPhoneHref = `tel:${footer.organizer.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="border-t border-line bg-bg px-5 py-14 text-center sm:px-8 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-serif text-3xl font-normal tracking-wide text-ink sm:text-4xl">
          {couple.firstPartner}{' '}
          <span className="italic text-accent">{couple.separator}</span>{' '}
          {couple.secondPartner}
          {couple.familyName ? ` ${couple.familyName}` : ''}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
          {date.displayDate}
        </p>

        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
          {footer.thankYouText}
        </p>

        <div className="mx-auto mt-8 inline-flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface px-6 py-4 text-xs text-muted shadow-card">
          <span className="font-medium text-ink">
            {footer.organizer.roleLabel}
          </span>
          <span>{footer.organizer.name}</span>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-4">
            <a
              href={cleanPhoneHref}
              className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
            >
              <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span>{footer.organizer.phone}</span>
            </a>
            {footer.organizer.messengerHandle && (
              <span className="inline-flex items-center gap-1.5 text-muted">
                <MessageCircle className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>{footer.organizer.messengerHandle}</span>
              </span>
            )}
          </div>
          {footer.organizer.isPlaceholder && (
            <span className="mt-1 rounded-full bg-surface-alt px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
              Контакт-заглушка · обновите в weddingConfig.ts
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
