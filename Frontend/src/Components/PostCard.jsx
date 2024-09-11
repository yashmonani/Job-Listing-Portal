import "./PostCard.css";
import { MdCurrencyRupee } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { MdOutlineWorkHistory } from "react-icons/md";
const PostCard = ({ item }) => {
  return (
    <>
      <div className="card-container">
        <div className="first-row m-bottom">
          <h2>{item.title}</h2>
          <h3>{item.company}</h3>
        </div>
        <div className="second-row m-bottom">
          <h4 className="currency">
            <MdOutlineWorkHistory className="f-size" />
            {item.experience}
          </h4>
          <h4 className="currency">
            <MdCurrencyRupee className="f-size" />
            {item.salary_range}
          </h4>
          <h4 className="currency">
            <GrLocation className="f-size" />
            {item.location}
          </h4>
        </div>
        <div className="third-row m-bottom">
          <h4>{item.description}</h4>
        </div>
        <div className="fourth-row m-bottom">
          <h4>Skills</h4>
        </div>
        <div className="fifth-row ">
          <h4>{item.days}</h4>
        </div>
      </div>
    </>
  );
};
export default PostCard;
