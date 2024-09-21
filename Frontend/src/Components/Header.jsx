import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Link } from "react-router-dom";
import "./Header.css";
import { Button } from "./ui/button";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useContext } from "react";
import { UserContext } from "@/Store/user-store";
const Header = () => {
  const { user } = useContext(UserContext);
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
              <Link to="" className="link-css-reset">
                Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="" className="link-css-reset">
                Services
              </Link>
            </li>
            <li className="nav-item">
              {!user ? (
                <Link to="/signup" className="btn-white">
                  Sign In
                </Link>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <Avatar className="">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="pop-content">
                      <div className="pop-icon">
                        <FaRegUser />
                        <Button variant="link">
                          <Link to="/profile">Your Profile</Link>
                        </Button>
                      </div>
                      <div className="pop-icon">
                        <LuLogOut />
                        <Button variant="link">Logout</Button>
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
