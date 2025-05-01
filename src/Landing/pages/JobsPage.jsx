import { useNavigate } from "react-router-dom"; // If using React Router

const dummyJobs = Array(15)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    role: [
      "UI/UX Designer",
      "Graphic Designer",
      "Frontend Dev",
      "Motion Designer",
    ][i % 4],
    company: ["Google", "Spotify", "Tesla", "Netflix"][i % 4],
    location: i % 2 === 0 ? "Remote" : "Onsite",
    experience: ["Junior", "Mid-Level", "Senior"][i % 3],
    salary: 3000 + i * 250,
    posted: `2025-04-${(i % 28) + 1}`,
  }));

export default function JobBoard() {
  const navigate = useNavigate(); // If using routing

  return (
    <div className="min-h-screen job-container">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Recommended <span> Jobs </span>
      </h1>

      {/* Jobs Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 job-items-container">
        {dummyJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded shadow hover:shadow-lg transition job-items-cont"
          >
            <div className="text-sm text-gray-400 job-time">{job.posted}</div>
            <div className="job-content-cont">
              <div>
                <h2 className="text-lg font-semibold mb-1 job-role">
                  {job.role}
                </h2>
                <p className="text-sm text-gray-700 mb-1">{job.company}</p>
                <p className="text-sm text-gray-700 mb- flex items-center gap-1">
                  {" "}
                  <span>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 12 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#3D90EF]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"
                      ></path>
                    </svg>
                  </span>
                  {job.location}
                </p>
                <p className="text-sm text-gray-700 mb-1 flex items-center gap-1">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1"
                    viewBox="0 0 48 48"
                    enableBackground="new 0 0 48 48"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="#37474F">
                      <rect x="9" y="20" width="30" height="13"></rect>
                      <ellipse cx="24" cy="33" rx="15" ry="6"></ellipse>
                    </g>
                    <path
                      fill="#78909C"
                      d="M23.1,8.2L0.6,18.1c-0.8,0.4-0.8,1.5,0,1.9l22.5,9.9c0.6,0.2,1.2,0.2,1.8,0l22.5-9.9c0.8-0.4,0.8-1.5,0-1.9 L24.9,8.2C24.3,7.9,23.7,7.9,23.1,8.2z"
                    ></path>
                    <g fill="#37474F">
                      <path d="M43.2,20.4l-20-3.4c-0.5-0.1-1.1,0.3-1.2,0.8c-0.1,0.5,0.3,1.1,0.8,1.2L42,22.2V37c0,0.6,0.4,1,1,1 s1-0.4,1-1V21.4C44,20.9,43.6,20.5,43.2,20.4z"></path>
                      <circle cx="43" cy="37" r="2"></circle>
                      <path d="M46,40c0,1.7-3,6-3,6s-3-4.3-3-6s1.3-3,3-3S46,38.3,46,40z"></path>
                    </g>
                  </svg>
                  {job.experience}
                </p>
              </div>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="company-logo"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-blue-600 font-medium mt-2">
                💰 ${job.salary}/mo
              </p>
              <button className="details-btn mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/jobs")} // Adjust to your route
          className="px-6 py-3 details-btn bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Show More Jobs
        </button>
      </div>
    </div>
  );
}
