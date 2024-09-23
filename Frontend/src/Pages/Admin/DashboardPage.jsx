import { Button } from "@/Components/ui/button";
import { Input } from "../../Components/ui/input"; // Named import for the Input component
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Store/user-store";
const DashboardPage = () => {
  const { useGetAllCompanies, setSearchCompanyByText } =
    useContext(UserContext);
  useGetAllCompanies();
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  useEffect(() => {
    setSearchCompanyByText(input);
  }, [input]);
  return (
    <>
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-fit"
            placeholder="Filter by name"
          ></Input>
          <Button onClick={() => navigate("/admin/dashboard/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </>
  );
};
export default DashboardPage;
