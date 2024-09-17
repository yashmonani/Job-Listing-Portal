import "./Toogle.css";
import { FaPlus } from "react-icons/fa6";
const Toogle = ({ item }) => {
  return (
    <>
      <div className="toogle-container">
        <h3 className="toogle-title">{item.title}</h3>
        <div className="toogle-icon">
          <FaPlus className="plus"></FaPlus>
        </div>
      </div>
    </>
  );
};
export default Toogle;
