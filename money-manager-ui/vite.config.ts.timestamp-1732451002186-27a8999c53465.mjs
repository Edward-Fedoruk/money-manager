// vite.config.ts
import { VitePWA } from "file:///Users/EFedo1/Documents/personal/money-manager-convertor/money-manager-ui/node_modules/vite-plugin-pwa/dist/index.js";
import { defineConfig } from "file:///Users/EFedo1/Documents/personal/money-manager-convertor/money-manager-ui/node_modules/vite/dist/node/index.js";
import react from "file:///Users/EFedo1/Documents/personal/money-manager-convertor/money-manager-ui/node_modules/@vitejs/plugin-react-swc/index.mjs";

// src/ui/manifest.json
var manifest_default = {
  name: "Money Manager",
  short_name: "MoneyManager",
  description: "App that allow you to track your expanses",
  start_url: "/index.html",
  display: "standalone",
  background_color: "#262626",
  theme_color: "#000000",
  orientation: "portrait",
  icons: [
    {
      src: "icons/icon-72x72.jpg",
      sizes: "101x101",
      type: "image/jpg"
    },
    {
      src: "icons/icon-96x96.jpg",
      sizes: "128x128",
      type: "image/jpg"
    },
    {
      src: "icons/icon-144x144.png",
      sizes: "144x144",
      type: "image/png"
    },
    {
      src: "icons/icon-144x144.jpg",
      sizes: "144x144",
      type: "image/jpg"
    },
    {
      src: "icons/icon-152x152.jpg",
      sizes: "152x152",
      type: "image/jpg"
    },
    {
      src: "icons/icon-192x192.jpg",
      sizes: "192x192",
      type: "image/jpg"
    },
    {
      src: "icons/icon-384x384.jpg",
      sizes: "384x384",
      type: "image/jpg"
    },
    {
      src: "icons/icon-512x512.jpg",
      sizes: "512x512",
      type: "image/jpg"
    }
  ],
  prefer_related_applications: false,
  screenshots: [
    {
      src: "screenshot-wide.png",
      sizes: "3060x1528",
      type: "image/png",
      form_factor: "wide",
      label: "Money Manager"
    },
    {
      src: "screenshot.png",
      sizes: "642x1216",
      type: "image/png",
      form_factor: "narrow",
      label: "Money Manager"
    }
  ]
};

// vite.config.ts
var vite_config_default = defineConfig({
  optimizeDeps: {
    exclude: ["@electric-sql/pglite"]
  },
  worker: {
    format: "es"
  },
  mode: "development",
  server: {
    port: 3e3,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp"
    }
  },
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      injectManifest: {
        maximumFileSizeToCacheInBytes: 13e6
      },
      srcDir: "src/ui/service-worker",
      filename: "common.worker.ts",
      // @ts-ignore
      manifest: manifest_default,
      strategies: "injectManifest"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3VpL21hbmlmZXN0Lmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvRUZlZG8xL0RvY3VtZW50cy9wZXJzb25hbC9tb25leS1tYW5hZ2VyLWNvbnZlcnRvci9tb25leS1tYW5hZ2VyLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvRUZlZG8xL0RvY3VtZW50cy9wZXJzb25hbC9tb25leS1tYW5hZ2VyLWNvbnZlcnRvci9tb25leS1tYW5hZ2VyLXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9FRmVkbzEvRG9jdW1lbnRzL3BlcnNvbmFsL21vbmV5LW1hbmFnZXItY29udmVydG9yL21vbmV5LW1hbmFnZXItdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgbWFuaWZlc3QgZnJvbSBcIi4vc3JjL3VpL21hbmlmZXN0Lmpzb25cIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICAgIGV4Y2x1ZGU6IFtcIkBlbGVjdHJpYy1zcWwvcGdsaXRlXCJdLFxuICAgIH0sXG4gICAgd29ya2VyOiB7XG4gICAgICAgIGZvcm1hdDogXCJlc1wiLFxuICAgIH0sXG4gICAgbW9kZTogXCJkZXZlbG9wbWVudFwiLFxuICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiAzMDAwLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNyb3NzLU9yaWdpbi1PcGVuZXItUG9saWN5XCI6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgIFwiQ3Jvc3MtT3JpZ2luLUVtYmVkZGVyLVBvbGljeVwiOiBcInJlcXVpcmUtY29ycFwiLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICBWaXRlUFdBKHtcbiAgICAgICAgICAgIGluamVjdFJlZ2lzdGVyOiBmYWxzZSxcbiAgICAgICAgICAgIGluamVjdE1hbmlmZXN0OiB7XG4gICAgICAgICAgICAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDEzXzAwMF8wMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3JjRGlyOiBcInNyYy91aS9zZXJ2aWNlLXdvcmtlclwiLFxuICAgICAgICAgICAgZmlsZW5hbWU6IFwiY29tbW9uLndvcmtlci50c1wiLFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgbWFuaWZlc3QsXG4gICAgICAgICAgICBzdHJhdGVnaWVzOiBcImluamVjdE1hbmlmZXN0XCIsXG4gICAgICAgIH0pLFxuICAgIF0sXG59KTtcbiIsICJ7XG4gICAgXCJuYW1lXCI6IFwiTW9uZXkgTWFuYWdlclwiLFxuICAgIFwic2hvcnRfbmFtZVwiOiBcIk1vbmV5TWFuYWdlclwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBcHAgdGhhdCBhbGxvdyB5b3UgdG8gdHJhY2sgeW91ciBleHBhbnNlc1wiLFxuICAgIFwic3RhcnRfdXJsXCI6IFwiL2luZGV4Lmh0bWxcIixcbiAgICBcImRpc3BsYXlcIjogXCJzdGFuZGFsb25lXCIsXG4gICAgXCJiYWNrZ3JvdW5kX2NvbG9yXCI6IFwiIzI2MjYyNlwiLFxuICAgIFwidGhlbWVfY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgXCJvcmllbnRhdGlvblwiOiBcInBvcnRyYWl0XCIsXG4gICAgXCJpY29uc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwiaWNvbnMvaWNvbi03Mng3Mi5qcGdcIixcbiAgICAgICAgICAgIFwic2l6ZXNcIjogXCIxMDF4MTAxXCIsXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9qcGdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInNyY1wiOiBcImljb25zL2ljb24tOTZ4OTYuanBnXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTI4eDEyOFwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvanBnXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJpY29ucy9pY29uLTE0NHgxNDQucG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTQ0eDE0NFwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJpY29ucy9pY29uLTE0NHgxNDQuanBnXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTQ0eDE0NFwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvanBnXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJpY29ucy9pY29uLTE1MngxNTIuanBnXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTUyeDE1MlwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvanBnXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJpY29ucy9pY29uLTE5MngxOTIuanBnXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvanBnXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJpY29ucy9pY29uLTM4NHgzODQuanBnXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMzg0eDM4NFwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvanBnXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJzcmNcIjogXCJpY29ucy9pY29uLTUxMng1MTIuanBnXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvanBnXCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJwcmVmZXJfcmVsYXRlZF9hcHBsaWNhdGlvbnNcIjogZmFsc2UsXG4gICAgXCJzY3JlZW5zaG90c1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwic3JjXCI6IFwic2NyZWVuc2hvdC13aWRlLnBuZ1wiLFxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjMwNjB4MTUyOFwiLFxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICBcImZvcm1fZmFjdG9yXCI6IFwid2lkZVwiLFxuICAgICAgICAgICAgXCJsYWJlbFwiOiBcIk1vbmV5IE1hbmFnZXJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInNyY1wiOiBcInNjcmVlbnNob3QucG5nXCIsXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiNjQyeDEyMTZcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgXCJmb3JtX2ZhY3RvclwiOiBcIm5hcnJvd1wiLFxuICAgICAgICAgICAgXCJsYWJlbFwiOiBcIk1vbmV5IE1hbmFnZXJcIlxuICAgICAgICB9XG4gICAgXVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2WSxTQUFTLGVBQWU7QUFDcmEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXOzs7QUNGbEI7QUFBQSxFQUNJLE1BQVE7QUFBQSxFQUNSLFlBQWM7QUFBQSxFQUNkLGFBQWU7QUFBQSxFQUNmLFdBQWE7QUFBQSxFQUNiLFNBQVc7QUFBQSxFQUNYLGtCQUFvQjtBQUFBLEVBQ3BCLGFBQWU7QUFBQSxFQUNmLGFBQWU7QUFBQSxFQUNmLE9BQVM7QUFBQSxJQUNMO0FBQUEsTUFDSSxLQUFPO0FBQUEsTUFDUCxPQUFTO0FBQUEsTUFDVCxNQUFRO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNJLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0ksS0FBTztBQUFBLE1BQ1AsT0FBUztBQUFBLE1BQ1QsTUFBUTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsTUFDSSxLQUFPO0FBQUEsTUFDUCxPQUFTO0FBQUEsTUFDVCxNQUFRO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNJLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0ksS0FBTztBQUFBLE1BQ1AsT0FBUztBQUFBLE1BQ1QsTUFBUTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsTUFDSSxLQUFPO0FBQUEsTUFDUCxPQUFTO0FBQUEsTUFDVCxNQUFRO0FBQUEsSUFDWjtBQUFBLElBQ0E7QUFBQSxNQUNJLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxJQUNaO0FBQUEsRUFDSjtBQUFBLEVBQ0EsNkJBQStCO0FBQUEsRUFDL0IsYUFBZTtBQUFBLElBQ1g7QUFBQSxNQUNJLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxNQUNSLGFBQWU7QUFBQSxNQUNmLE9BQVM7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLE1BQ0ksS0FBTztBQUFBLE1BQ1AsT0FBUztBQUFBLE1BQ1QsTUFBUTtBQUFBLE1BQ1IsYUFBZTtBQUFBLE1BQ2YsT0FBUztBQUFBLElBQ2I7QUFBQSxFQUNKO0FBQ0o7OztBRDlEQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixjQUFjO0FBQUEsSUFDVixTQUFTLENBQUMsc0JBQXNCO0FBQUEsRUFDcEM7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLFFBQVE7QUFBQSxFQUNaO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDTCw4QkFBOEI7QUFBQSxNQUM5QixnQ0FBZ0M7QUFBQSxJQUNwQztBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNKLGdCQUFnQjtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLFFBQ1osK0JBQStCO0FBQUEsTUFDbkM7QUFBQSxNQUNBLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQTtBQUFBLE1BRVY7QUFBQSxNQUNBLFlBQVk7QUFBQSxJQUNoQixDQUFDO0FBQUEsRUFDTDtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
