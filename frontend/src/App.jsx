import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import EditPage from "./pages/EditPage/EditPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";
import RefreshHandler from "./components/RefreshHandler/RefreshHandler";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const PrivateRoute = ({element}) => {
        return isAuthenticated ? element : <Navigate to='/login' />
    }
    return (
        <>
            <ToastContainer />
            <ReactNotifications />
            <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<PrivateRoute element={<HomePage/>} />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/edit/:id" element={<EditPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
