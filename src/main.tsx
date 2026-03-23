import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { worker } from "./mocks/browser";
import { router } from "./routes/router";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { AuthProvider } from "./contexts/AuthContext";

//MSW worker - start before rendering
async function startApp() {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: "warn",
    });
    console.log("MSW worker started successfully");
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  );
}

startApp().catch((error) => {
  console.error("Failed to start app:", error);
});
