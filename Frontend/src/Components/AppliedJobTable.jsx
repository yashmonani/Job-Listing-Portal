import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Badge } from "../Components/ui/badge";
const AppliedJobTable = () => {
  return (
    <>
      <h1>Hii</h1>
      <Table>
        <TableCaption>A list of your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((data, index) => (
            <TableRow key={index}>
              <TableCell>20/09/2024</TableCell>
              <TableCell>Frontend</TableCell>
              <TableCell>Microsoft</TableCell>
              <TableCell className="text-right">
                <Badge>Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AppliedJobTable;
