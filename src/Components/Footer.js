import React, { Link } from "react";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "../Styles/Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="socialMedia">


                <a href="https://www.linkedin.com/in/shakururrahman/" rel="noreferrer" target="_blank"><LinkedInIcon /></a>
                <a href="mailto:shakururrahman@gmail.com" rel="noreferrer" target="_blank"><LocalPostOfficeIcon /></a>
                <TwitterIcon />
                <FacebookIcon />
            </div>
            <p> &copy; 2024 All rights reserved by Md. Shakurur Rahman</p>
        </div>
    );
}

export default Footer;