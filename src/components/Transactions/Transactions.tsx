import {
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon,
    IonLoading,
    IonModal,
    IonText,
} from "@ionic/react";
import { stat } from "fs";
import { add, fastFood } from "ionicons/icons";
import React, { FC, useContext, useEffect, useState } from "react";
import { formatAmountForUI, formatDateForUI } from "../../common/Helper";
import { CATEGORY_ICON_MAPPING, SPINNER_STYLE } from "../../config/constants";
import {
    getTransactionsForAMonth,
    getTransactionsStaticData,
} from "../../services/APIService";
import { GlobalContext } from "../../store/GlobalContext";
import { Transaction } from "../../types/ResponseTypes";
import AddEditTransaction from "../AddEditTransaction/AddEditTransaction";
import NoTransactions from "../NoTransactions/NoTransactions";
import styles from "./Transactions.module.css";

interface TransactionsProps {
    month: number;
    year: number;
    displayToast: (text: string, type: string) => void;
}

const Transactions: FC<TransactionsProps> = (props) => {
    const { month, year, displayToast } = props;
    const [showAddEditTransactionModal, setShowEditTransactionModal] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [trasactions, setTrasactions] = useState<any[]>([]);
    const [transactionStaticData, setTrasactionsStaticData] = useState<any>({});
    const [selectedTransaction, setSelectedTransaction] = useState<any>({});
    const [viewTransaction, setViewTransaction] = useState<boolean>(false);
    const { state, dispatch } = useContext(GlobalContext);

    const fetchTransactions = () => {
        getTransactionsForAMonth(month, year, state.userDetails.auth_token)
            .then((res) => {
                setIsLoading(false);
                if (res.is_error) {
                    displayToast(res.message, "error");
                } else {
                    displayToast(res.message, "success");
                    setTrasactions(res.data);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                displayToast(
                    error.response ? error.response.message : error.message,
                    "error"
                );
            });
    };

    const fetchTransactionsStaticData = () => {
        getTransactionsStaticData(state.userDetails.auth_token)
            .then((res) => {
                if (res.is_error) {
                    displayToast(res.message, "error");
                } else {
                    setTrasactionsStaticData(res.data);
                }
            })
            .catch((error) => {
                displayToast(
                    error.response ? error.response.message : error.message,
                    "error"
                );
            });
    };

    const refreshTransactions = () => {
        setIsLoading(true);
        fetchTransactions();
    };

    const checkIfCanAddTransactions = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        return month === currentMonth + 1 && year === currentYear;
    };

    const sortTransactionsByDate = (transactionsOnDateA:[string, Transaction[]], transactionsOnDateB:[string, Transaction[]]) => {
        const [dateA] = transactionsOnDateA
        const [dateB] = transactionsOnDateB
        return new Date(dateB).getTime()  - new Date(dateA).getTime();
    }

    useEffect(() => {
        setIsLoading(true)
        fetchTransactionsStaticData();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchTransactions();
    }, [month]);

    return (
        <div className={styles.transactionsContainer}>
            {Object.keys(trasactions || {}).length === 0 && <NoTransactions />}
            {Object.entries(trasactions || {}).sort(sortTransactionsByDate).map((transactionsOnADate: [string, Transaction[]]) => {
                const [date, dateTransactions] = transactionsOnADate;
                return (
                    <div className={styles.transactionsOnADate}>
                        <div className={styles.date}>
                            {date ? formatDateForUI(date) : '-'}
                        </div>
                        <div className={styles.transactions}>
                            {dateTransactions.map((transaction: Transaction) => (
                                <div
                                    className={styles.transaction}
                                    onClick={() => {
                                        setViewTransaction(true);
                                        setSelectedTransaction(transaction);
                                        setShowEditTransactionModal(true);
                                    }}
                                    key={transaction.id}
                                >
                                    <div className={styles.transactionDataLeft}>
                                        <IonIcon
                                            icon={CATEGORY_ICON_MAPPING[transaction.category]}
                                            className={
                                                styles.transactionCategoryIcon
                                            }
                                        />
                                        <div
                                            className={
                                                styles.transactionDetails
                                            }
                                        >
                                            <h6
                                                className={
                                                    styles.transactionDesc
                                                }
                                            >
                                                {transaction.description}
                                            </h6>
                                            <p
                                                className={
                                                    styles.transactionType
                                                }
                                            >
                                                {transaction.payment_mode}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={styles.transactionDataRight}
                                    >
                                        <p
                                            className={`${
                                                styles.transactionAmount
                                            } ${
                                                styles[
                                                    transaction.transaction_type
                                                ]
                                            }`}
                                        >
                                            	&#8377;{formatAmountForUI(transaction.amount || 0)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            <IonModal isOpen={showAddEditTransactionModal}>
                <AddEditTransaction
                    closeModal={() => {
                        setShowEditTransactionModal(false);
                    }}
                    staticData={transactionStaticData}
                    refreshTransactions={refreshTransactions}
                    forView={viewTransaction}
                    selectedTransaction={selectedTransaction}
                />
            </IonModal>
            {checkIfCanAddTransactions() && (
                <IonButton
                    onClick={() => {
                        setViewTransaction(false);
                        setShowEditTransactionModal(true);
                    }}
                    disabled={
                        Object.keys(transactionStaticData).length === 0
                    }
                    className={styles.addTransactionBtn}
                >
                    <IonIcon icon={add} className={styles.addIcon}/>
                </IonButton>
            )}
            <IonLoading
                isOpen={isLoading}
                spinner={SPINNER_STYLE}
                message="Fetching Transactions"
            />
        </div>
    );
};

export default Transactions;
