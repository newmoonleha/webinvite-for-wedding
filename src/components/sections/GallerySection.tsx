import type { WeddingConfig } from '../../types/wedding';
import { MediaSlot } from '../media/MediaSlot';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';

interface GallerySectionProps {
  config: WeddingConfig;
}

/**
 * Зарезервированная секция фотогалереи пары.
 * Активируется через `weddingConfig.sections.gallery = true`.
 */
export function GallerySection({ config }: GallerySectionProps) {
  const { gallery } = config.future;

  return (
    <SectionContainer id="gallery" variant="default">
      <SectionHeading
        eyebrow="Фотоистория"
        title={gallery.title}
        subtitle={gallery.subtitle}
      />

      {gallery.items.length === 0 ? (
        <div className="mx-auto max-w-xl rounded-card border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
          Добавьте фотографии в <code className="rounded bg-surface-alt px-1.5 py-0.5">weddingConfig.future.gallery.items</code>, чтобы отобразить галерею.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {gallery.items.map((item) => (
            <figure key={item.id} className="space-y-2">
              <MediaSlot asset={item.asset} aspectClassName="aspect-[4/5]" />
              {item.caption && (
                <figcaption className="text-center text-xs text-muted">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </SectionContainer>
  );
}
