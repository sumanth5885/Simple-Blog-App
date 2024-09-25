import React, { useContext, useState } from "react";
import "./DataCard.css";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../store/BlogContext";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const DataCard = ({ blog }) => {
    const { _id, title, description, createdAt, blogImg } = blog;
    const { handleDeleteBlog, imageUrl } = useContext(BlogContext);
    const navigate = useNavigate();
    const [showDialogue, setShowDialogue] = useState(false);

    // Check if the createdDate is valid before formatting
    let formattedDate = "N/A"; // Fallback value
    if (createdAt) {
        const parsedDate = new Date(createdAt);
        if (!isNaN(parsedDate.getTime())) {
            formattedDate = parsedDate.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
        }
    }

    const handleDeleteclick = () => {
        setShowDialogue(true);
    };

    const handleConfirmDelete = () => {
        setShowDialogue(false);
        handleDeleteBlog(_id);
    };
    const handleCancelDelete = () => {
        setShowDialogue(false);
    };

    return (
        <div className="data-card">
            {showDialogue && (
                <ConfirmDialog
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
            <div className="image-container">
                {blogImg && <img src={`${imageUrl}/${blogImg}`} />}
            </div>
            <h2 className="card-title">{title}</h2>
            <p className="card-desc">{description}</p>
            <div className="card-buttons">
                <div className="button-container">
                    <button
                        data-purpose="edit"
                        style={{ "--purpose-color": "grey" }}
                        onClick={() => navigate(`/edit/${_id}`)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#e8eaed"
                        >
                            <path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                        </svg>
                    </button>
                    <button
                        data-purpose="delete"
                        style={{ "--purpose-color": "orange" }}
                        onClick={() => handleDeleteclick()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#ffffff"
                        >
                            <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                        </svg>
                    </button>
                </div>
                <p className="created-date">{formattedDate}</p>
            </div>
        </div>
    );
};

export default DataCard;
