import { useParams } from 'react-router-dom';
import { products } from "../data";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../Styles/SingleProject.css"
import { useContext } from 'react';
import { ThemeContext } from '../Context';

const SingleProject = () => {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    const { id } = useParams();
    const project = products[id];
    return (
        <div className="project" >
            <h1 style={{ backgroundColor: darkMode && "#333", color: darkMode && "white" }}>My Project</h1>
            <img src={project.img} alt="" />
            <p>
                <a href={project.link} rel="noreferrer" target="_blank">Live Link</a>
            </p>
            <GitHubIcon />
        </div>
    );
}

export default SingleProject;