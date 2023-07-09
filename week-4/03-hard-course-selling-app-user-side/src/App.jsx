import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Landing from "./components/Landing";
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import { CourseContent } from './components/CourseContent';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { PurchasedCourses } from './components/PurchasedCourses';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    const [courses, setCourses] = useState([]);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                 <Route path = "/courses" element = {
                    <ProtectedRoutes>
                        <ShowCourses courses = {courses} setCourses = {setCourses}/>
                    </ProtectedRoutes>
                } />
                 <Route path = "/courses/:id" element = {
                    <ProtectedRoutes >
                        <CourseContent courses = {courses} setCourses={setCourses}/>
                    </ProtectedRoutes>
                } />
                 <Route path = "/courses/purchased" element = {
                    <ProtectedRoutes >
                        <PurchasedCourses courses = {courses}/>
                    </ProtectedRoutes>
                } />
            </Routes>
        </Router>
    );
}

export default App;