import { IonImg } from '@ionic/react';
import {FC} from 'react';
import styles from './NoTransactions.module.css';

const NoTransactions:FC<{}> = () => {
    return (
        <div className={styles.noTransactionsContainer}>
            <IonImg src={'assets/icon/suspicious.svg'} className={styles.suspiciousImage} alt="suspicious emoji" />
            <p className={styles.noTransactionsText}>No Transactions added for the month</p>
        </div>
    )
}

export default NoTransactions