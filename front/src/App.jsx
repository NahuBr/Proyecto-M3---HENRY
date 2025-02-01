import { Login } from "./views/Login/Login"
import { Route,Routes } from "react-router-dom"
import { Register } from "./views/Register/Register"
import {Home} from "./views/Home/Home"
import { NavBar } from "./components/NavBar"
import { MyAppointments } from "./views/MyAppointments/MyAppointments"
import Profile from "./views/Profile/Profile"

function App() {

  return (
    <>
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/users/register" element={<Register/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/appointments" element={<MyAppointments/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
