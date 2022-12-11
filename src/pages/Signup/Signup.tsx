import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react';
import React, { FC, useState } from 'react';
import { useToast } from '../../Common/CustomHooks';
import Toast from '../../components/Toast/Toast';
import styles from './Signup.module.css';
const Signup:FC<{}> = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {text, type, showToast, setToastTextAndType,displayToast} = useToast(2500);

    const usernameInputHandler = (event:any) => {
        const {value} = event.target;
        setUsername(value);
    }

    const emailInputHandler = (event:any) => {
        const {value} = event.target;
        setEmail(value);
    }

    const passwordInputHandler = (event:any) => {
        const {value} = event.target;
        setPassword(value);
    }

    const validateSignupForm = () => {
        if( username === ''){
            setToastTextAndType('Please enter username', 'warning');
            displayToast();
            return false;
        }

        if(email === ''){
            setToastTextAndType('Please enter email', 'warning');
            displayToast();
            return false;
        }

        if(password === ''){
            setToastTextAndType('Please enter password', 'warning');
            displayToast();
            return false
        }

        return true;
    }

    const signupUser = () => {
        const isValidUserDetails:boolean = validateSignupForm();
        if(isValidUserDetails){
            //signup user
        }
    }


    return (
        <IonPage>
            <IonContent>
                <div className={styles.signupContainer}>
                    <div className={styles.signupForm}>
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
                                Email
                            </IonLabel>
                            <IonInput
                                type="text"
                                clearInput
                                className="formInput"
                                value={email}
                                onIonChange={(event) => {emailInputHandler(event)}}
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
                            expand="full"
                            className={styles.signupBtn}
                            onClick={signupUser}
                        >
                            Signup
                        </IonButton>
                        <p className={styles.loginText}>Have an account already? <a href="/login">Login</a></p>
                    </div>
                </div>
                {showToast && <Toast text={text} type={type} />}
            </IonContent>
        </IonPage>
    )
}

export default Signup