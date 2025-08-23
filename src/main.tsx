import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider, theme as antdTheme } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: antdTheme.darkAlgorithm,
        token: {
          colorPrimary: "#7C3AED", // фиолетовый неон
          colorInfo: "#06B6D4",
          colorSuccess: "#22C55E",
          colorWarning: "#F59E0B",
          colorError: "#EF4444",
          fontFamily:
            "'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial",
          borderRadius: 12,
          colorBgBase: "#0b0b14",
          colorTextBase: "#EAEAFF",
        },
        components: {
          Button: {
            controlHeight: 40,
            fontWeight: 600,
            borderRadius: 12,
          },
          Card: {
            borderRadius: 16,
            padding: 12,
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
