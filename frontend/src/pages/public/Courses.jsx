import React from "react";
import CoursesHero from "../../components/public/CoursesHero";
import CoursesGrid from "../../components/public/CoursesGrid";
import CourseStats from "../../components/public/CourseStats";
import CourseCTASection from "../../components/public/CourseCTASection";

const Courses = () => {
  return (
    <div>
      <CoursesHero />
      <CourseStats />
      <CoursesGrid />
      <CourseCTASection />
    </div>
  );
};

export default Courses;
