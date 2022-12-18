import { IonIcon, IonInput, IonLabel } from '@ionic/react';
import { logOutOutline, trashBinSharp } from 'ionicons/icons';
import React, {FC, useContext, useState} from 'react';
import { useHistory } from 'react-router';
import { useToast } from '../../common/CustomHooks';
import { logout } from '../../services/APIService';
import { deleteAuthDetailsLocally } from '../../services/AuthService';
import { GlobalContext } from '../../store/GlobalContext';
import Toast from '../Toast/Toast';
import styles from './Account.module.css';

const Account:FC<{}> = () => {
    const history = useHistory();
    const {state, dispatch} = useContext(GlobalContext);
    const [username, setUsername] = useState<string>('test');
    const [email, setEmail] = useState<string>('test@gmail.com');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {type, text, displayToast, showToast} = useToast(3000);

    const signoutUser = () => {
        setIsLoading(true);
        logout(state.userDetails.auth_token).then((res) => {
            if(res?.is_error) {
                setIsLoading(false);
                displayToast(res.message, 'error');
            } else {
                deleteAuthDetailsLocally().then(() => {
                    displayToast(res.message, 'success');
                    setTimeout(() => {
                        dispatch({type: 'LOGOUT'})
                        history.replace('/login');
                    }, 2000);
                }).catch((err) => {
                    console.log('error');
                }); 
            } 
        }).catch((error) => {
            setIsLoading(false);
            displayToast(error.response ? error.response.message : error.message, 'error');
        });
    }

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
            {showToast && <Toast type={type} text={text} />}
        </div>
    )
}

export default Account;