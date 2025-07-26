import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";

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
