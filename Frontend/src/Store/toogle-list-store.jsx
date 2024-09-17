import { children, createContext } from "react";

export const ToogleListContext = createContext();

const ToogleListProvider = ({ children }) => {
  const FAQList = [
    {
      title: "Do you provide customer support ?",
    },
    {
      title: "What is the benefit of monthly plan?",
    },
    {
      title: "Do you have any questions for us?",
    },
    {
      title: "Can i have feedback on the fly?",
    },
  ];
  return (
    <ToogleListContext.Provider value={{ FAQList }}>
      {children}
    </ToogleListContext.Provider>
  );
};

export default ToogleListProvider;
