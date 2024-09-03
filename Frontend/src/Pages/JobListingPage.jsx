import FilterList from "../Components/FilterList";
import PostList from "../Components/PostList";
import "./JobListingPage.css";
const JobListingPage = () => {
  return (
    <>
      <div className="cards">
        <div className="header-section-center">
          <h1>Recent Jobs</h1>
        </div>
        <div className="job-listing-container">
          <FilterList></FilterList>
          <PostList></PostList>
        </div>
        <div className="bg-color-left"></div>
      </div>
    </>
  );
};
export default JobListingPage;
