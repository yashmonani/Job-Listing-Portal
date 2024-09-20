import axios from "axios";
import "./SignUp.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="signup-section">
        <form onSubmit={submitHandler} className="f-container">
          <h1>SignUp</h1>
          <div className="f-label">
            <label>Full Name</label>
            <input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name.."
            ></input>
          </div>
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
            <label>Phone Number</label>
            <input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your number.."
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
            <label>Phone Number</label>
            <input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              placeholder="Enter your number.."
            ></input>
          </div>
          <div className="f-label">
            <button type="submit" className="button search-btn">
              SignUp
            </button>
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
