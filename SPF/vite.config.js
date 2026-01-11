import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace "SPF" with your repo name
export default defineConfig({
  plugins: [react()],
  base: "/SPF/", 
});
