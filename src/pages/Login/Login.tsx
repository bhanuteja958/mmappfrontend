import { IonButton, IonContent, IonInput, IonLabel, IonPage} from '@ionic/react';
import { FC, useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { useToast } from '../../common/CustomHooks';
import Toast from '../../components/Toast/Toast';
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
                if(res?.is_error){
                    displayToast(res.message, 'error')
                    setIsLoading(false);
                } else {
                    dispatch({type: 'LOGIN', payload: res.data.user_details})
                    setAuthDetailsLocally(res.data.user_details).then(() => {
                        displayToast(res.message, 'success');
                        setTimeout(() => {
                            setIsLoading(false);
                            history.replace('/home');
                        }, 2000);
                    }).catch((error) => {
                        console.log('hello');
                    }) 
                }
            }).catch((error) => {
                let displayMessage = error.response ? error.response.message : error.message;
                displayToast(displayMessage, 'error');
                setIsLoading(false);
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
            </IonContent>
        </IonPage>
    )
}

export default Login;