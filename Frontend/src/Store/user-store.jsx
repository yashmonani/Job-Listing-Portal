import {
  APPLICATION_API_END_POINT,
  COMPANY_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constant";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

const UserDetailsProvider = ({ children }) => {
  // Initialize state with null or the saved user data from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persist user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Handler to update the user and persist it
  const userHandler = (data) => {
    setUser(data);
    localStorage.removeItem("user");
    console.log("User updated:", data);
  };

  //Fetch Company By Id
  // const [singleCompany, setSingleCompany] = useState(null);

  // const useGetCompanyById = (companyId) => {
  //   useEffect(() => {
  //     const fetchSingleCompany = async () => {
  //       try {
  //         const res = await axios.get(
  //           `${COMPANY_API_END_POINT}/get/${companyId}`,
  //           {
  //             withCredentials: true,
  //           }
  //         );
  //         console.log(res.data.company);
  //         if (res.data.success) {
  //           setSingleCompany(res.data.company);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchSingleCompany();
  //   }, [companyId, setSingleCompany]);
  // };

  //Getting all companies

  const [companies, setCompanies] = useState([]);

  const useGetAllCompanies = () => {
    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
            withCredentials: true,
          });
          if (res.data.success) {
            setCompanies(res.data.companies);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchCompanies();
    }, []);
  };
  // Dependency array includes companies

  // Persist companies to localStorage whenever the state updates
  //   useEffect(() => {
  //     if (companies.length > 0) {
  //       localStorage.setItem("companies", JSON.stringify(companies));
  //     }
  //   }, [companies]);
  // };

  // Searching Companies
  const [searchCompanyByText, setSearchCompanyByText] = useState("");

  // Get AdminJobs

  const [allAdminJobs, setAllAdminJobs] = useState([]);

  const useGetAllAdminJobs = () => {
    useEffect(() => {
      const fetchAllAdminJobs = async () => {
        try {
          const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
            withCredentials: true,
          });
          if (res.data.success) {
            setAllAdminJobs(res.data.jobs);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAllAdminJobs();
    }, []);
  };

  // Searching AdminJobs
  const [searchJobsByText, setSearchJobsByText] = useState("");

  //Search Queery

  // const [searchedQuery, setSearchedQuery] = useState("");

  //Getting All Jobs

  const [allJobs, setAllJobs] = useState([]);

  const useGetAllJobs = () => {
    useEffect(() => {
      const fetchAllJobs = async () => {
        try {
          const res = await axios.get(`${JOB_API_END_POINT}/get`, {
            withCredentials: true,
          });
          if (res.data.success) {
            setAllJobs(res.data.jobs);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAllJobs();
    }, []);
  };

  //Getting Single Job By Id

  const [singleJob, setSingleJob] = useState(null);

  // Applicants

  const [applicants, setApplicants] = useState([]);

  //Getting applied jobs

  const [allAppliedJobs, setAllAppliedJobs] = useState([]);

  const useGetAppliedJobs = () => {
    useEffect(() => {
      const fetchAppliedJobs = async () => {
        try {
          const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
            withCredentials: true,
          });
          if (res.data.success) {
            setAllAppliedJobs(res.data.application);
          }
        } catch (error) {}
      };
      fetchAppliedJobs();
    }, []);
  };

  // Provide user data and handler to the children
  return (
    <UserContext.Provider
      value={{
        user,
        userHandler,
        companies,
        useGetAllCompanies,
        searchCompanyByText,
        setSearchCompanyByText,
        allAdminJobs,
        useGetAllAdminJobs,
        searchJobsByText,
        setSearchJobsByText,
        allJobs,
        useGetAllJobs,
        singleJob,
        setSingleJob,
        applicants,
        setApplicants,
        allAppliedJobs,
        useGetAppliedJobs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserDetailsProvider;
