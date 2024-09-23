import { COMPANY_API_END_POINT } from "@/utils/constant";
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
  //Fetching All Companies
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

  // Searching Companies
  const [searchCompanyByText, setSearchCompanyByText] = useState("");

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserDetailsProvider;

// import { createContext, useState } from "react";
// export const UserContext = createContext();

// const UserDetailsProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const userHandler = (data) => {
//     setUser(data);
//     console.log(user);
//   };
//   return (
//     <>
//       <UserContext.Provider value={{ user, userHandler }}>
//         {children}
//       </UserContext.Provider>
//     </>
//   );
// };
// export default UserDetailsProvider;
