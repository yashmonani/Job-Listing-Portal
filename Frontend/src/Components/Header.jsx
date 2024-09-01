import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <>
      <header>
        <nav className="nav-bar">
          <div className="logo-head">
            <Link to="/" className="link-css-reset">
              <h2>
                Project <span className="logo">Logo</span>
              </h2>
            </Link>
          </div>
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/jobs" className="link-css-reset">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/companies" className="link-css-reset">
                Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="link-css-reset">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="btn-white">
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Header;
