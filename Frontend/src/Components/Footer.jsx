import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-cta">
          <div className="cta-content">
            <h3 className="cta-heading">
              The easiest way <br />
              to get your new job
            </h3>
            <div className="cta-button">
              <button className="btn-job">
                <Link to="/jobs" className="link-css-reset">
                  Find your Job Now
                </Link>
              </button>
            </div>
          </div>
          <div className="cta-side-image"></div>
        </div>
        <div className="footer-container">
          <div className="footer-side-image"></div>
          <div className="footer-column">
            <h2 className="footer-heading">Job Types</h2>
            <ul className="f-list-unstyled">
              <li className="f-item">Full-time</li>
              <li className="f-item">Part-time</li>
              <li className="f-item">Remote</li>
              <li className="f-item">Internship</li>
            </ul>
          </div>
          <div className="footer-column">
            <h2 className="footer-heading">Categories</h2>
            <ul className="f-list-unstyled">
              <li className="f-item">Marketing</li>
              <li className="f-item">Technology</li>
              <li className="f-item">Transportation</li>
              <li className="f-item">Sales</li>
            </ul>
          </div>
          <div className="footer-column">
            <h2 className="footer-heading">Company</h2>
            <ul className="f-list-unstyled">
              <li className="f-item">About Us</li>
              <li className="f-item">F.A.Q. page</li>
              <li className="f-item">Contact Us</li>
              <li className="f-item">Job Posts</li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright"></div>
      </footer>
    </>
  );
};
export default Footer;
