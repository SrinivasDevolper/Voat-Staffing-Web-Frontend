import { useEffect, useState } from "react";
import { Home, RefreshCw, Briefcase, HelpCircle, Phone } from "lucide-react";
import "../../styles/Sidebar.css";
const sections = [
  { id: "home", icon: <Home size={20} />, label: "Home" },
  { id: "updates", icon: <RefreshCw size={20} />, label: "Updates" },
  { id: "jobs", icon: <Briefcase size={20} />, label: "Jobs" },
  { id: "faqs", icon: <HelpCircle size={20} />, label: "FAQs" },
  { id: "contact", icon: <Phone size={20} />, label: "Contact" },
];

const StickySidebarButtons = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let current = "";
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const { top, height } = el.getBoundingClientRect();
          const sectionTop = window.scrollY + top;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + height
          ) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);

      const footer = document.getElementById("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setIsFooterVisible(footerRect.top < window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={`sidebar-buttons fixed top-1/4 left-4 flex flex-col gap-4 z-50 transition-opacity duration-300 ${
        isFooterVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`flex items-center justify-center py-2 w-25 rounded-full transition-all duration-200 ${
            activeSection === section.id
              ? "bg-[#0B52C0] text-white h- w-25"
              : "hover:bg-[#ffffff] text-black border-2 border-[#0B52C0]"
          }`}
          style={{ padding: "0.2rem 1.2rem" }}
        >
          <span className="md:inline-block lg:hidden">{section.icon}</span>
          <span className="hidden lg:inline-block capitalize ml-2">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default StickySidebarButtons;

// import { useEffect, useState } from "react";
// import { Home, RefreshCw, Briefcase, HelpCircle, Phone } from "lucide-react";

// const sections = ["home", "updates", "jobs", "faqs", "contact"];

// const sectionIcons = {
//   home: <Home size={20} />,
//   updates: <RefreshCw size={20} />,
//   jobs: <Briefcase size={20} />,
//   faqs: <HelpCircle size={20} />,
//   contact: <Phone size={20} />,
// };

// const StickySidebarButtons = () => {
//   const [activeSection, setActiveSection] = useState("");
//   const [isFooterVisible, setIsFooterVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.dataset.section);
//           }
//         });
//       },
//       {
//         root: null,
//         rootMargin: "-30% 0px -60% 0px", // top margin and bottom margin
//         threshold: 0.1,
//       }
//     );

//     const sectionEls = document.querySelectorAll("[data-section]");
//     sectionEls.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     const footer = document.getElementById("footer");
//     const observer = new IntersectionObserver(
//       ([entry]) => setIsFooterVisible(entry.isIntersecting),
//       { threshold: 0.1 }
//     );
//     if (footer) observer.observe(footer);
//     return () => observer.disconnect();
//   }, []);

//   const scrollToSection = (id) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <div
//       className={`sidebar-buttons fixed top-1/4 left-4 flex flex-col gap-4 z-50 transition-opacity duration-300 ${
//         isFooterVisible ? "opacity-0 pointer-events-none" : "opacity-100"
//       }`}
//     >
//       {sections.map((id) => (
//         <button
//           key={id}
//           onClick={() => scrollToSection(id)}
//           className={` flex items-center justify-center px-4 py-2 rounded-full transition-all duration-200
//   hover:bg-gray-200
//   ${`sidebar-btn ${activeSection === id ? "active" : ""}`}
//     `}
//         >
//           {/* Show icon always */}
//           <span className="md:inline-block lg:hidden">{sectionIcons[id]}</span>
//           {/* Show text only on large screens */}
//           <span className="hidden lg:inline-block capitalize ml-2">{id}</span>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default StickySidebarButtons;
