import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { handleError, handleSuccess } from "../../utils";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BlogContext } from "../../store/BlogContext";

const LoginPage = () => {
    const { fetchBlogsdata } = useContext(BlogContext);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = loginData;
        if (!email || !password) {
            return handleError("Please fill in all fields");
        }
        try {
            const apiResponse = await axios.post(
                "http://localhost:8000/api/user/login",
                loginData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const { message, success, jwtToken, name } = apiResponse?.data;

            if (success) {
                // Store the token and user information
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", name);

                handleSuccess(message);

                // Fetch blogs immediately after successful login
                fetchBlogsdata();

                // Navigate to homepage after successful login
                navigate("/");
            }
        } catch (err) {
            const { success, message, error } = err?.response?.data;
            if (!success) {
                handleError(message);
            }
            if (error) {
                const details = error?.details[0]?.message;
                handleError(details);
            }
        }
    };

    return (
        <div className="sign-up">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleOnChange}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={loginData.email} // Ensure controlled input
                />
                <input
                    onChange={handleOnChange}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={loginData.password} // Ensure controlled input
                />
                <p>
                    Don't have an account? <Link to="/signup">Signup here</Link>
                </p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
