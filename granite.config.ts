import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "random-rice",
  brand: {
    displayName: "랜덤 복불복 - 밥값 내기",
    primaryColor: "#3182F6",
    icon: "https://static.toss.im/appsintoss/placeholder.png",
  },
  web: {
    host: "localhost",
    port: 5173,
    commands: {
      dev: "vite --port 5173",
      build: "vite build",
    },
  },
  permissions: [],
  outdir: "dist",
});
