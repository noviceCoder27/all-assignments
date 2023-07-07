/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
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
        case "IMAGE_LINK":
            return {...state,imageLink: action.payload};
        case "SET_TO_INITIAL":
          return {title: "",description: "", price: 0, imageLink: "",}
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
      prevCourses[i] = {...course,id: prevCourses[i].id}
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
    if(state.title && state.description && state.price && state.imageLink) {
      updateCourse();
    }
   
  }
  const course = courses.find(course => course.id === Number(courseId));
  return (
    <div>
     <h1>Course Content</h1>
     Title: {elementType.span ? 
      <span>{course?.title}</span>:
      <input type = "text" value = {state.title} onChange = {(e) => dispath({type: "TITLE", payload: e.target.value})}/>}
     <br />
     Description: {elementType.span ? 
     <span >{course?.description}</span>: 
     <input type = "text" value = {state.description} onChange = {(e) => dispath({type: "DESCRIPTION", payload: e.target.value})}/>}
     <br />
     Price: {elementType.span ? 
     <span >{course?.price}</span>: 
     <input type = "number" value = {state.price} onChange = {(e) => dispath({type: "PRICE", payload: e.target.value})}/>}
     <br />
     Image Link: {elementType.span ? 
     <span >{course?.imageLink}</span>: 
     <input type = "text" value = {state.imageLink} onChange = {(e) => dispath({type: "IMAGE_LINK", payload: e.target.value})}/>}
     <br />
     <br />
     <button onClick={handleClick}>{elementType.button === 'send' ? "Edit" : "Send" }</button>
    </div>
  )
}
