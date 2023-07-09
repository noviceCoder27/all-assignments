/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
export const CourseContent = ({courses,setCourses}) => {
  useEffect(() => {
    async function getCourses() {
        try {
            const response = await axios.get('http://localhost:3000/users/courses',{
                headers: {
                    Authorization: "Bearer "+ JSON.parse(localStorage.getItem("token"))
                }
            });
            const data = await response.data;
            setCourses(data.courses);
        } catch(err) {
            console.log("Error fetching courses "+ err.message);
        }
       
    }
    getCourses();
   
  },[courses]);
  const params = useParams();
  const courseId = params.id;
  const course = courses.find(course => course.id === Number(courseId));
  function handleClick() {
    const index = courses.indexOf(course);
    const newCourses = courses.map(course => course);
    newCourses.splice(index,1);
    const updatePurchase = {...courses,isPurchased: true};
    newCourses.splice(index,0,updatePurchase);
    console.log(newCourses);
    setCourses(newCourses);
  }
 
  return (
    <div>
     <h1>Course Content</h1>
     Title:
      <span>{course?.title}</span>
     <br />
     Description: 
     <span >{course?.description}</span>
     <br />
     Price: 
     <span >{course?.price}</span>
     <br />
     Image Link: 
     <span >{course?.imageLink}</span>
     <br />
     <br />
     <button onClick={handleClick}>Purchase</button>
    </div>
  )
}
