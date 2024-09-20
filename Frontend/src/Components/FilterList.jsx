import { RadioGroup } from "@radix-ui/react-radio-group";
import Filter from "./Filter";
import { AiOutlineMenuUnfold } from "react-icons/ai";
const FilterList = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune"],
    },
    {
      filterType: "Industry",
      array: [
        "Frontend Developer",
        "BackendDeveloper",
        "Full Stack Developer",
        "Data Analyst",
      ],
    },
    {
      filterType: "Salary",
      array: ["0-40k", "42k-1Lakh", "1Lakh-5Lakh"],
    },
  ];
  return (
    <>
      <div className="filter-bar">
        <h2 className="filter-bar-title">
          <AiOutlineMenuUnfold />
          Filter By
        </h2>
        {filterData.map((data) => (
          <Filter data={data}></Filter>
        ))}
      </div>
    </>
  );
};
export default FilterList;
