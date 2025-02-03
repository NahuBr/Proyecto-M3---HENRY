import { useNavigate, Link } from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios"
import styles from "./Login.module.css"
import { UserContext } from "../../context/UserContext"

export const Login = ()=>{

    const navigate = useNavigate()

    const {connectUser} = useContext(UserContext)


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
                const response = await axios.post("https://proyecto-m3-henry-production.up.railway.app/users/login",input)                
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
            <div className={styles.window}>
                <p className={styles.text}>Bienvenido a</p>
                <h3 className={styles.title}>Puntos Coral</h3>
                <div className={styles.subcontainer}>
                    <form className={styles.form} onSubmit={handlerLoginOnSubmit}>
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

                    <p className={styles.p}>¿no tienes una cuenta?</p>
                    <Link to="/users/register" className={styles.registerButton}>Registrarse</Link>
                </div>
            </div>
        </div>
    </>
    )
}