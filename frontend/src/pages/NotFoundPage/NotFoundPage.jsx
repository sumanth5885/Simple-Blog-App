import React from "react";
import './NotFoundPage.css'
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="page-notfound">
            <div className="content-notfound">
                <div className="title">404</div>
                <strong>Oops! Page not found</strong>
                <p>
                    The page you are looking for was moved, removed, renamed or
                    might never exist.
                </p>
                <Link to='/' className="links-home">
                    Go home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
