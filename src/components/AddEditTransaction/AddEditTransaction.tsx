import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackCircle } from 'ionicons/icons';
import React,{FC, useState} from 'react';
import styles from './AddEditTransaction.module.css';

interface AddEditTransactionProps {
    closeModal: () => void
}

const AddEditTransaction:FC<AddEditTransactionProps> = (props) => {
    const {closeModal} = props;
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonIcon icon={arrowBackCircle} slot="start" className='headerArrowBack' onClick={closeModal}/>
                    <IonTitle slot="start">Add Transaction</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className={styles.transactionForm}>
                    <div className='formGroup'>
                        <IonLabel className={styles.transactionFormLabel}>Amount</IonLabel>
                        <IonInput type="number" className={styles.transactionFormInput} />
                    </div>
                    <div className='formGroup'>
                        <IonLabel className={styles.transactionFormLabel}>Category</IonLabel>
                        <IonSelect className={styles.transactionFormSelect}>
                            <IonSelectOption>Option 1</IonSelectOption>
                            <IonSelectOption>Option 2</IonSelectOption>
                            <IonSelectOption>Option 3</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div className='formGroup'>
                        <IonLabel className={styles.transactionFormLabel}>Mode</IonLabel>
                        <IonSelect className={styles.transactionFormSelect}>
                            <IonSelectOption>Option 1</IonSelectOption>
                            <IonSelectOption>Option 2</IonSelectOption>
                            <IonSelectOption>Option 3</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div className='formGroup'>
                        <IonLabel className={styles.transactionFormLabel}>Type</IonLabel>
                        <IonSelect className={styles.transactionFormSelect}>
                            <IonSelectOption>Option 1</IonSelectOption>
                            <IonSelectOption>Option 2</IonSelectOption>
                            <IonSelectOption>Option 3</IonSelectOption>
                        </IonSelect>
                    </div>
                    <div className='formGroup'>
                        <IonLabel className={styles.transactionFormLabel}>Description</IonLabel>
                        <IonTextarea rows={8} className={styles.transactionFormTextarea}></IonTextarea>
                    </div>
                </div>
                <IonButton
                    expand='full'
                    slot="fixed"
                    className='modalMainBtn'
                >
                    Add Transaction
                </IonButton>
            </IonContent>
        </>
    )
}

export default AddEditTransaction;