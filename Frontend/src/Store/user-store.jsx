import { createContext, useState } from "react";
export const UserContext = createContext();

const UserDetailsProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userHandler = (data) => {
    setUser(data);
    console.log(user);
  };
  return (
    <>
      <UserContext.Provider value={{ user, userHandler }}>
        {children}
      </UserContext.Provider>
    </>
  );
};
export default UserDetailsProvider;
