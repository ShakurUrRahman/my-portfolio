import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GithubIcon from "@mui/icons-material/GitHub";

import "../Styles/Home.css";
import { Link } from "react-router-dom";
import Contact from "../Components/Contact";
import Projects from "./Projects";
import Me from '../assets/Me.png'
import About from "../Components/About";

function Home() {
    return (
        // <div className="home">
        //     <div className="about">
        //         <h2> Hi, My Name is Md. Shakurur Rahman</h2>
        //         <div className="prompt">
        //             <p>A web developer with a passion for learning and creating.</p>
        //             <a href="https://www.linkedin.com/in/shakururrahman/" target="_blank" rel="noreferrer"> <LinkedInIcon /></a>
        //             <EmailIcon />
        //             <GithubIcon />
        //         </div>
        //     </div>
        //     <div className="skills">
        //         <h1> Skills</h1>
        //         <ol className="list">
        //             <li className="item">
        //                 <h2> Front-End</h2>
        //                 <span>
        //                     ReactJS, Angular, Redux, HTML, CSS, React Native, Flutter, NPM,
        //                     Ionic, BootStrap, MaterialUI, Yarn, TailwindCSS, StyledComponents
        //                 </span>
        //             </li>
        //             <li className="item">
        //                 <h2>Back-End</h2>
        //                 <span>
        //                     NodeJS, Java Spring, .NET, ExpressJS, GraphQL, ApolloServer,
        //                     MySQL, MongoDB, DynamoDB, DigitalOcean, AWS S3, MS SQL
        //                 </span>
        //             </li>
        //             <li className="item">
        //                 <h2>Languages</h2>
        //                 <span>JavaScript, Java, Python, C#, C, C++, TypeScript, Go</span>
        //             </li>
        //         </ol>
        //     </div>
        //     <Projects></Projects>
        //     <Contact></Contact>
        // </div>
        <div className="i">
            <div className="i-left">
                <div className="i-left-wrapper">
                    <h2 className="i-intro">Hello, My name is</h2>
                    <h1 className="i-name">Md. Shakurur Rahman</h1>
                    <div className="i-title">
                        <div className="i-title-wrapper">
                            <div className="i-title-item">Web Developer</div>
                            <div className="i-title-item">Front-end Developer</div>
                            <div className="i-title-item">React Developer</div>
                            <div className="i-title-item">Full Stack Developer</div>
                            <div className="i-title-item">Content Creator</div>
                        </div>
                    </div>
                    <p className="i-desc">
                        I design and develop services for customers of all sizes,
                        specializing in creating stylish, modern websites, web services and
                        online stores.
                    </p>
                </div>
            </div>
            <div className="i-right">
                <div className="i-bg"></div>
                <img src={Me} alt="" className="i-img" />
            </div>
        </div>
    );
}

export default Home;