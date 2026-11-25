import type { IRsvpService, RsvpRecord, RsvpServiceResult, RsvpSubmission } from '../types/wedding';

const STORAGE_KEY = 'wedding_mvp_rsvp_submissions_v1';

/**
 * Локальная заглушка сервиса RSVP.
 * Сохраняет ответы в localStorage браузера для проверки формы на этапе MVP.
 *
 * Для подключения реального backend (Supabase / REST API / Google Sheets / Telegram Bot):
 * 1. Создайте класс ApiRsvpService implements IRsvpService
 * 2. Отправляйте POST-запрос на ваш endpoint в методе submit()
 * 3. Замените экспортируемый экземпляр `rsvpService` внизу этого файла.
 */
class LocalStubRsvpService implements IRsvpService {
  readonly mode = 'local-stub' as const;

  async submit(payload: RsvpSubmission): Promise<RsvpServiceResult> {
    const trimmedName = payload.fullName.trim();
    if (trimmedName.length < 2) {
      return {
        ok: false,
        errorMessage: 'Пожалуйста, укажите имя и фамилию (минимум 2 символа).',
      };
    }

    // Имитация короткой сетевой задержки для реалистичного UX загрузки
    await new Promise((resolve) => setTimeout(resolve, 450));

    const record: RsvpRecord = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      fullName: trimmedName,
      attendance: payload.attendance,
      guestsCount: payload.attendance === 'yes' ? Math.max(1, payload.guestsCount) : 0,
      comment: payload.comment.trim(),
      submittedAt: new Date().toISOString(),
      storageMode: this.mode,
    };

    try {
      const existing = await this.listLocalSubmissions();
      const next = [record, ...existing];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Даже если localStorage недоступен (например, строгий приватный режим), возвращаем успешный демо-результат
    }

    return { ok: true, record };
  }

  async listLocalSubmissions(): Promise<RsvpRecord[]> {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as RsvpRecord[]) : [];
    } catch {
      return [];
    }
  }
}

export const rsvpService: IRsvpService = new LocalStubRsvpService();
