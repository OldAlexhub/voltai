import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">
          © {new Date().getFullYear()} VoltAI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
