import { useNavigate, Link } from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios"
import styles from "./Login.module.css"
import { userContext } from "../context/UserContext"

export const Login = ()=>{

    const navigate = useNavigate()

    const {connectUser} = useContext(userContext)


    const [input,setInput] = useState({
        username:'',
        password:''
    })

    const handlerOnClick = (event) => {
        const {name,value} = event.target

        setInput({
            ...input,
            [name]:value
        })    

    }

    const handlerLoginOnSubmit = (event) => {
            event.preventDefault();
            const fetchLoginData = (async () => {
            try{                
                const response = await axios.post("http://localhost:3000/users/login",input)                
                connectUser(response.data)
                navigate("/home")
            }catch(error){
                alert(error.response.data)
            }
        })();
    }

    return(
        <>
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handlerLoginOnSubmit}>
                <h2 className={styles.title}>Login</h2>
                <div className={styles.input}>
                    <label>Username </label>
                    <input 
                        type="text"
                        value={input.username}
                        name="username"
                        placeholder="Nombre de Usuario"
                        onChange={handlerOnClick}
                    />
                </div>
                <div className={styles.input}>
                    <label>Password </label>
                    <input 
                        type="password"
                        value={input.password}
                        name="password"
                        placeholder="Contraseña"
                        onChange={handlerOnClick}
                    />
                </div>
                <button className={styles.button}>Submit</button>
            </form>

            <p>¿no tienes una cuenta?</p>
            <Link to="/users/register" className={styles.registerButton}>Registrarse</Link>
        </div>
    </>
    )
}