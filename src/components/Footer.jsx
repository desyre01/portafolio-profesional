import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-4 text-center relative bottom-0 w-full">
      <div className="container mx-auto">
        <p className="text-base my-1">© 2024 Mi Portafolio</p>
        
        <div className="flex justify-center gap-4 mt-2">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:underline text-lg transition-all"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:underline text-lg transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;