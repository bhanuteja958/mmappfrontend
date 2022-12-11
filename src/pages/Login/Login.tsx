import { IonButton, IonContent, IonInput, IonLabel, IonPage} from '@ionic/react';
import React, {BaseSyntheticEvent, ChangeEvent, FC, useState} from 'react'
import Toast from '../../components/Toast/Toast';
import styles from './Login.module.css';

const Login:FC<any>  = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const usernameInputHandler = (event:any) => {
        const {value} = event.target;
        setUsername(value);
    }

    const passwordInputHandler = (event:any) => {
        const {value} = event.target;
        setPassword(value);
    }

    const validateLoginForm = () => {
        if( username === ''){
            return false;
        }

        if(password === ''){
            return false;
        }

        return true;
    }

    const loginUser = () => {
        const isValidCredentials:boolean  = validateLoginForm()
        if(isValidCredentials){
            //login
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
                {/* <Toast text="successfully logged in" type="warning"/> */}
            </IonContent>
        </IonPage>
    )
}

export default Login;