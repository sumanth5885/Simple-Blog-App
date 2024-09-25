import React, { useContext, useEffect, useState } from "react";
import "./HomePage.css";
import { BlogContext } from "../../store/BlogContext";
import Loading from "../../components/Loading/Loading";
import DataCard from "../../components/DataCard/DataCard";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../utils";

const HomePage = () => {
    const { blogsData, isLoading, fetchBlogsdata } = useContext(BlogContext);
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
        fetchBlogsdata();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        handleSuccess("User Logged Out");
        navigate("/login");
    };

    if (isLoading) return <Loading />;

    return (
        <div className="home-page">
            <button
                onClick={() => navigate("/create")}
                className="add-new-blog"
            >
                Add New Blog{" "}
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#fff"
                    >
                        <path d="M444-288h72v-156h156v-72H516v-156h-72v156H288v72h156v156Zm36.28 192Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                    </svg>
                </span>
            </button>
            {loggedInUser && (
                <div>
                    <h1>{loggedInUser}</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <div className="data-card-container">
                {blogsData?.length ? (
                    blogsData?.map((blog, index) => (
                        <DataCard key={index} blog={blog} />
                    ))
                ) : (
                    <h1>Empty Data</h1>
                )}
            </div>
        </div>
    );
};

export default HomePage;
