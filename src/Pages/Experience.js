import React from "react";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import '../Styles/Experience.css'

function Experience() {
    return (
        <div className="experience">
            <VerticalTimeline lineColor="#3e497a">
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="2007 - 2008"
                    iconStyle={{ background: "#3e497a", color: "#fff" }}
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
                    iconStyle={{ background: "#3e497a", color: "#fff" }}
                    icon={<SchoolIcon />}
                >
                    <h3 className="vertical-timeline-element-title">
                        University of Liberal Arts Bangladesh,<br /> <span className="area">Dhanmondi, Dhaka</span>
                    </h3>
                    <p> BSc in Electronics and Telecommunication Engineering</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="215"
                    iconStyle={{ background: "#e9d35b", color: "#fff" }}
                    icon={<WorkIcon />}
                >
                    <h3 className="vertical-timeline-element-title">
                        Internship - Taskeater
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        Mirpur, Dhaka
                    </h4>
                    <p>Developed the backend infrastructure for 3 projects.</p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2020 - present"
                    iconStyle={{ background: "#e9d35b", color: "#fff" }}
                    icon={<WorkIcon />}
                >
                    <h3 className="vertical-timeline-element-title">
                        Full Stack Engineer - Twitch
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        San Francisco, CA
                    </h4>
                    <p>
                        Helped the team launch 2 major features by working both in the front
                        end and back end.
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </div>
    );
}

export default Experience;