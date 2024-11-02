import { useState } from "react"
import styles from "./CreateAppointment.module.css"
import axios from "axios"

export const CreateAppointment = ({handleClose,userid,updateAppointments}) => {

    const [input,setInput] = useState({
        date:"",
        time:"",
        userid:userid
    })

    const handlerOnChange = (event) => {
        const {name,value} = event.target

        setInput({
            ...input,
            [name]:value
        })
    }    

    const handlerSubmit = (event)=>{
        event.preventDefault()
        const fetchData = (async ()=>{
            try{
                const response = await axios.post("http://localhost:3000/appointments/schedule",input)
                alert(response.data)
                updateAppointments()
                handleClose()
            }catch(error){
                alert(error.response.data)
            }
        })();
    }

    return(
        <>
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Formulario</h2>
                <form onSubmit={handlerSubmit}>
                    <label>date</label>
                    <input type="date" name="date" onChange={handlerOnChange}/>
                    <label>time</label>
                    <input type="time" name="time" onChange={handlerOnChange}/>
                    <button type="submit">Enviar</button>
                </form>
                <button className={styles.button} onClick={handleClose}>X</button>
            </div>
        </div>
        </>
    )
}