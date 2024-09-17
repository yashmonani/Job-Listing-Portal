import { useContext } from "react";
import PostCard from "./PostCard";
import { PostListContext } from "../Store/post-list-store";
const PostList = () => {
  const { PostList } = useContext(PostListContext);
  return (
    <>
      <div className="post-list-container">
        {PostList.map((item) => (
          <PostCard item={item}></PostCard>
        ))}
      </div>
    </>
  );
};
export default PostList;
