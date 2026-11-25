import type { ThemeId, ThemeTokens } from '../types/wedding';

/**
 * Реестр визуальных тем.
 * Сейчас по умолчанию активна нейтральная светлая тема `neutral-linen`.
 * Позже вы сможете переключать темы через `weddingConfig.themeId`
 * или добавить переключатель тем на основе этого словаря.
 */
export const THEMES: Record<ThemeId, ThemeTokens> = {
  'neutral-linen': {
    id: 'neutral-linen',
    label: 'Нейтральный лён (MVP)',
    colors: {
      bg: '#faf8f5',
      surface: '#ffffff',
      surfaceAlt: '#f3efe8',
      text: '#2c2925',
      textMuted: '#6f6a62',
      accent: '#7a8475',
      accentSoft: '#e6ebe3',
      accentContrast: '#ffffff',
      border: '#e6e0d6',
    },
  },
  'warm-sand': {
    id: 'warm-sand',
    label: 'Тёплый песок',
    colors: {
      bg: '#fbf7f2',
      surface: '#ffffff',
      surfaceAlt: '#f4ebe1',
      text: '#322923',
      textMuted: '#786b61',
      accent: '#9c7a62',
      accentSoft: '#efe4db',
      accentContrast: '#ffffff',
      border: '#e9ddd2',
    },
  },
  'sage-minimal': {
    id: 'sage-minimal',
    label: 'Шалфей и камень',
    colors: {
      bg: '#f7f8f6',
      surface: '#ffffff',
      surfaceAlt: '#edf0eb',
      text: '#242925',
      textMuted: '#636b64',
      accent: '#5f7161',
      accentSoft: '#e2e9e2',
      accentContrast: '#ffffff',
      border: '#dde2db',
    },
  },
};

export function applyThemeTokens(themeId: ThemeId): void {
  const theme = THEMES[themeId] ?? THEMES['neutral-linen'];
  const root = document.documentElement;
  root.style.setProperty('--color-bg', theme.colors.bg);
  root.style.setProperty('--color-surface', theme.colors.surface);
  root.style.setProperty('--color-surface-alt', theme.colors.surfaceAlt);
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-muted', theme.colors.textMuted);
  root.style.setProperty('--color-accent', theme.colors.accent);
  root.style.setProperty('--color-accent-soft', theme.colors.accentSoft);
  root.style.setProperty('--color-accent-contrast', theme.colors.accentContrast);
  root.style.setProperty('--color-border', theme.colors.border);
}
