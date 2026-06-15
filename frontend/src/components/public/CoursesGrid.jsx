import React from "react";
import CourseCard from "./CourseCard";

const courses = [
  {
    _id: 1,
    title: "Complete Web Development Bootcamp",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js, Express, and MySQL from beginner to advanced level.",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    categoryName: "Web Development",
    instructor: "Masdar Instructor",
    duration: "12 Weeks",
    price: 99,
  },
  {
    _id: 2,
    title: "Professional Graphic Design Masterclass",
    description:
      "Master Photoshop, Illustrator, branding, and social media design.",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    categoryName: "Graphic Design",
    instructor: "Ahmed Hassan",
    duration: "8 Weeks",
    price: 79,
  },
  {
    _id: 3,
    title: "Digital Marketing & Social Media",
    description:
      "Learn SEO, Facebook Ads, Google Ads, Email Marketing, and Social Media Management.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    categoryName: "Digital Marketing",
    instructor: "Mohamed Ali",
    duration: "10 Weeks",
    price: 89,
  },
  {
    _id: 4,
    title: "English Language for Professionals",
    description: "Improve speaking, listening, reading, and writing skills.",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    categoryName: "English Language",
    instructor: "Amina Yusuf",
    duration: "16 Weeks",
    price: 69,
  },
  {
    _id: 5,
    title: "Computer Skills Fundamentals",
    description:
      "Learn Microsoft Word, Excel, PowerPoint, and productivity tools.",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    categoryName: "Computer Skills",
    instructor: "Abdi Rahman",
    duration: "6 Weeks",
    price: 49,
  },
  {
    _id: 6,
    title: "UI/UX Design From Scratch",
    description: "Design modern websites and mobile apps using Figma.",
    thumbnail:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    categoryName: "UI/UX Design",
    instructor: "Fatima Noor",
    duration: "8 Weeks",
    price: 89,
  },
  {
    _id: 7,
    title: "React JS Professional Course",
    description: "Build modern web applications using React and Redux Toolkit.",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    categoryName: "Frontend Development",
    instructor: "Masdar Team",
    duration: "10 Weeks",
    price: 99,
  },
  {
    _id: 8,
    title: "Business & Entrepreneurship",
    description: "Learn business planning, entrepreneurship, and leadership.",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    categoryName: "Business Skills",
    instructor: "Omar Mohamed",
    duration: "8 Weeks",
    price: 75,
  },
  {
    _id: 9,
    title: "Data Analysis with Excel",
    description: "Analyze data and create professional dashboards.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    categoryName: "Data Analysis",
    instructor: "Hodan Ahmed",
    duration: "6 Weeks",
    price: 65,
  },
];

const CoursesGrid = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesGrid;
