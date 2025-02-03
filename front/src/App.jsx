import { Login } from "./views/Login/Login"
import { Route,Routes } from "react-router-dom"
import { Register } from "./views/Register/Register"
import {Home} from "./views/Home/Home"
import { NavBar } from "./components/NavBar"
import { Users } from "./views/Users/Users"

function App() {

  return (
    <>
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/users/register" element={<Register/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
