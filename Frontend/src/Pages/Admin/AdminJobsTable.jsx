import { PopoverContent } from "@/Components/ui/popover";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/Components/ui/table";
import { UserContext } from "@/Store/user-store";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Edit, Eye, MoreHorizontal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobsByText } = useContext(UserContext);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobsByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobsByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobsByText.toLowerCase())
        ); // Corrected here
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobsByText]);

  return (
    <>
      <Table>
        <TableCaption>List of your recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAdminJobs.length <= 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                You haven't registered any company yet.
              </td>
            </tr>
          ) : (
            <>
              {filterJobs?.map((job) => (
                <tr key={job._id}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() =>
                            navigate(`/admin/dashboard/${job._id}`)
                          }
                          className="flex items-center gap-1 w-fit cursor-pointer"
                        >
                          <Edit className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                        >
                          <Eye className="w-4"></Eye>
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminJobsTable;
