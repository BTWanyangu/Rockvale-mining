import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import "./index.css";
const root = document.getElementById("root")!;
const application = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
// Adopt the production HTML and metadata; the development template is empty.
if (root.querySelector(".site-shell")) hydrateRoot(root, application);
else createRoot(root).render(application);
