import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import type { MediaAsset } from '../../types/wedding';
import { resolveAssetUrl } from '../../utils/assetUrl';

interface MediaSlotProps {
  asset: MediaAsset;
  aspectClassName?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Универсальный слот для фотографий.
 * Пока `asset.src === null`, отображает нейтральную эстетичную заглушку.
 * При добавлении файла в `public/images/...` автоматически рендерит <img>.
 */
export function MediaSlot({
  asset,
  aspectClassName = 'aspect-[4/3]',
  className = '',
  priority = false,
}: MediaSlotProps) {
  const [hasError, setHasError] = useState(false);

  const resolvedSrc = resolveAssetUrl(asset.src);
  const showImage = Boolean(resolvedSrc) && !hasError;

  return (
    <div
      className={`relative overflow-hidden rounded-card border border-line bg-surface-alt/70 ${aspectClassName} ${className}`}
    >
      {showImage ? (
        <img
          src={resolvedSrc}
          alt={asset.alt}
          loading={priority ? 'eager' : 'lazy'}
          style={{ objectPosition: asset.objectPosition ?? 'center center' }}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-accent shadow-sm">
            <ImageIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="font-serif text-lg font-medium text-ink">
            {asset.placeholderTitle ?? asset.alt}
          </p>
          {asset.placeholderSubtitle && (
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted">
              {asset.placeholderSubtitle}
            </p>
          )}
          {hasError && (
            <p className="mt-2 text-xs text-muted">
              Не удалось загрузить изображение ({asset.src})
            </p>
          )}
        </div>
      )}
    </div>
  );
}
