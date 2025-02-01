import styles from "./NavBar.module.css"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import logoImage from '../assets/LogoImage.jpg';
import { UserContext } from "../context/UserContext";

export const NavBar = ()=>{
  const {user,disconnectUser} = useContext(UserContext)

  const handlerLogout = ()=>{
    disconnectUser()
  }

  return (
      <>
      <nav className={styles.navbar}>
        <img className={styles.img} src={logoImage} alt="" />
      <ul className={styles.navLinks}>
        {user && user.name ? ( // Verifica si hay un usuario logueado
            <>
              <li className={styles.links}><Link to="/home">Home</Link></li>
              <li className={styles.links}><Link to="/appointments">My Appointments</Link></li>
              <li className={styles.links}><Link to="/profile">Profile</Link></li>
              <li className={styles.links}><Link to="/" onClick={handlerLogout}>Logout</Link></li>
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