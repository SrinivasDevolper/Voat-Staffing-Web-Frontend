import { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const JobCard = ({ job, onCheckEligibility }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="mb-2">
        <div className="text-gray-500 text-xs sm:text-sm mb-1">{job.id}</div>

        <h3 className="text-base sm:text-lg font-semibold mb-2">{job.title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <MapPin size={14} className="text-gray-400 min-w-[14px]" />
            <span className="text-gray-600 text-sm sm:text-base">
              {job.location}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Clock size={14} className="text-gray-400 min-w-[14px]" />
            <span className="text-gray-600 text-sm sm:text-base">
              {job.salary}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Users size={14} className="text-gray-400 min-w-[14px]" />
            <span className="text-gray-600 text-sm sm:text-base">
              {job.openings} opening{job.openings !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Calendar size={14} className="text-gray-400 min-w-[14px]" />
            <span className="text-gray-600 text-sm sm:text-base">
              {job.date}
            </span>
          </div>
        </div>

        {expanded && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <h4 className="font-medium text-sm sm:text-base mb-1 sm:mb-2">
              Eligibility Criteria:
            </h4>
            <p className="text-gray-600 text-sm sm:text-base">
              {job.eligibility}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          className="text-[#0F52BA] text-xs sm:text-sm flex items-center gap-1"
          onClick={() => {
            onCheckEligibility(job);
            setExpanded(!expanded);
          }}
        >
          {expanded ? "Hide Details" : "Check Eligibility"}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
