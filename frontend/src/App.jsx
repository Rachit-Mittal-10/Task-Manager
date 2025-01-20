import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Main from "./Components/Main";
import Header from "./Components/Header";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Main />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
