import React from "react";
import ReactDOM from "react-dom/client";
 import App from "./App";
 import "./index.css";
// import App from "./TestDaisyUI"; // Temporary test
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = "pk_live_Y2xlcmsuZXhhbXBsZTExMTExLmNvbSQ"; // from Clerk dashboard

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
