import React, { useContext, useEffect, useState } from "react";
import "./EditPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BlogContext } from "../../store/BlogContext";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { BACKEND_URL, fetchBlogsdata, isLoading, setIsLoading, imageUrl } =
        useContext(BlogContext);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [blogImg, setBlogImg] = useState();

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const newFormData = new FormData();
        newFormData.append("title", formData.title);
        newFormData.append("description", formData.description);
        if (blogImg) {
            newFormData.append("image", blogImg);
        }

        try {
            setIsLoading(true);
            const apiResponse = await axios.put(
                `${BACKEND_URL}/update-blog/${id}`,
                newFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Set the content type
                    },
                }
            );
            if (apiResponse) {
                fetchBlogsdata();
                toast.success("Blog Edited Successfully");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSingleData = async () => {
        try {
            const apiResponse = await axios.get(
                `${BACKEND_URL}/get-single-blog/${id}`
            );
            const { data } = apiResponse;
            setFormData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSingleData();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className="edit-page">
            <h1>
                Edit blog{" "}
                <button onClick={() => navigate("/")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#ffffff"
                    >
                        <path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z" />
                    </svg>
                </button>
            </h1>
            <form onSubmit={handleOnSubmit}>
                <label className="upload-img" htmlFor="upload">
                    <img
                        src={
                            !blogImg
                                ? `${imageUrl}/${formData.blogImg}`
                                : URL.createObjectURL(blogImg)
                        }
                        alt=""
                    />
                </label>
                <input
                    type="file"
                    name="image"
                    id="upload"
                    onChange={(event) => setBlogImg(event.target.files[0])}
                    hidden
                />
                <input
                    value={formData?.title}
                    onChange={(event) => handleOnChange(event)}
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    required
                />
                <textarea
                    value={formData?.description}
                    onChange={(event) => handleOnChange(event)}
                    name="description"
                    placeholder="Enter Description Here"
                    required
                ></textarea>
                <p>Last Edited: {formData.updatedAt}</p>
                <button type="submit">Edit</button>
            </form>
        </div>
    );
};

export default EditPage;
