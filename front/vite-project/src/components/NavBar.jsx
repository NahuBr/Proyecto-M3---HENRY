import styles from "./navbar.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/UserContext";

export const NavBar = ()=>{
  const {user,disconnectUser} = useContext(userContext)

  const handlerLogout = ()=>{
    disconnectUser()
  }

  return (
      <>
      <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li className={styles.links}><Link to="/home">Home</Link></li>
        {user && user.name ? ( // Verifica si hay un usuario logueado
            <>
              <li className={styles.links}><Link to="/appointments">My Appointments</Link></li>
              <li className={styles.links}><Link to="/profile">Profile</Link></li>
              <li className={styles.links}><Link to="/home" onClick={handlerLogout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li className={styles.links}><Link to="/">Login</Link></li>
              <li className={styles.links}><Link to="/users/register">Register</Link></li>
            </>
          )}
      </ul>
    </nav>
  </>
  );
}