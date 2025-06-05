import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const GITHUB_PAGES_REPO_NAME = "bvyersin-indoornav";

export default defineConfig(({ command }) => {
  const base = command === "build" ? `/${GITHUB_PAGES_REPO_NAME}/` : "/";

  return {
    plugins: [react()],
    base: base,
  };
});
