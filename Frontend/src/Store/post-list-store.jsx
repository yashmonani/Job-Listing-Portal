import { children, createContext } from "react";

export const PostListContext = createContext();
const PostList = [
  {
    title: "Application Developer",
    company: "Accenture",
    experience: "3-5 Yrs",
    salary_range: "3-5 Lacs P.A.",
    location: "Mumbai",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumendaquia explicabo distinctio, sed inventore quo voluptas beatae quamunde vero molestias vitae iure. Rerum expedita eius iure doloresmodi voluptas?",
    days: "3 Days Ago",
  },
  {
    title: "Salesforce Developer Lead",
    company: "Leading Company in IT Domain",
    experience: "4 - 9 Yrs",
    salary_range: "11-16 Lacs P.A.",
    location: "Pune",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumendaquia explicabo distinctio, sed inventore quo voluptas beatae quamunde vero molestias vitae iure. Rerum expedita eius iure doloresmodi voluptas?",
    days: "5 Days Ago",
  },
  {
    title: "Manager / Data Engineer-Data Architect",
    company: "Benovymed Healthcare Private Limited",
    experience: "5 - 10 years",
    salary_range: "Not Disclosed",
    location: "Delhi / NCR",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumendaquia explicabo distinctio, sed inventore quo voluptas beatae quamunde vero molestias vitae iure. Rerum expedita eius iure doloresmodi voluptas?",
    days: "7 Days Ago",
  },
  {
    title: "Manager / Data Engineer-Data Architect",
    company: "Benovymed Healthcare Private Limited",
    experience: "5 - 10 years",
    salary_range: "Not Disclosed",
    location: "Delhi / NCR",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumendaquia explicabo distinctio, sed inventore quo voluptas beatae quamunde vero molestias vitae iure. Rerum expedita eius iure doloresmodi voluptas?",
    days: "7 Days Ago",
  },
];
const PostListProvider = ({ children }) => {
  return (
    <>
      <PostListContext.Provider value={{ PostList }}>
        {children}
      </PostListContext.Provider>
    </>
  );
};
export default PostListProvider;
