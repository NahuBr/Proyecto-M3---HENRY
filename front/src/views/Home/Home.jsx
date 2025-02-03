import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

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
            <h1>Bienvenido/a {user.name}</h1>

            <table>
                <thead>
                    <tr>
                        <th>Puntos</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    {puntosMontos.map((item, index) => (
                        <tr key={index}>
                            <td>{item.puntos}</td>
                            <td>{item.monto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};