import { useContext } from "react"
import { userContext } from "../context/UserContext"

export const Home = ()=>{    

    const {user} = useContext(userContext)

    return(<>
        <h1>Bienvenido/a {user.name}</h1>
    </>)
}