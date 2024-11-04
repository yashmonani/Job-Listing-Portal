import "./SignUp.css";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { USER_API_END_POINT } from "@/utils/constant";
import { UserContext } from "@/Store/user-store";
const Login = () => {
  const { userHandler } = useContext(UserContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        userHandler(res.data.user);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="signup-section">
        <form onSubmit={submitHandler} className="f-container">
          <h1>SignIn</h1>
          <div className="f-label">
            <label>Email</label>
            <input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email.."
            ></input>
          </div>
          <div className="f-label">
            <label>Password</label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password.."
            ></input>
          </div>
          <div className="f-radio">
            <input
              type="radio"
              id="html"
              name="role"
              value="student"
              checked={input.role === "student"}
              onChange={changeEventHandler}
            />
            <label htmlFor="student">Student</label>
            <input
              type="radio"
              id="css"
              name="role"
              value="recruiter"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
            />
            <label htmlFor="recruiter">Recruiter</label>
          </div>
          <div className="f-label">
            <button type="submit" className="button search-btn">
              Login
            </button>
          </div>
          <div className="f-label">
            <h3>
              Don't have an Account?
              <span className="f-span">
                <Link to="/signup">SignUp</Link>
              </span>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
