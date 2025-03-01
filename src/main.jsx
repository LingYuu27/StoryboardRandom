import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import EnrichedComicGenerator from "./ComicGenerator.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <EnrichedComicGenerator />
    </StrictMode>
);