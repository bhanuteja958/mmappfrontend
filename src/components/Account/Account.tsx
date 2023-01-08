import { IonIcon, IonInput, IonLabel, IonLoading } from '@ionic/react';
import { logOutOutline, trashBinSharp } from 'ionicons/icons';
import React, {FC, useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { useToast } from '../../common/CustomHooks';
import { logout } from '../../services/APIService';
import { checkInLocalIfLoggedIn, deleteAuthDetailsLocally } from '../../services/AuthService';
import { GlobalContext } from '../../store/GlobalContext';
import Toast from '../Toast/Toast';
import styles from './Account.module.css';

const Account:FC<{}> = () => {
    const history = useHistory();
    const {state, dispatch} = useContext(GlobalContext);
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {type, text, displayToast, showToast} = useToast(3000);
    const [loadingText, setLoadingText] = useState('Logging Out')

    const signoutUser = () => {
        setIsLoading(true);
        setLoadingText('')
        logout(state.userDetails.auth_token).then((res) => {
            if(res?.is_error) {
                setIsLoading(false);
                displayToast(res.message, 'error');
            } else {
                deleteAuthDetailsLocally().then(() => {
                    setIsLoading(false);
                    dispatch({type: 'LOGOUT'})
                    history.replace('/login');
                }).catch((error) => {
                    setIsLoading(false);
                    displayToast(error.response ? error.response.message : error.message, 'error');
                }); 
            } 
        }).catch((error) => {
            setIsLoading(false);
            displayToast(error.response ? error.response.message : error.message, 'error');
        });
    }

    useEffect(() => {
        setUsername(state.userDetails.username);
        setEmail(state.userDetails.email);
    })

    return (
        <div className={styles.accountContainer}>
            <div className={styles.accountForm}>
                <div className='formGroup'>
                    <IonLabel className={styles.accountFormLabel}>Username</IonLabel>
                    <IonInput type="text" className='formInput' value={username} readonly/>
                </div>
                <div className='formGroup'>
                    <IonLabel className={styles.accountFormLabel}>Email</IonLabel>
                    <IonInput type="email" className='formInput' value={email} readonly/>
                </div>
                <div className={styles.accountActions}>
                    <div className={styles.accountLogout} onClick={signoutUser}>
                        <IonIcon icon={logOutOutline} className={styles.logoutIcon}/>
                        <p className={styles.logoutText}>Logout</p>
                    </div>
                    <div className={styles.accountDelete}>
                        <IonIcon icon={trashBinSharp} className={styles.deleteIcon}/>
                        <p className={styles.logoutText}>Delete Account</p>
                    </div>
                </div>
            </div>
            <IonLoading isOpen={isLoading} spinner="circles" message={loadingText}/>
            {showToast && <Toast type={type} text={text} />}
        </div>
    )
}

export default Account;