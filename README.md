# Wedding Invitation Website — MVP

Адаптивный одностраничный сайт свадебного приглашения (React + TypeScript + Vite + Tailwind CSS + Lucide Icons).

## Запуск локально

> Требуется установленный **Node.js** (рекомендуется LTS 20+ или 22+).

```bash
npm install
npm run dev
```

Для проверки типов и сборки продакшн-бандла:

```bash
npm run typecheck
npm run build
npm run preview
```

## Где менять контент и настройки

Весь контент, имена, дата, расписание, адрес, палитра и видимость секций находятся в одном файле:
- `src/config/weddingConfig.ts`

Темы оформления (CSS-переменные) описаны в:
- `src/config/themes.ts`

## Как добавить фотографии

1. Положите изображения в папку `public/images/` (например, `hero.jpg`, `venue.jpg`).
2. Укажите путь в `src/config/weddingConfig.ts` (например, `src: '/images/hero.jpg'`).

## Подключение реального backend для RSVP

Форма RSVP сейчас работает через `LocalStubRsvpService` (`src/services/rsvpService.ts`) — ответы сохраняются локально в `localStorage` браузера. Для подключения реального сервера реализуйте интерфейс `IRsvpService` и замените экспортируемый `rsvpService`.
