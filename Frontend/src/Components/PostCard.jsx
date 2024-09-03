import "./PostCard.css";
import { MdCurrencyRupee } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { MdOutlineWorkHistory } from "react-icons/md";
const PostCard = () => {
  return (
    <>
      <div className="card-container">
        <div className="first-row m-bottom">
          <h2>Title</h2>
          <h3>Accenture</h3>
        </div>
        <div className="second-row m-bottom">
          <h4 className="currency">
            <MdOutlineWorkHistory className="f-size" />
            3-5 Yrs
          </h4>
          <h4 className="currency">
            <MdCurrencyRupee className="f-size" />
            7-12 Lacs P.A.
          </h4>
          <h4 className="currency">
            <GrLocation className="f-size" />
            Mumbai, Jaipur
          </h4>
        </div>
        <div className="third-row m-bottom">
          <h4>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            quia explicabo distinctio, sed inventore quo voluptas beatae quam
            unde vero molestias vitae iure. Rerum expedita eius iure dolores
            modi voluptas?
          </h4>
        </div>
        <div className="fourth-row m-bottom">
          <h4>Skills</h4>
        </div>
        <div className="fifth-row ">
          <h4>3 Days Ago</h4>
        </div>
      </div>
    </>
  );
};
export default PostCard;
