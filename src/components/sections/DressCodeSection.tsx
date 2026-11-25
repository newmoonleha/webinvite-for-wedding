import { useState } from 'react';
import type { WeddingConfig } from '../../types/wedding';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';

interface DressCodeSectionProps {
  config: WeddingConfig;
}

export function DressCodeSection({ config }: DressCodeSectionProps) {
  const { dressCode } = config;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedColor =
    selectedIndex !== null ? dressCode.palette[selectedIndex] : null;

  return (
    <SectionContainer id="dress-code" variant="default">
      <SectionHeading
        eyebrow={dressCode.eyebrow}
        title={dressCode.title}
        subtitle={dressCode.description}
      />

      <div className="mx-auto max-w-2xl rounded-card border border-line bg-surface p-6 text-center shadow-card sm:p-10">
        {dressCode.palette.length > 0 && (
          <div className="mb-6">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Демонстрационная палитра оттенков
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {dressCode.palette.map((color, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <button
                    key={`${color.hex}-${color.name}`}
                    type="button"
                    onClick={() =>
                      setSelectedIndex((prev) => (prev === index ? null : index))
                    }
                    aria-pressed={isSelected}
                    className="group flex flex-col items-center gap-2 focus-visible:rounded-xl"
                  >
                    <span
                      style={{ backgroundColor: color.hex }}
                      className={`h-14 w-14 rounded-full border transition-transform duration-200 sm:h-16 sm:w-16 ${
                        isSelected
                          ? 'scale-110 border-ink ring-2 ring-accent ring-offset-2 ring-offset-surface'
                          : 'border-line group-hover:scale-105'
                      }`}
                    />
                    <span className="text-xs font-medium text-ink">
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedColor && (
              <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-line bg-bg px-4 py-1.5 text-xs text-muted">
                <span className="font-medium text-ink">{selectedColor.name}</span>
                {selectedColor.note && <span>· {selectedColor.note}</span>}
                <span className="font-mono text-[11px] opacity-80">
                  ({selectedColor.hex})
                </span>
              </div>
            )}
          </div>
        )}

        {dressCode.note && (
          <p className="border-t border-line pt-5 text-sm italic text-muted">
            {dressCode.note}
          </p>
        )}
      </div>
    </SectionContainer>
  );
}
