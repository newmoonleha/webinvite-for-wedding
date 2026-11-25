import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { WeddingConfig } from '../../types/wedding';

interface HeaderNavProps {
  config: WeddingConfig;
}

interface NavItem {
  id: string;
  label: string;
  visible: boolean;
}

export function HeaderNav({ config }: HeaderNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'invitation', label: 'Приглашение', visible: config.sections.invitation },
    { id: 'timeline', label: 'Программа', visible: config.sections.timeline },
    { id: 'location', label: 'Локация', visible: config.sections.location },
    { id: 'dress-code', label: 'Дресс-код', visible: config.sections.dressCode },
    { id: 'rsvp', label: 'RSVP', visible: config.sections.rsvp },
  ].filter((item) => item.visible);

  if (navItems.length === 0) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a
          href="#hero"
          className="font-serif text-lg font-medium tracking-wider text-ink transition-opacity hover:opacity-75"
        >
          {config.couple.monogram}
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Разделы приглашения" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-alt md:hidden"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Мобильное меню"
          className="border-t border-line bg-surface px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm font-medium tracking-wide text-ink transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
