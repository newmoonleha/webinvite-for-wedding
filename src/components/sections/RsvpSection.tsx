import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Info, Loader2, Minus, Plus, Send } from 'lucide-react';
import { rsvpService } from '../../services/rsvpService';
import type { AttendanceChoice, RsvpRecord, WeddingConfig } from '../../types/wedding';
import { pluralizeRu } from '../../utils/formatters';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';

interface RsvpSectionProps {
  config: WeddingConfig;
}

export function RsvpSection({ config }: RsvpSectionProps) {
  const { rsvp } = config;

  const [fullName, setFullName] = useState('');
  const [attendance, setAttendance] = useState<AttendanceChoice>('yes');
  const [guestsCount, setGuestsCount] = useState(1);
  const [comment, setComment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<RsvpRecord | null>(null);
  const [localHistory, setLocalHistory] = useState<RsvpRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    void rsvpService.listLocalSubmissions().then(setLocalHistory);
  }, []);

  const handleGuestsChange = (delta: number) => {
    setGuestsCount((prev) =>
      Math.min(rsvp.maxGuestsPerInvite, Math.max(1, prev + delta))
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await rsvpService.submit({
      fullName,
      attendance,
      guestsCount: attendance === 'yes' ? guestsCount : 0,
      comment,
    });

    setIsSubmitting(false);

    if (!result.ok || !result.record) {
      setErrorMessage(result.errorMessage ?? 'Не удалось сохранить ответ.');
      return;
    }

    setSubmittedRecord(result.record);
    const updatedHistory = await rsvpService.listLocalSubmissions();
    setLocalHistory(updatedHistory);
  };

  const handleResetForm = () => {
    setSubmittedRecord(null);
    setFullName('');
    setAttendance('yes');
    setGuestsCount(1);
    setComment('');
    setErrorMessage(null);
  };

  return (
    <SectionContainer id="rsvp" variant="tinted">
      <SectionHeading
        eyebrow={rsvp.eyebrow}
        title={rsvp.title}
        subtitle={rsvp.subtitle}
      />

      <div className="mx-auto max-w-xl">
        {/* Явная пометка о заглушке на этапе MVP */}
        {rsvpService.mode === 'local-stub' && (
          <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-line bg-surface/90 px-4 py-3 text-xs leading-relaxed text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span>
              <strong className="font-medium text-ink">Демо-режим (заглушка):</strong>{' '}
              база данных пока не подключена — отправленные ответы сохраняются локально в вашем браузере через слой <code className="rounded bg-surface-alt px-1 py-0.5 text-[11px]">rsvpService.ts</code>.
            </span>
          </div>
        )}

        <div className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-9">
          {submittedRecord ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-3xl font-medium text-ink">
                {rsvp.successTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {rsvp.successMessage}
              </p>

              <div className="mt-6 rounded-2xl border border-line bg-bg p-4 text-left text-sm">
                <dl className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Гость:</dt>
                    <dd className="font-medium text-ink">{submittedRecord.fullName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Присутствие:</dt>
                    <dd className="font-medium text-ink">
                      {submittedRecord.attendance === 'yes'
                        ? 'Подтверждено'
                        : 'Не сможет присутствовать'}
                    </dd>
                  </div>
                  {submittedRecord.attendance === 'yes' && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted">Количество:</dt>
                      <dd className="font-medium text-ink">
                        {submittedRecord.guestsCount}{' '}
                        {pluralizeRu(submittedRecord.guestsCount, ['гость', 'гостя', 'гостей'])}
                      </dd>
                    </div>
                  )}
                  {submittedRecord.comment && (
                    <div className="border-t border-line pt-2">
                      <dt className="text-xs text-muted">Комментарий:</dt>
                      <dd className="mt-0.5 text-ink">{submittedRecord.comment}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className="mt-6 inline-flex items-center justify-center rounded-full border border-line bg-bg px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-alt"
              >
                Отправить ещё один ответ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Имя и фамилия */}
              <div>
                <label
                  htmlFor="rsvp-full-name"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Имя и фамилия <span className="text-accent">*</span>
                </label>
                <input
                  id="rsvp-full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Например, Анна Смирнова"
                  className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted/65 focus:border-accent focus:bg-surface focus:outline-none"
                />
              </div>

              {/* Подтверждение присутствия */}
              <fieldset>
                <legend className="mb-2.5 block text-sm font-medium text-ink">
                  Сможете ли вы присутствовать?
                </legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm transition-colors ${
                      attendance === 'yes'
                        ? 'border-accent bg-accent-soft/65 font-medium text-ink'
                        : 'border-line bg-bg text-muted hover:bg-surface-alt/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={attendance === 'yes'}
                      onChange={() => setAttendance('yes')}
                      className="h-4 w-4 accent-[var(--color-accent)]"
                    />
                    <span>Да, с радостью приду</span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm transition-colors ${
                      attendance === 'no'
                        ? 'border-accent bg-accent-soft/65 font-medium text-ink'
                        : 'border-line bg-bg text-muted hover:bg-surface-alt/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={attendance === 'no'}
                      onChange={() => setAttendance('no')}
                      className="h-4 w-4 accent-[var(--color-accent)]"
                    />
                    <span>К сожалению, не смогу</span>
                  </label>
                </div>
              </fieldset>

              {/* Количество гостей (актуально при подтверждении присутствия) */}
              {attendance === 'yes' && (
                <div>
                  <span className="mb-2 block text-sm font-medium text-ink">
                    Количество гостей
                  </span>
                  <div className="flex items-center justify-between rounded-xl border border-line bg-bg px-4 py-2.5">
                    <span className="text-sm text-muted">
                      Включая вас (до {rsvp.maxGuestsPerInvite})
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleGuestsChange(-1)}
                        disabled={guestsCount <= 1}
                        aria-label="Уменьшить количество гостей"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span
                        aria-live="polite"
                        className="min-w-[2rem] text-center font-serif text-xl font-medium tabular-nums text-ink"
                      >
                        {guestsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleGuestsChange(1)}
                        disabled={guestsCount >= rsvp.maxGuestsPerInvite}
                        aria-label="Увеличить количество гостей"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Пожелания или комментарий */}
              <div>
                <label
                  htmlFor="rsvp-comment"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Пожелания или комментарий
                </label>
                <textarea
                  id="rsvp-comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Аллергии, предпочтения по напиткам или тёплые слова..."
                  className="w-full resize-y rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted/65 focus:border-accent focus:bg-surface focus:outline-none"
                />
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700"
                >
                  {errorMessage}
                </p>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-contrast shadow-soft transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Сохраняем...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>{rsvp.submitButtonLabel}</span>
                    </>
                  )}
                </button>
                {rsvp.deadlineText && (
                  <p className="mt-3 text-center text-xs text-muted">
                    {rsvp.deadlineText}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Небольшой отладочный просмотр локальных ответов для MVP-тестирования */}
        {localHistory.length > 0 && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowHistory((prev) => !prev)}
              className="text-xs text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              {showHistory
                ? 'Скрыть локально сохранённые демо-ответы'
                : `Показать локальные демо-ответы (${localHistory.length})`}
            </button>

            {showHistory && (
              <ul className="mt-3 space-y-2 rounded-2xl border border-line bg-surface p-4 text-left text-xs">
                {localHistory.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-2 border-b border-line/70 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="font-medium text-ink">{item.fullName}</span>
                    <span className="text-muted">
                      {item.attendance === 'yes'
                        ? `Придёт (${item.guestsCount})`
                        : 'Не сможет'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
