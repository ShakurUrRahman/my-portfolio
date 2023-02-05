import React from 'react';
import '../Styles/About.css'
import Ph from '../assets/ph.jpg'

const About = () => {
    return (
        <div className="a">
            <div className="a-left">
                <div className="a-card bg"></div>
                <div className="a-card">
                    <img
                        src="https://imageio.forbes.com/blogs-images/forbestechcouncil/files/2019/01/canva-photo-editor-8-7.jpg?format=jpg&width=960"
                        alt=""
                        className="a-img"
                    />
                </div>
            </div>
            <div className="a-right">
                <h1 className="a-title">About Me</h1>
                <p className="a-sub">
                    A self-motivated individual, keen to work in the web development sector to build up a successful career in a growing organization, using the experience I have acquired in my academic and professional training areas.
                </p>
                <p className="a-desc">

                </p>
                <div className="a-award">
                    <img src={Ph} alt="" className="a-award-img" />
                    <div className="a-award-texts">
                        <h4 className="a-award-title">Complete Web Development Course 2022</h4>
                        <p className="a-award-desc">
                            Programming Hero
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;