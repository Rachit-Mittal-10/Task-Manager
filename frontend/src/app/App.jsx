import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@context/AuthContext";
import Main from "./layout/Main";
import Header from "./layout/Header";

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
