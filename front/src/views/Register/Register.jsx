import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";

export const Register = () => {
  const navigate = useNavigate();

  // Estado para el nuevo usuario
  const [newUser, setNewUser] = useState({
    name: '',
    email: '', // Nombre de usuario ahora está a nivel de primer nivel, no dentro de 'credential'
    credential: {
      username: '',
      password: '',
    }
  });

  // Manejo del cambio de datos en los inputs
  const handlerOnClick = (event) => {
    const { name, value } = event.target;

    // Si el campo es 'password', lo actualizamos dentro de 'credential'
    if (name === "password") {
      setNewUser({
        ...newUser,
        credential: {
          ...newUser.credential,
          [name]: value,
        }
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: value, // Actualizamos directamente en el estado para 'name', 'email', y 'username'
      });
    }
  };

  // Enviar los datos al backend cuando el formulario se envía
  const handlerRegisterOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://proyecto-m3-henry-production.up.railway.app/users/register", newUser);
      alert(response.data);
      navigate("/"); // Redirige al login después de un registro exitoso
    } catch (error) {
      alert(error.response?.data || 'Error al registrar usuario');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.blur}></div>
        <div className={styles.window}>
          <p className={styles.text}>Registrate a</p>
          <h3 className={styles.title}>Puntos Coral</h3>
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
                  required
                />
              </div>
              <div className={styles.input}>
                <label>Email </label>
                <input
                  type="email"
                  value={newUser.email}
                  name="email"
                  placeholder="Example@mail.com"
                  onChange={handlerOnClick}
                  required
                />
              </div>
              <div className={styles.input}>
                <label>Username </label>
                <input
                  type="text"
                  value={newUser.username}
                  name="username"
                  placeholder="Nombre de Usuario"
                  onChange={handlerOnClick}
                  required
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
                  required
                />
              </div>
              <button className={styles.button}>Registrarse</button>
            </form>

            <p className={styles.p}>¿Ya tienes una cuenta?</p>
            <Link to="/" className={styles.loginButton}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};
