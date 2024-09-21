import { useContext, useState } from "react";
import "./ProfilePage.css";
import { Avatar, AvatarImage } from "../Components/ui/avatar";
import { UserContext } from "@/Store/user-store";
import { FaRegEdit } from "react-icons/fa";
import { Badge } from "../Components/ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "@/Components/AppliedJobTable";
import UpdateProfileDialog from "@/Components/UpdateProfileDialog";
const ProfilePage = () => {
  const { user } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const isResume = true;
  return (
    <>
      <div className="profile-section">
        <div className="profile-container">
          <div className="p-row-first">
            <div className="profile-image">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div className="p-content">
                <h1>{user?.fullname}</h1>
                <p>{user?.profile?.bio}</p>
              </div>
            </div>
            <div>
              <button onClick={() => setOpen(true)} className="edit-btn">
                <FaRegEdit />
              </button>
            </div>
          </div>
          <div className="p-row-second">
            <h1>{user?.email}</h1>
            <h1>{user?.phoneNumber}</h1>
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
            <Label>Resume</Label>
            {isResume ? (
              <a target="blank" href="" className="hover:underline">
                Roop {user?.profile?.resumeOriginalName} 
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div>
          <h1>Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setopen={setOpen} />

      {/* <div className="profile-section">
        <div className="profile-container">
          <div className="profile-image">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            </Avatar>
            <h1>{user?.fullname}</h1>
            <br />
            <p>{user?.bio}</p>
          </div>
          <div>
            <h1>{user?.email}</h1>
            <br />
            <h1>{user?.phoneNumber}</h1>
            <br />
            <h1>
              {user?.profile?.skills.length === 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span></span>
              )}
            </h1>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default ProfilePage;
