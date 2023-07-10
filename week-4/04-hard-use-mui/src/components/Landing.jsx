
import { Image,Text,Box } from '@mantine/core';
import MyImage from '../assets/Vector.png'
import Person from '../assets/image.png'
import AnotherPerson from '../assets/image2.png'
function Landing() {
   
    return (
            <div>
                <Image  src = {MyImage} style = {{position: 'absolute', top: 0,right: 0,width: '60%',zIndex: '-10'}}/>
                <img  src = {Person} style={{position: 'absolute' ,height: '70%', right: '30%'}}/>
                <img  src = {AnotherPerson} style={{position: 'absolute' ,height: '70%', right: '10%'}}/>
                <Box sx = {{marginTop: "6rem", padding: "1rem"}}>
                    <h1 style={{fontFamily: "fantasy", fontWeight: "500", fontSize: "2.2rem"}}>Welcome to our course selling website!</h1>
                    <Text sx = {{maxWidth: "40vw", color: "darkslategrey",marginTop: "2rem",marginBottom: "3.5rem", fontSize: "0.9rem"}}>
                    Take the first step towards achieving your dreams by investing in yourself with our online courses. Our easy-to-use platform allows you to purchase and access a wide range of courses, all from the comfort of your own home. With topics ranging from business and technology to creative arts and personal development, there’s something for everyone. Don’t wait, start learning and growing today by buying one of our online courses!
                    </Text>
                    <a href="/courses" style={{textDecoration: "none", padding: "1rem 1.5rem", backgroundColor: "#f86b43", color: "white",fontSize: "1.2rem",fontFamily: 'sans-serif',borderRadius: "10px",cursor: "pointer"}}>Courses</a>
                </Box>
               
            </div>
    )
}

export default Landing;