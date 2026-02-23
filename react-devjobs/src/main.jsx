import { StrictMode } from "react";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavContext";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
);
