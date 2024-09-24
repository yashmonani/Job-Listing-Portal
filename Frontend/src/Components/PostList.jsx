import { useContext } from "react";
import PostCard from "./PostCard";
import { PostListContext } from "../Store/post-list-store";
import { UserContext } from "@/Store/user-store";
const PostList = () => {
  const { allJobs } = useContext(UserContext);
  return (
    <>
      <div className="post-list-container">
        {allJobs.length <= 0 ? (
          <span>Job Not Found</span>
        ) : (
          allJobs.map((item, index) => (
            <PostCard key={index} item={item}></PostCard>
          ))
        )}
      </div>
    </>
  );
};
export default PostList;
