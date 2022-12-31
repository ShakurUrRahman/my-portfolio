import "../Styles/Contact.css";
import Phone from "../../src/img/phone.png";
import Email from "../../src/img/email.png";
import Address from "../../src/img/address.png";

const Contact = () => {
    return (
        <div className="c">
            <div className="c-bg"></div>
            <div className="c-wrapper">
                <div className="c-left">
                    <h1 className="c-title">Let's discuss your project</h1>
                    <div className="c-info">
                        <div className="c-info-item">
                            <img src={Phone} alt="" className="c-icon" />
                            +88 01723 688 633
                        </div>
                        <div className="c-info-item">
                            <img className="c-icon" src={Email} alt="" />
                            shakururrahman@gmail.com
                        </div>
                        <div className="c-info-item">
                            <img className="c-icon" src={Address} alt="" />
                            23 Mem Kuthi, Islam Bagh, Holan road, Dakshin Khan, Dhaka-1230
                        </div>
                    </div>
                </div>
                <div className="c-right">
                    <p className="c-desc">
                        <b>What’s your story?</b> Get in touch. Always available for
                        freelancing if the right project comes along. me.
                    </p>
                    <form action="https://public.herotofu.com/v1/a78ffc00-7a35-11ed-ae39-e5d94069e299" method="post">
                        <input name="Name" placeholder="Name" id="name" type="text" required />
                        <input type="text" placeholder="Subject" name="Subject" />
                        <input name="Email" placeholder="Email" id="email" type="email" required />
                        <textarea rows="5" placeholder="Message" name="message" />
                        <button type="submit" value="Download CTA">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;