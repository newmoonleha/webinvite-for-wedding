import type { WeddingConfig } from '../types/wedding';

/**
 * Формирует рабочую внешнюю ссылку для построения маршрута к площадке.
 * Приоритет: явная ссылка `routeUrl` -> координаты -> текстовый адрес.
 */
export function buildVenueRouteUrl(location: WeddingConfig['location']): string {
  if (location.routeUrl) {
    return location.routeUrl;
  }

  if (location.coordinates) {
    const { lat, lng } = location.coordinates;
    return `https://yandex.ru/maps/?rtext=~${lat},${lng}&rtt=auto`;
  }

  const encodedAddress = encodeURIComponent(location.address);
  return `https://yandex.ru/maps/?text=${encodedAddress}`;
}
