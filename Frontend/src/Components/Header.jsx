import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { Button } from "./ui/button";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import { UserContext } from "@/Store/user-store";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
const Header = () => {
  const { userHandler } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        userHandler(null);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <header>
        <nav className="nav-bar">
          <div className="logo-head">
            <Link to="/" className="link-css-reset">
            <img src="src/assets/JobsHeaven_logo1.png" alt="img" width="200px" />
            </Link>
          </div>
          <ul className="nav-links">
            {user && user.role === "recruiter" ? (
              <>
                <li className="nav-item">
                  <Link to="/admin/dashboard" className="link-css-reset">
                    Companies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/jobs" className="link-css-reset">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/jobs" className="link-css-reset">
                  Jobs
                </Link>
              </li>
            )}

            <li className="nav-item">
              {!user ? (
                <Link to="/signup" className="btn-white">
                  Login 
                </Link>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <Avatar className="">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="pop-content">
                      {user && user.role === "student" && (
                        <div className="pop-icon">
                          <FaRegUser />
                          <Button variant="link">
                            <Link to="/profile">Your Profile</Link>
                          </Button>
                        </div>
                      )}
                      <div className="pop-icon">
                        <LuLogOut />
                        <Button onClick={logoutHandler} variant="link">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
export default Header;
