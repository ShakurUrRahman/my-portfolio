import { Link, useLocation } from "react-router-dom";
import "../Styles/Navbar.css";
import ReorderIcon from '@mui/icons-material/Reorder';
import { useEffect, useState } from "react";

function Navbar() {
    const [expandNavbar, setExpandNavbar] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setExpandNavbar(false);
    }, [location]);

    return (
        <div className="navbar" id={expandNavbar ? "open" : "close"}>
            <div className="toggleButton">
                <button
                    onClick={() => {
                        setExpandNavbar((prev) => !prev);
                    }}
                >
                    <ReorderIcon />
                </button>
            </div>
            <div className="links">
                <Link to="/"> Home </Link>
                <Link to="/projects"> Projects </Link>
                <Link to="/experience"> Experience </Link>
                <Link to="/blogs"> Blogs </Link>
                <a href="https://drive.google.com/file/d/1-KPiJwzzewAfbR5CeD7wPKbTUfyWzBgi/view" target="_blank" rel="noreferrer"> Download My RESUME </a>
            </div>
        </div>
    );
}

export default Navbar;