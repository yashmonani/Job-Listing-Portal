import LatestJobCard from "@/Components/LatestJobCard";
import PostCard from "@/Components/PostCard";
import { UserContext } from "@/Store/user-store";
import { useContext, useEffect } from "react";

const Browse = () => {
  const { allJobs, setSearchedQuery, useGetAllJobs } = useContext(UserContext);
  useGetAllJobs();
  useEffect(() => {
    return () => {
      setSearchedQuery("");
    };
  }, []);
  return (
    <>
      <div>
        <h1>Search Results({allJobs.length})</h1>
        {allJobs.map((job) => {
          return <LatestJobCard key={job._id} item={job} />;
        })}
      </div>
    </>
  );
};

export default Browse;
