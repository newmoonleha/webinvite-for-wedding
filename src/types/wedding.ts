export type ThemeId = 'neutral-linen' | 'warm-sand' | 'sage-minimal';

export interface ThemeTokens {
  id: ThemeId;
  label: string;
  colors: {
    bg: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    accent: string;
    accentSoft: string;
    accentContrast: string;
    border: string;
  };
}

/**
 * Единый формат описания изображений.
 * Пока фотографий нет — передавайте `src: null`, чтобы отображалась аккуратная заглушка.
 */
export interface MediaAsset {
  src: string | null;
  alt: string;
  objectPosition?: string;
  placeholderTitle?: string;
  placeholderSubtitle?: string;
}

export type TimelineIconKey =
  | 'sparkles'
  | 'heart'
  | 'utensils'
  | 'music'
  | 'camera'
  | 'glass'
  | 'clock';

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  icon?: TimelineIconKey;
}

export interface DressCodeColor {
  name: string;
  hex: string;
  note?: string;
}

export interface GalleryPhotoItem {
  id: string;
  asset: MediaAsset;
  caption?: string;
}

export interface VideoStoryConfig {
  enabled: boolean;
  title: string;
  description: string;
  videoUrl: string | null;
  poster?: MediaAsset;
}

export interface SectionVisibility {
  hero: boolean;
  invitation: boolean;
  timeline: boolean;
  location: boolean;
  dressCode: boolean;
  rsvp: boolean;
  footer: boolean;
  /** Задел на будущее: фотогалерея пары */
  gallery: boolean;
  /** Задел на будущее: видеоистория пары */
  videoStory: boolean;
}

export interface WeddingConfig {
  themeId: ThemeId;
  meta: {
    pageTitle: string;
    language: string;
  };
  couple: {
    firstPartner: string;
    secondPartner: string;
    separator: string;
    monogram: string;
    familyName?: string;
  };
  date: {
    /** ISO-строка с датой и временем начала события для таймера обратного отсчёта */
    isoDateTime: string;
    /** Красивая строка даты для отображения пользователю */
    displayDate: string;
    /** День недели и город/формат (опционально) */
    displaySubtitle: string;
  };
  hero: {
    eyebrow: string;
    ctaLabel: string;
    photo: MediaAsset;
  };
  invitation: {
    title: string;
    paragraphs: string[];
    signature: string;
  };
  timeline: {
    eyebrow: string;
    title: string;
    subtitle: string;
    events: TimelineEvent[];
  };
  location: {
    eyebrow: string;
    title: string;
    venueName: string;
    address: string;
    details: string;
    routeButtonLabel: string;
    /** Ссылка на маршрут (Яндекс.Карты / Google Maps / 2GIS). Если не указана, строится автоматически по координатам или адресу. */
    routeUrl?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    venuePhoto: MediaAsset;
    /** Задел на будущее: URL для iframe или флаг подключения интерактивной карты */
    mapIntegration: {
      embedUrl: string | null;
      providerHint: string;
    };
  };
  dressCode: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    palette: DressCodeColor[];
  };
  rsvp: {
    eyebrow: string;
    title: string;
    subtitle: string;
    deadlineText: string;
    maxGuestsPerInvite: number;
    submitButtonLabel: string;
    successTitle: string;
    successMessage: string;
  };
  footer: {
    thankYouText: string;
    organizer: {
      roleLabel: string;
      name: string;
      phone: string;
      messengerHandle: string;
      isPlaceholder: boolean;
    };
  };
  /** Задел на будущее: секции, которые легко включить позже */
  future: {
    gallery: {
      title: string;
      subtitle: string;
      items: GalleryPhotoItem[];
    };
    videoStory: VideoStoryConfig;
  };
  sections: SectionVisibility;
}

export type AttendanceChoice = 'yes' | 'no';

export interface RsvpSubmission {
  fullName: string;
  attendance: AttendanceChoice;
  guestsCount: number;
  comment: string;
}

export interface RsvpRecord extends RsvpSubmission {
  id: string;
  submittedAt: string;
  storageMode: 'local-stub' | 'remote-api';
}

export interface RsvpServiceResult {
  ok: boolean;
  record?: RsvpRecord;
  errorMessage?: string;
}

/**
 * Контракт сервиса RSVP.
 * В MVP используется локальная заглушка (localStorage),
 * а в будущем сюда без изменения UI подключается реальный backend API.
 */
export interface IRsvpService {
  readonly mode: 'local-stub' | 'remote-api';
  submit(payload: RsvpSubmission): Promise<RsvpServiceResult>;
  listLocalSubmissions(): Promise<RsvpRecord[]>;
}
