import { Login } from "./views/Login"
import { Route,Routes } from "react-router-dom"
import { Register } from "./views/Register"
import {Home} from "./views/Home"
import { NavBar } from "./components/NavBar"
import { MyAppointments } from "./views/myAppointments"

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
      </Routes>
    </div>
    </>
  )
}

export default App
