import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

export const Home = ()=>{    

    const navigate = useNavigate()

    const {user} = useContext(UserContext)

    useEffect(()=>{
            if(!user.name){
                navigate("/")
            }
        },[])

    return(<>
        <h1>Bienvenido/a {user.name}</h1>
    </>)
}