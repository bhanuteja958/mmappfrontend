import { IonIcon } from '@ionic/react';
import { fastFood } from 'ionicons/icons';
import React,{FC} from 'react';
import styles from './Transactions.module.css';

const Transactions:FC<{}> = () => {
    return (
        <div className={styles.transactionsContainer}>
            <div className={styles.transactionsOnADate}>
                <div className={styles.date}>12 Jul 2022</div>
                <div className={styles.transactions}>
                    <div className={styles.transaction}>
                        <div className={styles.transactionDataLeft}>
                            <IonIcon icon={fastFood} className={styles.transactionCategoryIcon}/>
                            <div className={styles.transactionDetails}>
                                <h6 className={styles.transactionDesc}>Restaurant</h6>
                                <p className={styles.transactionType}>Everyday</p>
                            </div>
                        </div>
                        <div className={styles.transactionDataRight}>
                            <p className={`${styles.transactionAmount} ${styles.creditAmount}`}>Rs.1000</p>
                        </div>
                    </div>
                    <div className={styles.transaction}>
                        <div className={styles.transactionDataLeft}>
                            <IonIcon icon={fastFood} className={styles.transactionCategoryIcon}/>
                            <div className={styles.transactionDetails}>
                                <h6 className={styles.transactionDesc}>Restaurant</h6>
                                <p className={styles.transactionType}>Everyday</p>
                            </div>
                        </div>
                        <div className={styles.transactionDataRight}>
                            <p className={`${styles.transactionAmount} ${styles.creditAmount}`}>Rs.1000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transactions;