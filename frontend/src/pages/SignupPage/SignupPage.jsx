import React, { useState } from "react";
import "./SignupPage.css";
import { handleError, handleSuccess } from "../../utils";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const SignupPage = () => {
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate()

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password } = signupData;
        if (!name || !email || !password) {
            return handleError("Please fill in all fields");
        }
        try {
            const apiResponse = await axios.post(
                "http://localhost:8000/api/user/signup",
                signupData, // This is the data that will be sent in the request body
                {
                    headers: {
                        "Content-Type": "application/json", // Setting content type
                    },
                }
            );
            const { message } = apiResponse.data;
            handleSuccess(message);
            navigate('/login')
            
        } catch (err) {
            const { success, message, error } = err?.response?.data;

            if (!success) {
                handleError(message);
            }
            if (error) {
                const details = error?.details[0].message;
                handleError(details);
            }
        }
    };

    return (
        <div className="sign-up">
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleOnChange}
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    autoFocus
                    autoComplete=""
                />
                <input
                    onChange={handleOnChange}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                />
                <input
                    onChange={handleOnChange}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                />
                <p>Already have an account? <Link to='/login'>Login here</Link></p>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default SignupPage;
