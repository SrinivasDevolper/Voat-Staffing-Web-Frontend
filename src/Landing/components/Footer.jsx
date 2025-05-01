import React from "react";

function Footer() {
  return (
    <div
      className="flex flex-col md:flex-row gap-1 w-full justify-around footer-container"
      style={{ padding: "1rem" }}
    >
      <p className="text-center text-white text-sm">
        © 2025 Voat Staffing. All rights reserved.
      </p>
      <p className="text-center text-white text-sm">
        Terms of Service | Privacy Policy | Contact Us
      </p>
      <p className="text-center text-white text-sm">
        Follow us on:
        <a href="#" className="text-blue-500 hover:underline">
          Facebook
        </a>
        ,
        <a href="#" className="text-blue-500 hover:underline">
          Twitter
        </a>
        ,
        <a href="#" className="text-blue-500 hover:underline">
          LinkedIn
        </a>
        ,
        <a href="#" className="text-blue-500 hover:underline">
          Instagram
        </a>
      </p>
    </div>
  );
}

export default Footer;
