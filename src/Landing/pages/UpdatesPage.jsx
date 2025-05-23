import { useState, useEffect } from "react";
import { apiUrl } from "../../utilits/apiUrl";
const filters = ["All", "New", "Old"];

function UpdatesPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch announcements from backend
  useEffect(() => {
    fetch(`${apiUrl}/announcements`) // Adjust URL if needed
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch announcements");
        return res.json();
      })
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Utility to normalize and compare dates
  const isNew = (dateStr) => {
    const now = new Date();
    const annDate = new Date(dateStr);
    return annDate.toDateString() >= now.toDateString();
  };

  const filtered = announcements
    .filter((item) => {
      if (filter === "All") return true;
      return filter === "New" ? isNew(item.dateTime) : !isNew(item.dateTime);
    })
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="updates-page-container w-full p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Announcements</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search announcements..."
        className="w-full p-3 mb-6 rounded-md border border-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap justify-left">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Announcement List */}
      {!loading && !error && (
        <div className="space-y-4 ">
          {filtered.length === 0 ? (
            <p className="text-center text-red-500">No announcements found</p>
          ) : (
            filtered.map(({ id, title, description, dateTime }) => (
              <div
                key={id}
                className="bg-white flex flex-row p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="text-sm text-gray-500 mb-1 mr-5 self-center">
                  {dateTime}
                </div>
                <div className="bg-gray-400 w-0.5"></div>
                <div className="ml-5">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-gray-700">{description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default UpdatesPage;
