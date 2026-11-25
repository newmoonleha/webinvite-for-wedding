import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

declare const process: {
  env: Record<string, string | undefined>;
};

function resolveBasePath(): string {
  // На GitHub Actions автоматически подставляем '/<repo-name>/',
  // если это не корневой репозиторий '<username>.github.io'.
  if (process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    if (repoName && !repoName.endsWith('.github.io')) {
      return `/${repoName}/`;
    }
  }
  return '/';
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: resolveBasePath(),
});
