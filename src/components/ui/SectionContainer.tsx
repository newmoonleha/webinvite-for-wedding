import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  variant?: 'default' | 'tinted';
  className?: string;
}

export function SectionContainer({
  id,
  children,
  variant = 'default',
  className = '',
}: SectionContainerProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  const bgClass = variant === 'tinted' ? 'bg-surface-alt/65' : 'bg-bg';

  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-16 py-16 sm:py-24 ${bgClass} ${className}`}
    >
      <div
        className={`reveal mx-auto max-w-4xl px-5 sm:px-8 ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        {children}
      </div>
    </section>
  );
}
