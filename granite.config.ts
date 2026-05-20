import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "randomdice",
  brand: {
    displayName: "랜덤 복불복 - 밥값 내기",
    primaryColor: "#3182F6",
    icon: "https://static.toss.im/appsintoss/41891/ae747f19-3281-4102-be7e-e32efb008a85.png",
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
