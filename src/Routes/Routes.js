import Main from '../Layout/Main'
import Blogs from '../Pages/Blogs';
import Experience from '../Pages/Experience';
import Home from '../Pages/Home';
import Homepage from '../Pages/Homepage/Homepage';
import ProjectDisplay from '../Pages/ProjectDisplay';
import Projects from '../Pages/Projects';
const { createBrowserRouter } = require("react-router-dom");


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>
            },
            {
                path: '/experience',
                element: <Experience></Experience>
            }
            ,
            {
                path: '/projects',
                element: <Projects></Projects>
            },
            {
                path: '/project/:id',
                element: <ProjectDisplay></ProjectDisplay>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            }
        ]
    }
])

export default router;