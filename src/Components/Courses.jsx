import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const sampleCourses = [
  {
    course_id: 1,
    courseName: "Introduction to Java",
    price: 100,
    instructor: "John Doe",
    p_link: "https://static-assets.codecademy.com/assets/course-landing-page/meta/4x3/java-introduction.jpg",
  },
  {
    course_id: 2,
    courseName: "Advanced Spring Boot",
    price: 150,
    instructor: "Jane Smith",
    p_link: "https://miro.medium.com/0*3KzDfVtknm-h9J9z.png",
  },
  {
    course_id: 3,
    courseName: "React for Beginners",
    price: 120,
    instructor: "Alice Johnson",
    p_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM4ool0_ixiIH8oGiwJ1RiuloZI1J6OWZbQQ&s",
  },
  {
    course_id: 4,
    courseName: "Python Programming",
    price: 130,
    instructor: "Bob Wilson",
    p_link: "https://www.ncodetechnologies.com/blog/wp-content/uploads/2020/06/Pythonlogo.jpg",
  },
  {
    course_id: 5,
    courseName: "Data Structures and Algorithms",
    price: 180,
    instructor: "Carol Brown",
    p_link: "https://thedigitaladda.com/wp-content/uploads/Data-Structure-Algorithms.png",
  },
  {
    course_id: 6,
    courseName: "Machine Learning Basics",
    price: 200,
    instructor: "David Lee",
    p_link: "https://i.ytimg.com/vi/pqb2HiKtA80/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAXZlIxA4qFECgvIxtpow-iYK7VMg",
  },
  {
    course_id: 7,
    courseName: "Web Development with Node.js",
    price: 140,
    instructor: "Emma Davis",
    p_link: "https://s3.ap-south-1.amazonaws.com/stage.radixweb.com/medium_When_to_Consider_Using_Node_js_0d84032172.jpg",
  },
  {
    course_id: 8,
    courseName: "Database Design",
    price: 110,
    instructor: "Frank Miller",
    p_link: "https://media.geeksforgeeks.org/wp-content/uploads/20240527162229/Database-Design-.webp",
  },
];

function Courses() {
  const [courses, setCourses] = useState(sampleCourses);
  const [enrolled, setEnrolled] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId && storedUserId !== "null") {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    async function fetchEnrolled() {
      try {
        if (!userId) return;
        const response = await axios.get(`/api/learning/${userId}`);
        const enrolledCourses = response.data;
        setEnrolled(enrolledCourses.map(course => course.id));
      } catch (err) {
        console.log(err);
      }
    }
    fetchEnrolled();
  }, [userId]);

  async function enrollCourse(courseId) {
    if (!enrolled.includes(courseId)) {
      try {
        if (!userId || isNaN(parseInt(userId))) {
          toast.error("User not logged in");
          return;
        }
        await axios.post('/api/learning', { userId: parseInt(userId), courseId });
        setEnrolled([...enrolled, courseId]);
        toast.success("Course Enrolled successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        setTimeout(() => {
          navigate(`/course/${courseId}`);
        }, 2000);
      } catch (err) {
        toast.error("Failed to enroll in course");
        console.log(err);
      }
    }
  }

  return (
    <div>
      <Navbar page={"courses"} />
      <div className="courses-container" style={{ marginTop: "20px" }}>
        {courses.map((course) => (
          <div key={course.course_id} className="course-card">
            <img src={course.p_link} alt={course.courseName} className="course-image" />
            <div className="course-details">
              <h3 className="course-heading">
                {course.courseName.length < 8 ? `${course.courseName} Tutorial` : course.courseName}
              </h3>
              <p className="course-description" style={{ color: "grey" }}>
                Price: Rs.{course.price}
              </p>
              <p className="course-description">Tutorial by {course.instructor}</p>
            </div>
            {enrolled.includes(course.course_id) ? (
              <button
                className="enroll-button"
                style={{ color: "#F4D03F", backgroundColor: "darkblue", fontWeight: "bold" }}
                onClick={() => navigate("/learnings")}
              >
                Enrolled
              </button>
            ) : (
              <button className="enroll-button" onClick={() => enrollCourse(course.course_id)}>
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
