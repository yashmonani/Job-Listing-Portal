import "./SignUp.css";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <>
      <div className="signup-section">
        <form action="" className="f-container">
          <h1>SignUp</h1>
          <div className="f-label">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name.."></input>
          </div>
          <div className="f-label">
            <label>Email</label>
            <input type="email" placeholder="Enter your email.."></input>
          </div>
          <div className="f-label">
            <label>Phone Number</label>
            <input type="mo" placeholder="Enter your number.."></input>
          </div>
          <div className="f-label">
            <label>Password</label>
            <input type="password" placeholder="Enter your password.."></input>
          </div>
          <div className="f-radio">
            <input type="radio" id="html" name="role" value="student" />
            <label for="student">Student</label>
            <input type="radio" id="css" name="role" value="recruiter" />
            <label for="recruiter">Recruiter</label>
          </div>
          <div className="f-label">
            <button className="button search-btn">SignUp</button>
          </div>
          <div className="f-label">
            <h3>
              Already have an Account?
              <span className="f-span">
                <Link to="/login">Login</Link>
              </span>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
