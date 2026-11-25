import type { WeddingConfig } from '../../types/wedding';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';

interface InvitationSectionProps {
  config: WeddingConfig;
}

export function InvitationSection({ config }: InvitationSectionProps) {
  const { invitation, couple } = config;

  return (
    <SectionContainer id="invitation" variant="tinted">
      <div className="mx-auto max-w-2xl rounded-card border border-line bg-surface px-6 py-10 text-center shadow-card sm:px-12 sm:py-14">
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg font-serif text-sm tracking-widest text-accent"
        >
          {couple.monogram}
        </div>

        <SectionHeading title={invitation.title} />

        <div className="space-y-5 text-base leading-relaxed text-ink/90 sm:text-[1.0625rem]">
          {invitation.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {invitation.signature && (
          <p className="mt-8 font-serif text-xl italic text-accent sm:text-2xl">
            {invitation.signature}
          </p>
        )}
      </div>
    </SectionContainer>
  );
}
