/**
 * Сервис для загрузки и обработки Markdown-файлов
 */
// Кэш для хранения загруженных Markdown-файлов
const markdownCache: Record<string, string> = {};
/**
 * Загружает содержимое Markdown-файла
 * @param path Путь к Markdown-файлу
 * @returns Содержимое файла в виде строки
 */
export const loadMarkdownFile = async (path: string): Promise<string> => {
  // Если файл уже в кэше, возвращаем его
  if (markdownCache[path]) {
    return markdownCache[path];
  }
  try {
    // Загружаем файл через fetch
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.statusText}`);
    }

    const content = await response.text();

    // Сохраняем в кэш
    markdownCache[path] = content;

    return content;
  } catch (error) {
    console.error("Error loading markdown file:", error);
    throw error;
  }
};
/**
 * Очищает кэш Markdown-файлов
 */
export const clearMarkdownCache = (): void => {
  Object.keys(markdownCache).forEach((key) => {
    delete markdownCache[key];
  });
};
