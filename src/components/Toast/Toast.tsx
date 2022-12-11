import { IonText } from '@ionic/react';
import React, { FC } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
    text: string
    type: string
}

const Toast:FC<ToastProps> = (props) => {
    const {text, type} = props;

    return (
        <IonText className={`${styles[type]} ${styles.toast}`}>{text}</IonText>
    )
};

export default Toast;   