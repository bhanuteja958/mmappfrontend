import { IonButton, IonContent, IonInput, IonLabel, IonLoading, IonPage, useIonLoading} from '@ionic/react';
import { FC, useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { useToast } from '../../common/CustomHooks';
import Toast from '../../components/Toast/Toast';
import { SPINNER_STYLE } from '../../config/constants';
import { login } from '../../services/APIService';
import { setAuthDetailsLocally } from '../../services/AuthService';
import { GlobalContext } from '../../store/GlobalContext';
import styles from './Login.module.css';

const Login:FC<any>  = () => {
    const history = useHistory();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {text, type, showToast, displayToast} = useToast(2500);
    const {state, dispatch} = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const usernameInputHandler = (event:any) => {
        const {value} = event.target;
        setUsername(value);
    }

    const passwordInputHandler = (event:any) => {
        const {value} = event.target;
        setPassword(value);
    }

    const validateLoginForm = () => {
        if( username === '') {
            displayToast('Please enter username', 'warning');
            return false;
        }

        if(password === ''){
            displayToast('Please enter password', 'warning');
            return false;
        }

        return true;
    }

    const loginUser = () => {
        const isValidCredentials:boolean  = validateLoginForm()
        if(isValidCredentials){
            setIsLoading(true);
            login(username,password).then((res) => {
                setIsLoading(false);
                if(res?.is_error){
                    displayToast(res.message, 'error')
                } else {
                    dispatch({type: 'LOGIN', payload: res.data.user_details})
                    setAuthDetailsLocally(res.data.user_details).then(() => {
                        setIsLoading(false);
                        history.replace('/home');
                    }).catch((error) => {
                        setIsLoading(false);
                        displayToast(error.response ? error.response.message : error.message, 'error')
                    }) 
                }
            }).catch((error) => {
                setIsLoading(false);
                let displayMessage = error.response ? error.response.message : error.message;
                displayToast(displayMessage, 'error');
            })      
        }
    }

    return (
        <IonPage>
            <IonContent className={styles.loginContainer}>
                <div className={styles.loginContainer}>
                    <div className={styles.loginForm}>
                        <div className='formGroup'>
                            <IonLabel position='stacked' className="inputLabel"> 
                                Username
                            </IonLabel>
                            <IonInput
                                type="text"
                                clearInput 
                                className="formInput" 
                                value={username}
                                onIonChange={(event) => {usernameInputHandler(event)}}
                            />
                        </div>
                        <div className='formGroup'>
                            <IonLabel position='stacked' className="inputLabel">
                                Password
                            </IonLabel>
                            <IonInput
                                type="password"
                                clearInput
                                className="formInput"
                                value={password}
                                onIonChange={(event) => {passwordInputHandler(event)}}
                            />
                        </div>
                        <IonButton
                            expand='block'
                            className={styles.loginButton}
                            onClick={loginUser}
                        >
                            Login
                        </IonButton>
                        <p className={styles.signupText}>
                            Don't have an account? <a href="/signup">Signup</a>
                        </p>
                    </div>
                </div>
                {showToast && <Toast text={text} type={type}/>}
                <IonLoading isOpen={isLoading} spinner={SPINNER_STYLE} message='Authenticating User'/>
            </IonContent>
        </IonPage>
    )
}

export default Login;