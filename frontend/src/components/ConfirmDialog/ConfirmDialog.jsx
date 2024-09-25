import React from "react";
import "./ConfirmDialog.css";

const ConfirmDialog = ({  onConfirm, onCancel }) => {
    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <p>Confirm Delete</p>
                <div className="confirm-dialog-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
