import { Turn } from "../../components/Turn"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { useState,useEffect } from "react"
import styles from "./MyAppointments.module.css"
import axios from "axios"
import { CreateAppointment } from "../../components/CreateAppointment"

export const MyAppointments = ()=>{

    const navigate = useNavigate()

    const [turns,setTurns] = useState([])
    const {user} = useContext(UserContext)

    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    const updateAppointments = async () => {
        try {
            const response = await axios.get("https://proyecto-m3-henry-production.up.railway.app/appointments");
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
                navigate("/")
            }
        },[])

    return(<>
        <div>
            <div className={styles.container}>
                <div className={styles.blur}></div>
                    <div className={styles.list}>
                            <h3 className={styles.title}>Mis Turnos</h3>
                            <div className={styles.headers}>
                                <h3 className={styles.item}>Fecha</h3>
                                <h3 className={styles.item}>Hora</h3>
                                <h3 className={styles.item}>Estado</h3>
                            </div>
                    <div className={styles.table}>
                        {turns && turns.length > 0 ? (
                            turns.map(turn => <Turn key={turn.id} turn={turn} updateAppointments={updateAppointments}/>)
                        ) : (
                            <h3>Sin Turnos agendados</h3>
                        )}
                    </div>
                </div>
                <button onClick={handleButtonClick} className={styles.button}>Crear Turno</button>
            </div>
            {showForm && (
                <CreateAppointment userid={user.id} handleClose={handleClose} updateAppointments={updateAppointments}/>
            )}
        </div>
    </>)
}