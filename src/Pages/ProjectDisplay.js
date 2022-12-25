import React from "react";
import { useParams } from "react-router-dom";
import { ProjectList } from "../Helpers/ProjectList";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../Styles/ProjectDisplay.css";

function ProjectDisplay() {
    const { id } = useParams();
    const project = ProjectList[id];
    return (
        <div className="project">
            <h1> {project.name}</h1>
            <img src={project.image} alt="" />
            <p>
                <b>Skills:</b> {project.skills}
            </p>
            <ol type="I">
                <li>My Project Details</li>
                <li>My Project Details</li>
                <li>My Project Details</li>
            </ol>
            <GitHubIcon />
        </div>
    );
}

export default ProjectDisplay;