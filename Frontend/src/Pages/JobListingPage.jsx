import FilterList from "../Components/FilterList";
import PostList from "../Components/PostList";
import PostListProvider from "../Store/post-list-store";
import "./JobListingPage.css";
const JobListingPage = () => {
  return (
    <>
      <div className="cards">
        <div className="header-section-center">
          <h1>Recent Jobs</h1>
        </div>
        <PostListProvider>
          <div className="job-listing-container">
            <FilterList></FilterList>
            <PostList></PostList>
          </div>
        </PostListProvider>
        <div className="bg-color-left"></div>
      </div>
    </>
  );
};
export default JobListingPage;
