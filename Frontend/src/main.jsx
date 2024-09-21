import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router.jsx";
import { Toaster } from "sonner";
import UserDetailsProvider from "./Store/user-store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserDetailsProvider>
      <AppRouter />
      <Toaster />
    </UserDetailsProvider>
  </StrictMode>
);
