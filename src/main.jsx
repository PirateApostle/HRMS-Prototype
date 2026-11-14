import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

class AppErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("HRMS app failed to render:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          style={{
            maxWidth: "42rem",
            margin: "4rem auto",
            padding: "2rem",
            color: "#102A43",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1.5,
          }}
        >
          <h1>HRMS could not load</h1>
          <p>
            The page encountered an error while starting. Refresh to try again.
            If the problem continues, open your browser developer console and
            share the first error with the site administrator.
          </p>
        </main>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Required app mount element "#root" was not found.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
);
