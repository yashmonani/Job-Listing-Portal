import { Badge } from "../Components/ui/badge";
import { MdCurrencyRupee } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { MdOutlineWorkHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const LatestJobCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`description/${item._id}`)}
        className="latest-card-container"
      >
        <div className="l-row-first">
          <h2>{item.title}</h2>
          <h3>{item.company.name}</h3>
        </div>
        <div className="l-row-second">
          <h4 className="l-currency">
            <MdOutlineWorkHistory className="l-size" />
            {item.experienceLevel}
          </h4>
          <h4 className="l-currency">
            <MdCurrencyRupee className="l-size" />
            {item.salary}
          </h4>
          <h4 className="l-currency">
            <GrLocation className="l-size" />
            {item.location}
          </h4>
        </div>
        <div className="l-row-third">
          <h4>{item.description}</h4>
        </div>
        <div className="l-row-four">
          <h4>
            {item.requirements.map((item, index) => (
              <Badge key={index}>{item}</Badge>
            ))}
          </h4>
        </div>
        <div className=""></div>
      </div>
    </>
  );
};

export default LatestJobCard;
