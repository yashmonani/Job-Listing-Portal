import PostCard from "@/Components/PostCard";

const Browse = () => {
  const randomJobs = [1, 2, 3];
  return (
    <>
      <div>
        <h1>Search Results({randomJobs.length})</h1>
        {randomJobs.map((item, index) => {
          return <div>{/* <PostCard></PostCard> */}</div>;
        })}
      </div>
    </>
  );
};

export default Browse;
