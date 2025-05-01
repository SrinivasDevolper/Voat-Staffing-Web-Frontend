import Navbar from "./Navbar";
import StickySidebarButtons from "./SideNavbar";
import HomePags from "../pages/HomePags";
import UpdatesPage from "../pages/UpdatesPage";
import JobBoard from "../pages/JobsPage";
import FAQsPage from "../pages/FaqsPage";
import ContactPage from "../pages/ContactPage";
import Footer from "./Footer";

function MainPages() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="home-container flex flex-1">
        <StickySidebarButtons />
        <div className="main-content w-full">
          {/* Sections */}
          <div id="home" data-section="home" className="main-page">
            <HomePags />
          </div>
          <div id="updates" data-section="updates" className="main-page">
            <UpdatesPage />
          </div>
          <div id="jobs" data-section="jobs" className="main-page">
            <JobBoard />
          </div>
          <div id="faqs" data-section="faqs" className="main-page">
            <FAQsPage />
          </div>
          <div id="contact" data-section="contact" className="main-page">
            <ContactPage />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        id="footer"
        data-section="footer"
        className="flex flex-col bg-black w-full"
      >
        <div className="footer-content">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainPages;
