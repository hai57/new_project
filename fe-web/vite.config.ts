import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import Checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    build: {
        outDir: "build",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        Checker({ typescript: true, enableBuild: true, overlay: true }),
        reactRefresh(),
        tsconfigPaths()
    ],
    server: {
        port: 3000, // Lấy cổng từ biến môi trường
        open: true, // Mở trình duyệt tự động
        // hmr: {
        //     overlay: false, // Tắt overlay lỗi
        // },
    },
    clearScreen: true,
});
