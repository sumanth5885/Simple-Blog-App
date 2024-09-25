import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { handleError } from "../utils";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
    const BACKEND_URL = "http://localhost:8000/api/blogs";
    const imageUrl = "http://localhost:8000/images";
    const URL = "http://localhost:3000/blogs";
    const [blogsData, setBlogsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const headers = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }

    const fetchBlogsdata = async () => {
        try {
            setIsLoading(true);
            const apiResponse = await axios.get(`${BACKEND_URL}/get-all-blogs`, headers);
            if (apiResponse?.data) {
                setBlogsData(apiResponse.data);
            }
        } catch (error) {
            console.log(error);
            handleError(error?.response?.data?.message)

        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteBlog = async (blogId) => {
        console.log(`${BACKEND_URL}/delete-blog/${blogId}`);
        try {
            // let isConfirm = window.confirm("Are you sure to delete this blog")
            await axios.delete(`${BACKEND_URL}/delete-blog/${blogId}`);
            fetchBlogsdata();
            toast.error("Blog Deleted");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBlogsdata();
    }, []);

    const contextValues = {
        BACKEND_URL,
        imageUrl,
        URL,
        blogsData,
        setBlogsData,
        isLoading,
        setIsLoading,
        fetchBlogsdata,
        handleDeleteBlog,
    };

    return (
        <BlogContext.Provider value={contextValues}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
