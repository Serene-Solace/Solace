import logo from "./logo.svg";
import email from "./email_sign.svg";
import phn from "./phn_sign.svg";
import "./footer.css";

function Footbar() {
    return (
        <footer className="footer">
            <div>
                <img src={logo} alt="Logo" className="footbar-logo" />
                <p>AI Based Content Summerization</p>
                <ul>
                    <li><img src={email} alt="email" className="email" /><span>pankajsharma310898@gmail.com</span></li>
                    <li><img src={phn} alt="phn" className="phn" /><span>+918094502587</span></li>
                </ul>
            </div>
            <div className="quick">
                <h3>Quick Links</h3>
                <ul>
                    <li>How to do X?</li>
                    <li>How to do X?</li>
                    <li>How to do X?</li>
                    <li>How to do X?</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footbar;