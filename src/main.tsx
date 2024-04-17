import React from "react";
import ReactDOM from "react-dom/client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
      <Toaster duration={2000} position="top-right" richColors />
    </LocalizationProvider>
  </React.StrictMode>
);
