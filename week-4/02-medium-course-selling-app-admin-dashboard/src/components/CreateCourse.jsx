import {useReducer} from "react";
import axios from "axios";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {

    async function createCourse() {
        const course = {
            title: state.title,
            description: state.description,
            price: state.price,
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
        price: null, 
        imageLink: "", 
        published: false 
    });

    return <div>
        <h1>Create Course Page</h1>
        <div>Title: </div>
        <input type={"text"} onChange={e => dispath({type: "TITLE", payload: e.target.value})} />
        <div>Description: </div>
        <input type={"text"} onChange={e => dispath({type: "DESCRIPTION", payload: e.target.value})} />
        <div>Price: </div>
        <input type={"number"} onChange={e => dispath({type: "PRICE", payload: e.target.value})} />
        <div>Image Link: </div>
        <input type={"text"} onChange={e => dispath({type: "IMAGE_LINK", payload: e.target.value})} />
        <br />
        <br />
        <button onClick={createCourse}>Create Course</button>
    </div>
}
export default CreateCourse;