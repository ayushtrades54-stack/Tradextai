export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["@google/generative-ai"]
    }
  }
});
