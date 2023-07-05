import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import { CourseContent } from './components/CourseContent';
import { ProtectedRoutes } from './components/ProtectedRoutes';

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path = "/about" element = {
                    <ProtectedRoutes>
                        <CreateCourse />
                    </ProtectedRoutes>
                } />
                 <Route path = "/courses" element = {
                    <ProtectedRoutes>
                        <ShowCourses />
                    </ProtectedRoutes>
                } />
                 <Route path = "/courses/:id" element = {
                    <ProtectedRoutes >
                        <CourseContent />
                    </ProtectedRoutes>
                } />
            </Routes>
        </Router>
    );
}

export default App;