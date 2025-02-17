import {
  Table,
  TableHeader,
  TableCaption,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/Components/ui/table";
import { Popover, PopoverContent } from "@/Components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import React, { useContext } from "react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { UserContext } from "@/Store/user-store";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useContext(UserContext);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <Table>
        <TableCaption>A list of your Applicants..</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <tr key={item._id}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600 cursor-pointer"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortlistingStatus.map((status, index) => {
                      return (
                        <div
                          onClick={() => statusHandler(status, item._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      );
                    })}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ApplicantsTable;
