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

const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useContext(UserContext);
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
          {applicants &&
            applicants?.applications?.map((item) => {
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resumeOriginalName}
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
              </tr>;
            })}
        </TableBody>
      </Table>
    </>
  );
};

export default ApplicantsTable;
