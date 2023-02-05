import React from "react";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import GitHubcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "../Styles/Footer.css";

function Footer() {
    return (
        <div className="footer">
            <div className="socialMedia">
                <a href="tel:+8801723688633"><PhoneIcon /></a>
                <a href="mailto:shakururrahman@gmail.com" rel="noreferrer" target="_blank"><LocalPostOfficeIcon /></a>
                <a href="https://www.linkedin.com/in/shakururrahman/" rel="noreferrer" target="_blank"><LinkedInIcon /></a>
                <a href="https://github.com/ShakurUrRahman" rel="noreferrer" target="_blank"> <GitHubcon /></a>
            </div>
            <p> &copy; 2024 All rights reserved by Md. Shakurur Rahman</p>
        </div>
    );
}

export default Footer;