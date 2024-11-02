import { Turn } from "../components/Turn"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../context/UserContext"
import { useState,useEffect } from "react"
import styles from "./MyAppointments.module.css"
import axios from "axios"
import { CreateAppointment } from "../components/CreateAppointment"

export const MyAppointments = ()=>{

    const navigate = useNavigate()

    const [turns,setTurns] = useState([])
    const {user} = useContext(userContext)

    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    const updateAppointments = async () => {
        try {
            const response = await axios.get("http://localhost:3000/appointments");
            const result = response.data.filter((element) => element.user.id === user.id);
            setTurns(result);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(()=>{
            if(user.name){
                updateAppointments()
            }else{
                navigate("/home")
            }
        },[])

    return(<>
        <div>
            <div className={styles.container}>
                <h1>Mis Turnos</h1>
                <div className={styles.list}>
                    <div className={styles.table}>
                        <h3 className={styles.item}>Fecha</h3>
                        <h3 className={styles.item}>Hora</h3>
                        <h3 className={styles.item}>Estado</h3>
                    </div>
                    {turns && turns.length > 0 ? (
                        turns.map(turn => <Turn key={turn.id} turn={turn} updateAppointments={updateAppointments}/>)
                    ) : (
                        <h3>Sin Turnos agendados</h3>
                    )}
                </div>
                <button onClick={handleButtonClick} className={styles.button}>Crear Turno</button>
            </div>
            {showForm && (
                <CreateAppointment userid={user.id} handleClose={handleClose} updateAppointments={updateAppointments}/>
            )}
        </div>
    </>)
}