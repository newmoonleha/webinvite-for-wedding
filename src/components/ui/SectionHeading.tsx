interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`mb-10 flex flex-col sm:mb-12 ${alignClasses}`}>
      {eyebrow && (
        <span className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-[2.6rem] md:leading-tight">
        {title}
      </h2>
      <div
        aria-hidden="true"
        className="mt-4 h-px w-12 bg-accent/45"
      />
      {subtitle && (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
