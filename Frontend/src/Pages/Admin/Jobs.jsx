import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import AdminJobsTable from "../Admin/AdminJobsTable";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Store/user-store";
const Jobs = () => {
  const { useGetAllAdminJobs, setSearchJobsByText } = useContext(UserContext);
  useGetAllAdminJobs();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  console.log(input);
  useEffect(() => {
    setSearchJobsByText(input);
  }, [input]);
  return (
    <>
      <div className="max-w-6xl mx-auto my-10 c-container">
        <div className="flex items-center justify-between my-5">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-fit"
            placeholder="Filter by name,role"
          ></Input>
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </>
  );
};

export default Jobs;
