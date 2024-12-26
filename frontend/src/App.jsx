//* Imporing the css files
import "./App.css";

//* Importing the npm packages
import React from "react";
import { BrowserRouter } from "react-router-dom";

//* Importing the user defined files
import { AuthProvider } from "./context/AuthContext";
import { APIProvider } from "./context/APIContext";
import RoutesList from "./routes/Routes";


function App() {
    return (
        <AuthProvider>
            <APIProvider>
                <Main />
            </APIProvider>
        </AuthProvider>
    );
}

function Main() {
    return (
        <BrowserRouter>
            <RoutesList />
        </BrowserRouter>
    );
}

export default App;
