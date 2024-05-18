import Home from '../page/Home'
import Page2 from '../page/Page2'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(
    [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/page2', element: <Page2 /> },
    ]
)
export default router