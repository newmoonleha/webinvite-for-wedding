/**
 * Склонение русских существительных по числу.
 * Пример: pluralizeRu(5, ['день', 'дня', 'дней']) -> 'дней'
 */
export function pluralizeRu(count: number, forms: [string, string, string]): string {
  const absCount = Math.abs(count) % 100;
  const lastDigit = absCount % 10;

  if (absCount > 10 && absCount < 20) {
    return forms[2];
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return forms[1];
  }
  if (lastDigit === 1) {
    return forms[0];
  }
  return forms[2];
}

export function padTwoDigits(value: number): string {
  return String(Math.max(0, value)).padStart(2, '0');
}
