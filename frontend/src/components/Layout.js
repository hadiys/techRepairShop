import { Outlet } from "react-router-dom"

const Layout = () => {
    // Layout will render the children of the Outlet component. Layout will be the parent component
    return <Outlet /> 
}

export default Layout