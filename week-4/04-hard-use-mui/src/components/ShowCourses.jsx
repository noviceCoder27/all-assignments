/* eslint-disable react/prop-types */
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Text,Box,Flex } from "@mantine/core";
import { useRecoilState } from "recoil";
import CoursesState from "../context/CoursesAtom";
function ShowCourses() {

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    const [courses,setCourses] = useRecoilState(CoursesState);
    useEffect(() => {
        async function getCourses() {
            try {
                const response = await axios.get('http://localhost:3000/admin/courses',{
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
    return (
    <div style = {{margin: "2rem"}}>
        <h1 style = {{fontFamily: "sans-serif", color: "#f86b43"}}>Created Courses</h1>
        <Text >Want to create a  course? <a href = '/about' style={{textDecorationLine: "none",color: "blue"}}>Click here</a></Text>
        <Flex gap={"2rem"}>
            {courses.map(course => <Course 
            key = {course.id} 
            id = {course.id}
            title={course.title} 
            description = {course.description} 
            price = {course.price}
            imageLink = {course.imageLink}
            />)}
        </Flex>
       
    </div>
    ) 
}

function Course(props) {
    return (
        <div style={{backgroundColor: "whitesmoke", width: "300px", height: "300px",borderRadius: "1.5rem", padding: "1rem", marginTop: "1.2rem"}}>
            <Box sx = {{width: "300px", height: "200px",border: "1px darkorange solid"}}> 
                <img src = {props.imageLink} width = {"100%" } height = {"100%"} alt = 'Course Image' loading="lazy"/>
            </Box>
            <Text style = {{textDecoration: "none", color:"#f86b43", display: "block", fontWeight: "700",marginTop: "1rem", fontSize: "1.2rem", marginBottom: "1rem"}}>{props.title}</Text>
            <Flex justify = {"center"} sx = {{ width: "300px", backgroundColor: "#f86b43", paddingTop: "0.5rem",paddingBottom: "0.5rem", borderRadius: "5px",cursor: "pointer"}}>
            <Link to = {{ pathname: `/courses/${props.id}`}} style = {{textDecoration: "none",color: "white", "fontSize": "1rem", fontWeight: "600", fontFamily:"sans-serif"}}>
               View Content
            </Link>
            </Flex>
           
        </div>
    )
   
}

export default ShowCourses;