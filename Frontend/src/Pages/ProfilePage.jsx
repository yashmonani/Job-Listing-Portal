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
  const { user, useGetAppliedJobs } = useContext(UserContext);
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const isResume = true;
  return (
    <>
      <div className="profile-section">
        <div className="profile-container">
          <div className="p-row-first">
            <div className="profile-image">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profile?.profilePhoto} />
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
            <div className="row-second-left">
              <h1>
                <span className="p-bold">Email: </span>
                {user?.email}
              </h1>
              <h1>
                <span className="p-bold">Phone Number: </span>
                {user?.phoneNumber}
              </h1>

              <Label className="p-bold">Resume:</Label>
              {isResume ? (
                <a
                  target="blank"
                  href={user?.profile?.resume}
                  className="text-[var(--royal-blue)] hover:underline"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>NA</span>
              )}
            </div>
            <div className="row-second-right">
              <div className="row-right-para">
                <h3>Bio</h3>
                <p>{user?.profile?.bio}</p>
              </div>
              <div className="skills-section">
                <h3>Skills</h3>
                {user?.profile?.skills.length !== 0 ? (
                  user?.profile?.skills.map((item, index) => (
                    <Badge
                      className="bg-[var(--royal-blue)] m-left"
                      key={index}
                    >
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span>NA</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-container">
          <h1 className="p-table-head">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfileDialog open={open} setopen={setOpen} />
    </>
  );
};
export default ProfilePage;
