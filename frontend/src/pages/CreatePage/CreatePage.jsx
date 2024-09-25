import React, { useContext, useState } from "react";
import "./CreatePage.css";
import axios from "axios";
import { BlogContext } from "../../store/BlogContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import { Store } from "react-notifications-component";
import upload_img from "../../assets/upload_img.png";

const CreatePage = () => {
    const { BACKEND_URL, isLoading, setIsLoading, fetchBlogsdata } =
        useContext(BlogContext);
    const navigate = useNavigate();

    const [blogImg, setBlogImg] = useState();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const onChnageHandler = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const newFormData = new FormData();
        newFormData.append("title", formData.title);
        newFormData.append("description", formData.description);
        newFormData.append("image", blogImg);

        try {
            setIsLoading(true);
            const apiResponse = await axios.post(
                `${BACKEND_URL}/add-blog`,
                newFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Set the content type
                    },
                }
            );

            if (apiResponse?.data) {
                await fetchBlogsdata();
                navigate("/");
                toast.success("Blog Created Successfully");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="create-page">
            <h1>
                Create New blog{" "}
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
            <form onSubmit={onSubmitHandler}>
                <label className="upload-img" htmlFor="upload">
                    <img src={blogImg ? URL.createObjectURL(blogImg) : upload_img} alt="" />
                </label>
                <input
                    type="file"
                    name="image"
                    id="upload"
                    onChange={(event) => setBlogImg(event.target.files[0])}
                    hidden
                />
                <input
                    onChange={(event) => onChnageHandler(event)}
                    value={formData.title}
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    required
                />
                <textarea
                    onChange={(event) => onChnageHandler(event)}
                    value={formData.description}
                    name="description"
                    placeholder="Enter Description Here"
                    required
                ></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default CreatePage;
