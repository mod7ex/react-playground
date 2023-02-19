import React from "react";
import ReactDOM from "react-dom/client";
import "~/assets/scss/index.scss";
import App from "./App";
import "~/config";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
