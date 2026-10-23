import type {
  ApiErrorPayload,
  ApiGetFunction,
  CommonSettings,
  PageData,
  PagePath,
} from './types';

export const API_URL: string =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Універсальна типізована асинхронна функція виконання GET-запиту до API
 */
export const getJson: ApiGetFunction = async <T>(endpoint: string): Promise<T> => {
  const response: Response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    let errorDetail = `HTTP status: ${response.status} (${response.statusText})`;
    try {
      const errBody = (await response.json()) as Partial<ApiErrorPayload>;
      if (errBody.error) {
        errorDetail = `${errBody.error} (HTTP ${response.status})`;
      }
    } catch {
      // Якщо тіло помилки не є JSON, залишаємо стандартний статус
    }
    throw new Error(errorDetail);
  }

  return (await response.json()) as T;
};

/**
 * Запит глобальних налаштувань сайту (Хедер, Меню, Статус БД, Футер) з ендпоінта /api/common
 */
export function getCommon(): Promise<CommonSettings> {
  return getJson<CommonSettings>('/api/common');
}

/**
 * Аліас для зворотної сумісності з /api/settings
 */
export function getSettings(): Promise<CommonSettings> {
  return getCommon();
}

/**
 * Запит структури та масиву блоків конкретної сторінки з ендпоінта /api/page?path=...
 */
export function getPage(path: PagePath): Promise<PageData> {
  return getJson<PageData>(`/api/page?path=${encodeURIComponent(path)}`);
}
