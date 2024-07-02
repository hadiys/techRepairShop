import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Public from "./components/Public"
import Login from "./features/auth/Login"
import DashLayout from "./components/DashLayout"
import Welcome from "./features/auth/Welcome"
import NotesList from "./features/notes/NotesList"
import UsersList from "./features/users/UsersList"

function App() {
  return (
    <Routes>
      {/* Layout is the parent of everything so it will have a closing tag
          Layout does not show anything it just renders its children      */}

      <Route path="/" element={<Layout/>}>
        
        {/* Route index makes Public the default component that will render 
            when the root path is visited                                 */}
        
        <Route index element={<Public />}/>
        <Route path="login" element={<Login />}/>

        {/* DashLayout will encapsulate other elements which will only be 
            accessible via the 'dash' path                                */}
       
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          
          <Route path="notes">
            <Route index element={<NotesList />} />
          </Route>
          
          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;
