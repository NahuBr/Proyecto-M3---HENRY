import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./Home.module.css";  // Importamos los estilos

export const Home = () => {    
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user.name) {
            navigate("/");
        }
    }, [user, navigate]);

    const puntosMontos = [
        { puntos: 100, monto: "100$" },
        { puntos: 200, monto: "250$" },
        { puntos: 500, monto: "650$" },
        { puntos: 1000, monto: "1500$" },
        { puntos: 2000, monto: "3500$" },
        { puntos: 4000, monto: "8000$" },
        { puntos: 10000, monto: "25000$" }
    ];

    return (
        <>
            <h3 className={styles.points}>Mis Puntos {user.points}</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Puntos</th>
                        <th className={styles.th}>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {puntosMontos.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.td}>{item.puntos}</td>
                            <td className={styles.td}>{item.monto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
