import "./PostCard.css";
import { Badge } from "../Components/ui/badge";
import { MdCurrencyRupee } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { MdOutlineWorkHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
const PostCard = ({ item }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  return (
    <>
      <div className="card-container">
        <div className="first-row m-bottom">
          <h2>{item.title}</h2>
          <h3>{item.company.name}</h3>
        </div>
        <div className="second-row m-bottom">
          <h4 className="currency">
            <MdOutlineWorkHistory className="f-size" />
            {item.experienceLevel}
          </h4>
          <h4 className="currency">
            <MdCurrencyRupee className="f-size" />
            {item.salary}
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
          <h4>
            {" "}
            {item.requirements.map((item, index) => (
              <Badge key={index}>{item}</Badge>
            ))}
          </h4>
        </div>
        <div className="fifth-row ">
          <h4>
            {daysAgo(item?.createdAt) === 0
              ? "Today"
              : `${daysAgo(item?.createdAt)} Days Ago`}
          </h4>
        </div>
        <div>
          <Button
            onClick={() => navigate(`/description/${item._id}`)}
            variant="outline"
          >
            Details
          </Button>
        </div>
      </div>
    </>
  );
};
export default PostCard;
