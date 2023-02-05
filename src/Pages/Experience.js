import React, { useContext } from "react";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import '../Styles/Experience.css'
import { ThemeContext } from "../Context";

function Experience() {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
    return (
        <div className="experience" style={{ backgroundColor: darkMode && "#575757", color: darkMode && "black" }} >
            <VerticalTimeline lineColor="#1a258a">
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2007 - 2008"
                    iconStyle={{ background: "#1a258a", color: "#fff" }}
                    icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">
                        Khulna Public College, <br /><span className="area">Boyra, Khulna</span>
                    </h3>
                    <p> Higher Secondary Certificate</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2009 - 2015"
                    iconStyle={{ background: "#1a258a", color: "#fff" }}
                    icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">
                        University of Liberal Arts Bangladesh,<br /> <span className="area">Dhanmondi, Dhaka</span>
                    </h3>
                    <p> BSc in Electronics and Telecommunication Engineering</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2016"
                    iconStyle={{ background: "#e9d35b", color: "#fff" }}
                    icon={<WorkIcon />}
                >
                    <h3 className="vertical-timeline-element-title">
                        Internship - Taskeater
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        Mirpur, Dhaka
                    </h4>
                    <p>Organized several clients projects.</p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2016 - present"
                    iconStyle={{ background: "#e9d35b", color: "#fff" }}
                    icon={<WorkIcon />}
                >
                    <h3 className="vertical-timeline-element-title">
                        Inside Sales Associate - Quantanite
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        Mirpur, Dhaka
                    </h4>
                    <p>
                        Helped the team to growth inside sales.
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </div>
    );
}

export default Experience;