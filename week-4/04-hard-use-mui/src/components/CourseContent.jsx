/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Flex } from "@mantine/core";

export const CourseContent = ({courses,setCourses}) => {
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
   
  },[]);
  const params = useParams();
  const courseId = params.id;

  const [elementType,setElementType] = useState({span:true,button: 'send'});
  const [state, dispath] = useReducer((state,action) => {
    switch(action.type) {
        case "TITLE":
            return {...state,title: action.payload};
        case "PRICE":
            return {...state,price: action.payload};
        case "DESCRIPTION":
            return {...state,description: action.payload};
        case "SET_TO_INITIAL":
          return {title: "",description: "", price: 0, imageLink: "",};
    }
}, {
    title: "",
    description: "", 
    price: 0, 
    imageLink: "",
});

function updateCoursesArr(course,prevCourses) {
  for(let i = 0; i < prevCourses.length;i++) {
    if(prevCourses[i].id === Number(courseId)) {
      prevCourses[i] = {...course,id: prevCourses[i].id,imageLink: prevCourses[i].imageLink}
    }
  }
  return prevCourses;
}

  async function updateCourse() {
    const course = {title: state.title, description: state.description,price:state.price,imageLink:state.imageLink};
    try {
      await axios.put('http://localhost:3000/admin/courses/' + courseId, course ,{
          headers: {
              Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
          }
      });
      setCourses(prevCourses => updateCoursesArr(course,prevCourses))
      setElementType({span:true,button: 'send'});
      dispath({type: "SET_TO_INITIAL"});
  } catch(err) {
      console.log("Error updating course "+ err.message);
  }
  }

  function handleClick() {
    setElementType({span:false,button: 'edit'});
    if(state.title && state.description && state.price) {
      updateCourse();
    }
   
  }
  const course = courses.find(course => course.id === Number(courseId));
  return (
    <div style = {{margin: "2rem"}}>
    <h1 style = {{fontFamily: "sans-serif", color: "#f86b43"}}>About the course </h1>
    <Flex >
      <img src = {course?.imageLink} width = {"50%"} style={{marginRight: "3rem"}}/>
      <Flex direction={"column"} sx = {{maxWidth: "40vw"}}>
        {elementType.span ? 
        <span style = {{marginBottom: "2rem", fontSize: "2.5rem", fontFamily: "monospace", fontWeight: "600"}}>{course?.title}</span>:
        <>
          <span>Title:</span>
          <input type = "text" style = {{padding: "0.5rem",width: "300px", marginBottom: "0.5rem"}} value = {state.title} onChange = {(e) => dispath({type: "TITLE", payload: e.target.value})}/>
        </>
        }
        {elementType.span ? 
        <span style = {{color: "slategray", marginBottom: "2rem",fontSize: "1rem",fontFamily: "sans-serif"}}>{course?.description}</span>: 
        <>
          <span>Description: </span>
          <input type = "text" style = {{padding: "0.5rem",width: "300px", marginBottom: "0.5rem"}} value = {state.description} onChange = {(e) => dispath({type: "DESCRIPTION", payload: e.target.value})}/>
        </>
        }
        {elementType.span ? 
        <span style = {{marginBottom: "1rem",fontSize: "1.5rem",fontFamily: "sans-serif", fontWeight: "600"}}>Price: ${course?.price}</span>: 
        <>
          <span>Price:</span>
          <input type = "number" style = {{padding: "0.5rem",width: "300px", marginBottom: "0.5rem"}} value = {state.price} onChange = {(e) => dispath({type: "PRICE", payload: e.target.value})}/>
        </>
       }
        <button style =  {{width: "100px", padding: "0.8rem 1rem", fontSize: "1.2rem", backgroundColor: "#f86b43", border: "none", borderRadius: "10px", color: "white", cursor: "pointer"}} onClick={handleClick}>{elementType.button === 'send' ? "Edit" : "Send" }</button>
      </Flex>
    </Flex>
    </div>
  )
}
