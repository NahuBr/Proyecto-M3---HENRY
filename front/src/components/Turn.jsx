import axios from "axios";
import styles from "./Turn.module.css"

export const Turn = ({turn,updateAppointments})=>{    

    const handlerOnClick = () => {
        const fetchData = (async () => {
            try{
                const data = {id:turn.id}
                
                const response = await axios.put("http://localhost:3000/appointments/cancel",data)
                alert(response.data+" Correctamente")
                updateAppointments()
            }catch(error){
                alert(error.response.data);
            }
        })();
    }

    return(<>
        <div className={styles.container}>
            <h3 className={styles.item}>{turn.date}</h3>
            <h3 className={styles.item}>{turn.time} hs</h3>
            <h3 className={styles.item}>{turn.status}</h3>
            <button onClick={handlerOnClick} className={styles.button} >X</button>
        </div>
    </>)
}