import { IonFab, IonFabButton, IonIcon, IonModal, IonText } from '@ionic/react';
import { add, fastFood } from 'ionicons/icons';
import React,{FC, useState} from 'react';
import AddEditTransaction from '../AddEditTransaction/AddEditTransaction';
import styles from './Transactions.module.css';

const Transactions:FC<{}> = () => {
    const [showAddEditTransactionModal, setShowEditTransactionModal] = useState<boolean>(false);
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
            <IonModal isOpen={showAddEditTransactionModal}>
                <AddEditTransaction closeModal={() => {setShowEditTransactionModal(false)}}/>
            </IonModal>
            <IonFab slot='fixed' horizontal='end' vertical='bottom'>
                <IonFabButton  onClick={() => {
                        setShowEditTransactionModal(true);
                    }}>
                    <IonIcon icon={add}/>
                </IonFabButton>
            </IonFab>
            
        </div>
    )
}

export default Transactions;