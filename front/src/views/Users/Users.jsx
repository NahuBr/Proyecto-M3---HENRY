import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./Users.module.css";
import axios from "axios";

export const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);
    const [showForm, setShowForm] = useState(false);
    const [pointsToModify, setPointsToModify] = useState({});
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        credential: {
            username: '',
            password: '',
        }
    });

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    const updateUsers = async () => {
        try {
            const response = await axios.get("https://proyecto-m3-henry-production.up.railway.app/users");
            setUsers(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePointsChange = (id, value) => {
        setPointsToModify((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleUpdatePoints = async (id) => {
        try {
            const pointsToAdd = parseInt(pointsToModify[id], 10) || 0;

            if (pointsToAdd === 0) return;

            await axios.put(`http://localhost:3000/users/modificar`, {
                points: pointsToAdd,
                id: id
            });

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, points: user.points + pointsToAdd } : user
                )
            );

            setPointsToModify((prev) => ({ ...prev, [id]: "" }));
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'username' || name === 'password') {
            setNewUser(prev => ({
                ...prev,
                credential: {
                    ...prev.credential,
                    [name]: value,
                }
            }));
        } else {
            setNewUser(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://proyecto-m3-henry-production.up.railway.app/users/register', newUser);
            setShowForm(false); // Cerrar el formulario después de enviar
            updateUsers(); // Actualizar la lista de usuarios
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (user.name) {
            updateUsers();
        } else {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.blur}></div>
                <div className={styles.list}>
                    <h3 className={styles.title}>Usuarios</h3>
                    <div className={styles.headers}>
                        <h3 className={styles.item}>Nombre</h3>
                        <h3 className={styles.item}>Email</h3>
                        <h3 className={styles.item}>Puntos</h3>
                        <h3 className={styles.item}>Modificar</h3>
                    </div>
                    <div className={styles.table}>
                        {users.length > 0 ? (
                            users.map((u) => (
                                <div key={u.id} className={styles.row}>
                                    <span className={styles.users}>{u.name}</span>
                                    <span className={styles.users}>{u.email}</span>
                                    <span className={styles.users}>{u.points}</span>
                                    <div className={styles.modify}>
                                        <input
                                            type="number"
                                            className={styles.points}
                                            placeholder="+/- puntos"
                                            value={pointsToModify[u.id] ?? ""}
                                            onChange={(e) => handlePointsChange(u.id, e.target.value)}
                                        />
                                        <button
                                            className={styles.ibutton}
                                            onClick={() => handleUpdatePoints(u.id)}
                                        >
                                            actualizar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay usuarios disponibles</p>
                        )}
                    </div>
                </div>
                <button onClick={handleButtonClick} className={styles.button}>Agregar Usuario</button>
            </div>

            {showForm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={handleClose}>&times;</span>
                        <h3>Agregar Nuevo Usuario</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={newUser.name}
                                onChange={handleInputChange}
                                placeholder="Nombre"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={newUser.email}
                                onChange={handleInputChange}
                                placeholder="Correo Electrónico"
                                required
                            />
                            <input
                                type="text"
                                name="username"
                                value={newUser.credential.username}
                                onChange={handleInputChange}
                                placeholder="Nombre de Usuario"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                value={newUser.credential.password}
                                onChange={handleInputChange}
                                placeholder="Contraseña"
                                required
                            />
                            <button type="submit" className={styles.button}>Registrar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
