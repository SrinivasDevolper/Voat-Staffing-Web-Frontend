import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./studentsComponents/contexts/NotificationContext.jsx";
import { UserJobProvider } from "./studentsComponents/contexts/UserJobContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserJobProvider>
      <NotificationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationProvider>
    </UserJobProvider>
  </StrictMode>
);
