import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./contexts/UserContext";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </HelmetProvider>
  </StrictMode>
);
