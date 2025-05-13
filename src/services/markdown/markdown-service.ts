/**
 * Service for loading and processing Markdown files
 */
const markdownCache: Record<string, string> = {};

/**
 * Loads the content of a Markdown file
 * @param path Path to the Markdown file
 * @returns File content as a string
 */
export const loadMarkdownFile = async (path: string): Promise<string> => {
  if (markdownCache[path]) {
    return markdownCache[path];
  }
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.statusText}`);
    }

    const content = await response.text();
    
    markdownCache[path] = content;

    return content;
  } catch (error) {
    console.error("Error loading markdown file:", error);
    throw error;
  }
};

/**
 * Clears the Markdown files cache
 */
export const clearMarkdownCache = (): void => {
  Object.keys(markdownCache).forEach((key) => {
    delete markdownCache[key];
  });
};