import { UserContext } from "@/Store/user-store";
import { useContext } from "react";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const { allJobs } = useContext(UserContext);
  return (
    <>
      <div className="section">
        <div className="latest-jobs-container">
          <h1 className="latest-jobs-title">Latest Jobs and Top Openings</h1>
          <div className="l-jobs-container">
            {allJobs.length <= 0 ? (
              <span>No jobs Available</span>
            ) : (
              allJobs
                ?.slice(0, 6)
                .map((item, index) => <LatestJobCard key={index} item={item} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestJobs;
