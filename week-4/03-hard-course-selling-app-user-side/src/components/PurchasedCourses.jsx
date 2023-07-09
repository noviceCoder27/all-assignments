/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
function PurchasedCourses({courses}) {
    console.log(courses);
    const purchasedCourses = courses.filter(course => course.isPurchased);

    return <div>
        <h1>Purchased Courses</h1>
        {purchasedCourses.map(course => <Course 
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

export {PurchasedCourses};