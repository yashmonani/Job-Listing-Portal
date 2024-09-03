import Filter from "./Filter";
import { AiOutlineMenuUnfold } from "react-icons/ai";
const FilterList = () => {
  return (
    <>
      <div className="filter-bar">
        <h2 className="filter-bar-title">
          <AiOutlineMenuUnfold />
          Filter By
        </h2>
        <Filter></Filter>
        <Filter></Filter>
      </div>
    </>
  );
};
export default FilterList;
