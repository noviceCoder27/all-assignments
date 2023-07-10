import { Box, Flex,Text } from "@mantine/core"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

export const Navbar = () => {
    const location = useLocation();
    const token = JSON.parse(localStorage.getItem("token"));
    const singout = () => {
        localStorage.removeItem("token");
    }
  return (
    <header>
        <Flex justify={'space-between'} align={'center'}>
            <Box>
                <a href = '/' style={{textDecoration: "none",fontFamily: "monospace",fontSize: "1.5rem", color: "black"}}><span style={{color: "white", backgroundColor: "#f86b43",padding: "0.5rem 1rem", borderRadius: "100%", marginRight: "0.5rem"}}>E</span>Learning</a>
            </Box>
            <Flex gap={'1rem'} align={'center'}>
                {!token && (
                    <>
                        <Link to  = "/login" style = {{textDecoration: 'none'}} >
                            {location.pathname === '/' ?
                            <Text sx = {{fontSize :'1.2rem',color: 'white', ":hover": {color: 'black'}}}>Sign in</Text>
                            : 
                            <Text sx = {{fontSize :'1.2rem',color: '#f86b43',fontWeight: "600",":hover": {color: 'darkorange'}}}>Sign in</Text>}
                        </Link>
                        <Link to = "/register" style = {{textDecoration: 'none'}}>
                            {location.pathname === '/' ?
                            <Text sx = {{fontSize :'1.2rem', padding: '0.8rem 1.2rem',color: 'black', backgroundColor: 'white',borderRadius: '2rem',":hover": {color: 'darkorange'}}}>Sign up</Text>
                            :
                            <Text sx = {{fontSize :'1.2rem', padding: '0.8rem 1.2rem',color: 'white', backgroundColor: '#f86b43',borderRadius: '2rem',":hover": {backgroundColor: 'orange'}}}>Sign up</Text>
                            }
                        </Link>
                    </>
                )}
                {token && (
                    <>
                        <Link to = "/" style = {{textDecoration: 'none'}} onClick={singout}>
                            {location.pathname === '/' ?
                            <Text sx = {{fontSize :'1.2rem', padding: '0.8rem 1.2rem',color: 'black', backgroundColor: 'white',borderRadius: '2rem',":hover": {color: 'darkorange'}}}>Sign out</Text>
                            :
                            <Text sx = {{fontSize :'1.2rem', padding: '0.8rem 1.2rem',color: 'white', backgroundColor: '#f86b43',borderRadius: '2rem',":hover": {backgroundColor: 'orange'}}}>Sign out</Text>
                            }
                        </Link>
                    </>
                )}
            </Flex>
          
        </Flex>
        
    </header>
  )
}
