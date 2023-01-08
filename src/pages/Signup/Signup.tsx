import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { useToast } from '../../common/CustomHooks';
import Toast from '../../components/Toast/Toast';
import { register } from '../../services/APIService';
import styles from './Signup.module.css';
const Signup:FC<{}> = () => {
    const history = useHistory();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {text, type, showToast, displayToast} = useToast(2500);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            displayToast('Please enter username', 'warning');
            return false;
        }

        if(email === ''){
            displayToast('Please enter email', 'warning');
            return false;
        }

        if(!email.match(/^\S+@\S+\.\S+$/)) {
            displayToast('Please enter a valid email', 'warning');
            return false;
        }

        if(password === ''){
            displayToast('Please enter password', 'warning');
            return false
        }

        return true;
    }

    const signupUser = () => {
        const isValidUserDetails:boolean = validateSignupForm();
        if(isValidUserDetails){
            setIsLoading(true);
            register(username, email, password).then((res) => {
                setIsLoading(false);
                if(res.is_error){
                    displayToast(res.message, 'error');
                } else {
                    displayToast(res.message, 'success');
                    setTimeout(() => {
                        history.replace('/login');
                    }, 2500)
                }
            }).catch((error) => {
                setIsLoading(false);
                displayToast(error.response ? error.response.message : error.message, 'error');
            })
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