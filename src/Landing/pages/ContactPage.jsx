import { useState } from "react";
import { apiUrl } from "../../utilits/apiUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required!");
      setError("All fields are required!");
      return;
    }
    // Validate email format
    if (!formData.email.endsWith("@gmail.com")) {
      toast.error("Please enter a valid email address.");
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("Sending...");

    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // setIsSubmitted(true);
        setStatus("Message sent successfully!");
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        toast.error(data.message || "Unknown error");
        setStatus(`Failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      setStatus("Network error.");
    }
  };

  return (
    <div className="contact-page">
      <h1>
        Contact <span> Us </span>
      </h1>
      <div className="contact-info">
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
          {/* {error || (!status && <p className="error">{error}</p>)}
          {status && <p className="status">{status}</p>} */}
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            status && <p className="text-green-500">{status}</p>
          )}
        </form>

        <div className="map-container" style={{ width: "100%" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3309788625803!2d78.37717691466714!3d17.445604788030075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91693eb085dd%3A0x4edc387e6d7369d!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1617819348333!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ContactPage;

// hideProgressBar;
