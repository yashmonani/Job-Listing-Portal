import { Label } from "@/Components/ui/label";
import "./DashboardPage.css";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
const CompanyCreate = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/dashboard/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="c-container">
        <div className="c-content">
          <h1>Your Company Name</h1>
          <p>
            What would you like to give your company name? You can change this
            later.
          </p>
          <div className="c-input">
            <Label>Company Name</Label>
            <Input
              type="text"
              className="my-2"
              placeholder="JobFinder,Google etc."
              onChange={(e) => setCompanyName(e.target.value)}
            ></Input>
          </div>
          <div className="flex items-center gap-2 my-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/dashboard")}
            >
              Cancel
            </Button>
            <Button onClick={registerNewCompany}>Continue</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCreate;
