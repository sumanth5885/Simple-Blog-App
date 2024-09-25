import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import BlogContextProvider from "./store/BlogContext.jsx";
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <BlogContextProvider>
            <App />
        </BlogContextProvider>
    </BrowserRouter>
);
