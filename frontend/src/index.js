import React from "react";
import ReactDOM from "react-dom/client";
 import App from "./App";
 import "./index.css";
// import App from "./TestDaisyUI"; // Temporary test
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = "pk_test_dmFzdC11cmNoaW4tNTcuY2xlcmsuYWNjb3VudHMuZGV2JA"; // from Clerk dashboard

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
