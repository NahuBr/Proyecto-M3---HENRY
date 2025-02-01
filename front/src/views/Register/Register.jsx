import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./Register.module.css"

export const Register = ()=>{
    
    const navigate = useNavigate()

    const [newUser,setNewUser] = useState({
    name:'',
    email:'',
    birthdate:'',
    nDni:0,
    credential:{
      username:'',
      password:'',
    }
  })

  

  const handlerOnClick = (event) => {
    const {name, value} = event.target    
   if(name === 'username' || name==="password"){
      
      setNewUser({
        ...newUser,
        credential:{
          ...newUser.credential,
          [name]:value
        }
      })
    }else{
      setNewUser({
        ...newUser,
        [name]:value
      })    
    }
  }

  const handlerRegisterOnSubmit = (event) => {
    event.preventDefault();
    const fetchRegisterData = (async () => {
      try{
        const response = await axios.post("http://localhost:3000/users/register",newUser)
        alert(response.data)
        navigate("/")
      }catch(error){
        alert(error.response.data)
      }
    })();
  }

    return(
        <>
        <div className={styles.container}>
          <div className={styles.blur}></div>
          <div className={styles.window}>
            <p className={styles.text}>Registrate al</p>
            <h3 className={styles.title}>Home Banking</h3>
            <div className={styles.subcontainer}>
              <form className={styles.form} onSubmit={handlerRegisterOnSubmit}>
                  <div className={styles.input}>
                      <label>Name </label>
                      <input 
                          type="text"
                          value={newUser.name}
                          name="name"
                          placeholder="Nombre y Apellido"
                          onChange={handlerOnClick}
                      />
                  </div>
                  <div className={styles.input}>
                      <label>Email </label>
                      <input 
                          type="text"
                          value={newUser.email}
                          name="email"
                          placeholder="Example@mail.com"
                          onChange={handlerOnClick}
                      />
                  </div>
                  <div className={styles.input}>
                      <label>Birthdate </label>
                      <input 
                          type="date"
                          value={newUser.date}
                          name="birthdate"
                          onChange={handlerOnClick}
                      />
                  </div>
                  <div className={styles.input}>
                      <label>DNI </label>
                      <input 
                          type="number"
                          value={newUser.nDni}
                          name="nDni"
                          placeholder="Numero de Documento"
                          onChange={handlerOnClick}
                      />
                  </div>
                  <div className={styles.input}>
                      <label>Username </label>
                      <input 
                          type="text"
                          value={newUser.credential.username}
                          name="username"
                          placeholder="Nombre de Usuario"
                          onChange={handlerOnClick}
                      />
                  </div>
                  <div className={styles.input}>
                      <label>Password </label>
                      <input 
                          type="password"
                          value={newUser.credential.password}
                          name="password"
                          placeholder="Contraseña"
                          onChange={handlerOnClick}
                      />
                  </div>
                  <button className={styles.button}>Submit</button>
              </form>

              <p className={styles.p}>¿Ya tienes una cuenta?</p>
              <Link to="/" className={styles.loginButton}>Login</Link>
            </div>
          </div>
        </div>
        </>
    )
}