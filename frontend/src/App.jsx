//* Imporing the css files
import "./App.css";

//* Importing the npm packages
import React from "react";
import { BrowserRouter } from "react-router-dom";

//* Importing the user defined files
import { AuthProvider } from "./context/AuthContext";
import RoutesList from "./routes/Routes";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Main />
            </AuthProvider>
        </BrowserRouter>
    );
}

function Main() {
    return <RoutesList />;
}

export default App;
