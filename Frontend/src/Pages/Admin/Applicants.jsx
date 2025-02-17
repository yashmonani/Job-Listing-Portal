import { useContext, useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { UserContext } from "@/Store/user-store";
import { useParams } from "react-router-dom";
const Applicants = () => {
  const { applicants, setApplicants } = useContext(UserContext);
  const params = useParams();
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants `,
          { withCredentials: true }
        );
        setApplicants(res.data.job);
      } catch (error) {}
    };
    fetchAllApplicants();
  }, []);
  return (
    <>
      <div className="c-container max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants{applicants?.applications?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </>
  );
};

export default Applicants;
