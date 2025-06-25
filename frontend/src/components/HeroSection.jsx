import React from "react";

const HeroSection = () => {
  const email = localStorage.getItem("email");

  return (
    <section className="py-16 bg-white text-center px-4">
      <div className="mt-6 text-center">
        
          <>
            <span className="inline-block mb-4 px-4 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
              Blog
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Discover our latest news
            </h1>

            <p className="max-w-xl mx-auto text-gray-500 mb-8">
              Discover the achievements that set us apart. From groundbreaking
              projects to industry accolades, we take pride in our
              accomplishments.
            </p>

           
          </>
        
      </div>
    </section>
  );
};

export default HeroSection;
