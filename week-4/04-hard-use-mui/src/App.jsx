import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import { CourseContent } from './components/CourseContent';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Navbar } from './components/Navbar';
import { Container } from '@mantine/core';

function App() {
    // adding style to the body element
    // useEffect(() => {
    //     const style = document.createElement('style');
    //     style.innerHTML = 'body { overflow: hidden; }';
    //     document.head.appendChild(style);
    //   }, []);
    return (
        <div style = {{minHeight: '100vh'}}>
            <Router>
                <Container fluid sx = {{padding: '1rem',margin:0}}>
                    <Navbar />
                </Container>
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
        </div>
       
    );
}

export default App;