import { Outlet } from "react-router-dom"
import DashHeader from "./DashHeader"
import DashFooter from "./DashFooter"

// Functional component
// DashLayout requires login but we will implement it later
const DashLayout = () => {
    return (
        // <> and </> are Fragments, which allow grouping elements without a wrapper node
        <>
        {/* Added the dash header and footer before and after the dash-container */}
            <DashHeader /> 
            {/* All children will be rendered within dash-container since the <Outlet /> is wrapped within it */}
            <div className="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}

export default DashLayout