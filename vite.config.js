import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const GITHUB_PAGES_REPO_NAME = "bvyersin-indoornav";
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // command sẽ là 'serve' khi chạy 'npm run dev'
  // command sẽ là 'build' khi chạy 'npm run build' (bao gồm cả khi chạy 'npm run deploy')
  const base = command === "build" ? `/${GITHUB_PAGES_REPO_NAME}/` : "/";

  return {
    plugins: [react()],
    base: base,
  };
});
