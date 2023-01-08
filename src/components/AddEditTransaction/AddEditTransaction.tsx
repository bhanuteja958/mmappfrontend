import {
    InputCustomEvent,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonLoading,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
    SelectCustomEvent,
    TextareaCustomEvent,
} from "@ionic/react";
import { arrowBackCircle, trashBin } from "ionicons/icons";
import { FC, useContext, useState } from "react";
import { useToast } from "../../common/CustomHooks";
import { MAX_TRANSACTION_AMOUNT, MIN_TRANSACTION_AMOUNT } from "../../config/constants";
import { createTransaction, deleteTransaction } from "../../services/APIService";
import { GlobalContext } from "../../store/GlobalContext";
import Toast from "../Toast/Toast";
import styles from "./AddEditTransaction.module.css";

interface AddEditTransactionProps {
    closeModal: () => void;
    staticData: any;
    refreshTransactions: () => void;
    forView: boolean;
    selectedTransaction: any
}

const AddEditTransaction: FC<AddEditTransactionProps> = (props) => {
    const { closeModal, staticData, refreshTransactions, forView, selectedTransaction} = props;
    const { categories, paymentModes, transactionTypes } = staticData;
    const { state, dispatch } = useContext(GlobalContext);
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>("");
    const [mode, setMode] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { text, type: toastType, displayToast, showToast } = useToast(2500);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [disableAddTransactionBtn, setDisableAddTransactionBtn] =
        useState<boolean>(false);


    const amountChangeHandler = (event: InputCustomEvent) => {
        const { value } = event.target;
        setAmount(value as string);
    };

    const categoryChangeHandler = (event: SelectCustomEvent) => {
        const { value } = event.target;
        setCategory(value as string);
    };

    const modeChangeHandler = (event: SelectCustomEvent) => {
        const { value } = event.target;
        setMode(value as string);
    };

    const typeChangeHandler = (event: SelectCustomEvent) => {
        const { value } = event.target;
        setType(value as string);
    };

    const descriptionChangeHandler = (event: TextareaCustomEvent) => {
        const { value } = event.target;
        setDescription(value as string);    
    };

    const addTransaction = () => {
        setIsLoading(true);
        setDisableAddTransactionBtn(true);
        createTransaction(
            parseInt(amount),
            category,
            mode,
            type,
            description,
            state.userDetails.auth_token
        )
            .then((res) => {
                setIsLoading(false);
                if (res.is_error) {
                    displayToast(res.message, "error");
                    setDisableAddTransactionBtn(false);
                } else {
                    displayToast(res.message, "success");
                    setTimeout(() => {
                        closeModal();
                        refreshTransactions();
                    }, 2000);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setDisableAddTransactionBtn(false);
                displayToast(
                    error.response ? error.response.message : error.message,
                    "error"
                );
            });
    };
    const validateAddEditTransactionForm = () => {
        if (parseFloat(amount) < MIN_TRANSACTION_AMOUNT) {
            displayToast("Please add some amount", "error");
            return false;
        }

        if(parseFloat(amount) > MAX_TRANSACTION_AMOUNT) {
            displayToast("Amount limit capped at 10Cr", 'error');
            return false;
        }

        if (category === "") {
            displayToast("Please select a category", "error");
            return false;
        }
        if (mode === "") {
            displayToast("Please select a mode", "error");
            return false;
        }
        if (type === "") {
            displayToast("Please select a type", "error");
            return false;
        }
        if (description === "") {
            displayToast("Please enter a description", "error");
            return false;
        }
        return true;
    };

    const submitAddEditTransactionForm = () => {
        let isValid = validateAddEditTransactionForm();
        if (isValid) {
            addTransaction();
        }
    };

    const removeTransaction = () => {
        setIsLoading(true);
        deleteTransaction(selectedTransaction.id, state.userDetails.auth_token).then((res) => {
            setIsLoading(false);
            if(res.is_error){
                displayToast(res.message,'error')
            } else {
                closeModal();
                refreshTransactions();
            }
        }).catch((error) => {
            setIsLoading(false);
            displayToast(error.response ? error.response.message : error.message, 'error');
        })
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonIcon
                        icon={arrowBackCircle}
                        slot="start"
                        className="headerArrowBack"
                        onClick={closeModal}
                    />
                    <IonTitle slot="start">Add Transaction</IonTitle>
                    {forView && (
                        <IonIcon
                            icon={trashBin}
                            slot="end"
                            className={styles.headerDeleteIcon}
                            onClick={removeTransaction}
                        />
                    )}
                    
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className={forView ? styles.transactionDetails : styles.transactionForm}>
                    <div className="formGroup">
                        <IonLabel className={styles.transactionFormLabel}>
                            Amount
                        </IonLabel>
                        {!forView ? (
                            <IonInput
                                type="number"
                                className={styles.transactionFormInput}
                                value={amount}
                                onIonChange={(event) => {
                                    amountChangeHandler(event);
                                }}
                            />
                        ) : (<p className={`${styles.transactionDetail} capitalize`}>Rs. {selectedTransaction.amount}</p>)}
                       
                    </div>
                    <div className="formGroup">
                        <IonLabel className={styles.transactionFormLabel}>
                            Category
                        </IonLabel>
                        {!forView ? (
                            <IonSelect
                                className={styles.transactionFormSelect}
                                interface="action-sheet"
                                value={category}
                                onIonChange={(event) => {
                                    categoryChangeHandler(event);
                                }}
                            >
                                {categories.map((category: any) => (
                                    <IonSelectOption
                                        value={category.id}
                                        key={category.category_name}
                                    >
                                        {category.category_name}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        ) : <p className={`${styles.transactionDetail} capitalize`}>{selectedTransaction.category}</p>}
                    </div>
                    <div className="formGroup">
                        <IonLabel className={styles.transactionFormLabel}>
                            Mode
                        </IonLabel>
                        {!forView ? (
                            <IonSelect
                                className={styles.transactionFormSelect}
                                interface="action-sheet"
                                value={mode}
                                onIonChange={(event) => {
                                    modeChangeHandler(event);
                                }}
                            >
                                {paymentModes.map((paymentMode: any) => (
                                    <IonSelectOption
                                        value={paymentMode.id}
                                        key={paymentMode.name}
                                    >
                                        {paymentMode.mode_name}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        ) : <p className={`${styles.transactionDetail} uppercase`}>{selectedTransaction.payment_mode}</p>}
                        
                    </div>
                    <div className="formGroup">
                        <IonLabel className={styles.transactionFormLabel}>
                            Type
                        </IonLabel>
                        {!forView ? (
                            <IonSelect
                                className={styles.transactionFormSelect}
                                interface="action-sheet"
                                value={type}
                                onIonChange={(event) => {
                                    typeChangeHandler(event);
                                }}
                            >
                                {transactionTypes.map((transactionType: any) => (
                                    <IonSelectOption
                                        value={transactionType.id}
                                        key={transactionType.name}
                                    >
                                        {transactionType.type_name}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        ) : <p className={`${styles.transactionDetail} capitalize`}>{selectedTransaction.transaction_type}</p>}
                        
                    </div>
                    <div className={ forView ? `${styles.transactionDesc} formGroup` : 'formGroup'}>
                        <IonLabel className={styles.transactionFormLabel}>
                            { forView ? 'Description' :`Description (${description.length}/50)`}
                        </IonLabel>
                        {!forView ? (
                            <IonTextarea
                                rows={8}
                                className={styles.transactionFormTextarea}
                                value={description}
                                maxlength={50}
                                onIonChange={(event) => {
                                    descriptionChangeHandler(event);
                                }}
                            ></IonTextarea>
                        ) : <p className={styles.transactionDetail}>{selectedTransaction.description}</p>}
                    </div>
                </div>
                {!forView && (
                    <IonButton
                        expand="full"
                        slot="fixed"
                        className="modalMainBtn"
                        onClick={submitAddEditTransactionForm}
                        disabled={disableAddTransactionBtn}
                    >
                        Add Transaction
                    </IonButton>
                )}
                
                {showToast && <Toast type={toastType} text={text} />}
                <IonLoading
                    isOpen={isLoading}
                    spinner="circles"
                    message={forView ? "Deleting Transaction" : "Adding Transaction"}
                />
            </IonContent>
        </>
    );
};

export default AddEditTransaction;
