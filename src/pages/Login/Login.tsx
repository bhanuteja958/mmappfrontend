import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonText } from '@ionic/react';
import React, {FC} from 'react'
import styles from './Login.module.css';

const Login:FC<any>  = () => {
    return (
        <IonPage>
            <IonContent className={styles.loginContainer}>
                <div className={styles.loginContainer}>
                    <IonImg src='assets/icon/coin.svg' className={styles.appImage}/>
                    <IonList>
                        <IonItem className={styles.loginFormItem}>
                            <IonLabel position='stacked' className="inputLabel"> 
                                Username
                            </IonLabel>
                            <IonInput type="text" clearInput className="input"/>
                        </IonItem>
                        <IonItem>
                            <IonLabel position='stacked' className="inputLabel">
                                Password
                            </IonLabel>
                            <IonInput type="password" clearInput className="input"/>
                        </IonItem>
                        <IonButton expand='block' shape='round' className={styles.loginButton}>Login</IonButton>
                    </IonList>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;