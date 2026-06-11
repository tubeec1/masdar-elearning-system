import React from "react";
import HeroSection from "../../components/public/HeroSection";
import CategoriesSection from "../../components/public/CategoriesSection";
import FeaturedCoursesSection from "../../components/public/FeaturedCoursesSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
    </div>
  );
};

export default Home;
