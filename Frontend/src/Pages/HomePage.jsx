import "./HomePage.css";
import ToogleList from "../Components/ToogleList";
import ToogleListProvider from "../Store/toogle-list-store";
const HomePage = () => {
  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find your career you deserve it.</h1>
          <p className="hero-paragraph">
            Find out what you like doing best, and get someone to pay you for
            doing it.
          </p>
          <div className="hero-search">
            <input type="text" placeholder="Job Keyword..." />
            <buttton type="submit" className="button search-btn">
              Search
            </buttton>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-bg-left"></div>
          <div className="hero-bg-dark"></div>
          <div className="hero-bg-right"></div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="video-side-image"></div>
          <div className="video-content">
            <h2 className="content-head">
              Hundreds of great jobs from all over
            </h2>
            <p className="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <div className="button-wrapper">
              <button className="white-w-btn">Get Started Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="logo-title">
        Trusted by the world’s fastest growing companies
      </div>
      <div className="logo-container">
        <div className="logo-flex-wrapper">
          <div className="logo-div">
            <img src="./logo_1.png" width={"160"}></img>
          </div>
          <div className="logo-div">
            <img src="./logo_2.png" width={"160"}></img>
          </div>
          <div className="logo-div">
            <img src="./logo_3.png" width={"160"}></img>
          </div>
          <div className="logo-div">
            <img src="./logo_4.png" width={"160"}></img>
          </div>
          <div className="logo-div">
            <img src="./logo_5.png" width={"160"}></img>
          </div>
          <div className="logo-div">
            <img src="./logo_6.png" width={"160"}></img>
          </div>
        </div>
      </div>
      <div className="query-section">
        <div className="query-list-container">
          <div className="query-img">
            <div className="image-set">
              <div className="query-img1"></div>
              <div className="query-img2"></div>
            </div>
            <div className="query-img3"></div>
          </div>
          <div className="query-list">
            <h1 className="query-heading">Frequently asked questions</h1>
            <ToogleListProvider>
              <ToogleList></ToogleList>
            </ToogleListProvider>
          </div>
        </div>
        <div className="bg-left-dark"></div>
      </div>
    </>
  );
};
export default HomePage;
