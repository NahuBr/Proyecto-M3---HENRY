import styles from './Profile.module.css'
import { UserContext } from '../../context/UserContext';
import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import editarIcon from '../../assets/icons/editar.png';
import axios from 'axios';
import defaultImage from '../../assets/defaultUser.webp'

function Profile(){

    const baseUrl = 'http://proyecto-m3-henry-production.up.railway.app';

    const navigate = useNavigate()
    const fileInputRef = useRef(null);
    const profileImageRef = useRef(null);
    const { user, updateUserProfile } = useContext(UserContext)

    console.log(user);
    

    useEffect(()=>{
            if(!user.name){
                navigate("/")
            }
        },[])

    const handlerOnClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    }

    const handlerUploadImage = (event) => {

        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();

            formData.append('profilePicture', file);
            formData.append('id', user.id);

            const fetchRegisterData = (async () => {
                try{
                    const response = await axios.post("http://proyecto-m3-henry-production.up.railway.app/upload",formData)
                    const newImagePath = response.data;

                    updateUserProfile(newImagePath);
                    profileImageRef.current.src = `${baseUrl}${newImagePath}`;
                        
                }catch(error){
                    console.log(error);    
                }
            })();
        }
    }


    return(
        <>
        <div className={styles.container}>
            <div className={styles.window}>
                <p className={styles.text}>Perfil de</p>
                <h3 className={styles.title}>{user.name}</h3>
                <div className={styles.subcontainer}>
                    {user.profilePicture != null ?(
                            <img src={`${baseUrl}${user.profilePicture}`} alt="" className={styles.profile} ref={profileImageRef}/>
                        ):(
                            <img src={defaultImage} alt="" className={styles.profile} ref={profileImageRef}/>
                        )
                    }
                    <img src={editarIcon} className={styles.boton} onClick={handlerOnClick}/>
                    <input
                        type="file"
                        onChange={handlerUploadImage}
                        ref={fileInputRef}
                        className={styles.oculto}
                    />
                    <div>
                        <h3>Documento</h3>
                        <p>{user.nDni}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;