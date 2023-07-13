import {useReducer} from "react";
import axios from "axios";
import { Box,Flex,Text } from '@mantine/core';
function CreateCourse() {

    async function createCourse() {
        const course = {
            title: state.title,
            description: state.description,
            price: Number(state.price),
            imageLink: state.imageLink,
            published:true
        }
        try {
            const response = await axios.post('http://localhost:3000/admin/courses',course, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            });
            const data = response.data;
            console.log(data);
            window.location.href = '/courses'
        } catch(err) {
            console.log("Error adding course "+ err.message);
        }
    }

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
            case "PUBLISHED":
                return {...state,published: action.payload};
        }
    }, {
        title: "",
        description: "", 
        price: 0, 
        imageLink: "", 
        published: false 
    });

    return (
        <div>
        <Box sx = {{marginTop: "3rem", marginLeft: "32rem"}}>
            <h1 style = {{fontFamily: "monospace"}}>Create Course</h1>
            <Text >Want to view created courses? <a href = '/courses' style={{textDecorationLine: "none",color: "blue"}}>Courses</a></Text>
        </Box>
        <Flex direction={"column"} justify={"center"} align={"center"} sx = {{marginTop: "2rem",marginRight: "1rem"}} gap={"0.5rem"} >
            <div style = {{marginRight: "28rem"}}>Title:</div>
            <input type={"text"} onChange={e => dispath({type: "TITLE", payload: e.target.value})} value = {state.title} style = {{width: "30vw", padding: "0.5rem"}}/>
            <div style = {{marginRight: "25rem"}}>Description:</div>
             <input type={"text"} onChange={e => dispath({type: "DESCRIPTION", payload: e.target.value})} value = {state.description} style = {{width: "30vw", padding: "0.5rem"}}/>
             <div style = {{marginRight: "27.5rem"}}>Price:</div>
             <input type={"number"} onChange={e => dispath({type: "PRICE", payload: e.target.value})} value = {state.price} style = {{width: "30vw", padding: "0.5rem"}}/>
             <div style = {{marginRight: "25rem"}}>Image Link:</div>
             <input type={"text"} onChange={e => dispath({type: "IMAGE_LINK", payload: e.target.value})} value = {state.imageLink} style = {{width: "30vw", padding: "0.5rem"}}/>
            <button onClick={createCourse} style = {{marginTop: "2rem", width: "31vw",padding: "0.8rem 0.5rem",backgroundColor: "darkorange",border: "none", borderRadius: "5px",fontSize: "1.2rem",color: "white",cursor: "pointer"}}>Create Course</button>
        </Flex>
     
    </div>
    )
}
export default CreateCourse;
