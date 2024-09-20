import "./Filter.css";
import { IoMdArrowDropdown } from "react-icons/io";
const Filter = ({ data }) => {
  return (
    <>
      <div className="filter-container">
        <h3>{data.filterType}</h3>
        <IoMdArrowDropdown />
      </div>
      <div className="filter-options">
        {data.array.map((item) => {
          return (
            <div className="filter-option">
              <input type="radio" name="filter" value={item} />
              <label htmlFor="student">{item}</label>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Filter;
