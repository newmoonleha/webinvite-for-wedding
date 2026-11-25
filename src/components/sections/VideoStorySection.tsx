import { Film } from 'lucide-react';
import type { WeddingConfig } from '../../types/wedding';
import { resolveAssetUrl } from '../../utils/assetUrl';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';

interface VideoStorySectionProps {
  config: WeddingConfig;
}

/**
 * Зарезервированная секция видеоистории пары.
 * Активируется через `weddingConfig.sections.videoStory = true`.
 */
export function VideoStorySection({ config }: VideoStorySectionProps) {
  const { videoStory } = config.future;

  return (
    <SectionContainer id="video-story" variant="tinted">
      <SectionHeading
        eyebrow="Видео"
        title={videoStory.title}
        subtitle={videoStory.description}
      />

      <div className="mx-auto max-w-3xl overflow-hidden rounded-card border border-line bg-surface p-4 shadow-card">
        {videoStory.videoUrl ? (
          <video
            controls
            playsInline
            poster={resolveAssetUrl(videoStory.poster?.src)}
            className="aspect-video w-full rounded-2xl bg-black object-cover"
          >
            <source src={resolveAssetUrl(videoStory.videoUrl)} />
          </video>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface-alt/60 p-6 text-center">
            <Film className="mb-3 h-7 w-7 text-accent" aria-hidden="true" />
            <p className="font-serif text-xl text-ink">Слот для видеоистории</p>
            <p className="mt-1 text-xs text-muted">
              Укажите путь к видеофайлу в <code className="rounded bg-surface px-1 py-0.5">weddingConfig.future.videoStory.videoUrl</code>.
            </p>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
