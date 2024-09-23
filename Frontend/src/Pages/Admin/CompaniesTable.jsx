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
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Edit, MoreHorizontal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useContext(UserContext);

  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase()); // Corrected here
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <>
      <Table>
        <TableCaption>List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length <= 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                You haven't registered any company yet.
              </td>
            </tr>
          ) : (
            <>
              {filterCompany?.map((company) => (
                <tr key={company._id}>
                  <TableCell>
                    <div>
                      <Avatar>
                        <AvatarImage src={company.logo} alt="@shadcn" />
                      </Avatar>
                    </div>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div className="flex items-center gap-1 w-fit cursor-pointer">
                          <Edit className="w-4" />
                          <span>Edit</span>
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

export default CompaniesTable;
