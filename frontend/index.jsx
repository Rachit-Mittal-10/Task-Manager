import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import config from "@utils/config.js";


// IIFE
(async ()=>{
    // this loads the config before app rendering. application wait here.
    try{
        await config.load();
        const { default: App } = await import("@app/App");
        createRoot(document.getElementById("root")).render(
            <StrictMode>
                <App />
            </StrictMode>
        );
    }
    catch (err) {
        console.log("Failed to load the application:", err);
        document.getElementById("root").innerText = "Error 404. Failed to load the application. Contact the administrator."
    }
})();
