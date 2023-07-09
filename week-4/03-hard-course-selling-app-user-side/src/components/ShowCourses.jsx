/* eslint-disable react/prop-types */
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ShowCourses({courses,setCourses}) {

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
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
       
    },[])
    return <div>
        <h1>Created Courses</h1>
        {courses.map(course => <Course 
        key = {course.id} 
        id = {course.id}
        title={course.title} 
        description = {course.description} 
        price = {course.price}
        imageLink = {course.imageLink}
        />)}
    </div>
}

function Course(props) {
    return <div>
        <Link to = {{ pathname: `/courses/${props.id}`}}>
            {props.title}
        </Link>
    </div>
}

export default ShowCourses;