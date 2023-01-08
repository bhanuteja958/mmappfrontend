import { IonIcon, IonLabel, IonLoading } from '@ionic/react';
import { fastFood, informationCircle, informationCircleOutline } from 'ionicons/icons';
import React,{FC, useContext, useEffect, useState} from 'react';
import styles from './Dashboard.module.css';
import '../../global.css';
import { MONEY_STATS, PAYMENT_AGGREGATIONS } from '../../config/constants';
import { GlobalContext } from '../../store/GlobalContext';
import { getTransactionAggregations } from '../../services/APIService';
import NoTransactions from '../NoTransactions/NoTransactions';
import { formatAmountForUI } from '../../common/Helper';

interface DashboardProps {
    month:number
    year:number
    displayToast: (text: string, type:string) => void
};

const Dashboard:FC<DashboardProps> = (props) => {
    const {month, year, displayToast} = props;
    const {state, dispatch} = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [transactionAggrs, setTrasactionAggrs] = useState<any>({});

    const fetchTransactionAggregationsForMonth = () => {
        getTransactionAggregations(state.userDetails.auth_token, month, year).then((res) => {
            setIsLoading(false);
            if(res.is_error){
                displayToast(res.message, 'error');
            } else {
                displayToast(res.message, 'success');
                setTrasactionAggrs(res.data);
            }
        }).catch((error) => {
            setIsLoading(false);
            displayToast(error.response ? error.response.message : error.message, 'error');
        })
    }

    useEffect(() => {
        setIsLoading(true);
        fetchTransactionAggregationsForMonth()
    },[month])

    return (
        <>
            {Object.keys(transactionAggrs).length > 0 ? (
                <div className={styles.dashboardContainer}>
                    <div className={styles.moneyDataContainer}>
                        <h4 className={styles.moneyDataTitle}>Money Stats</h4>
                        <div className={styles.moneyData}>
                            {MONEY_STATS.map((stat) => (
                                <div className={styles.moneyCard} key={stat.backendKey}>
                                    <h5 className={`${styles.moneyValue} ${styles[stat.backendKey]}`}>
                                    &#8377;{formatAmountForUI(transactionAggrs[stat.backendKey] || 0)}
                                    </h5>
                                    <h6 className={styles.moneyType}>{stat.displayName}</h6>
                                    {Math.abs(transactionAggrs[stat.backendKey] || 0) >= 1000 && <div className={styles.exactAmountContainer}>
                                        <IonIcon icon={informationCircleOutline} className={styles.infoIcon}/>
                                        <p className={styles.exactAmount}>&#8377;{transactionAggrs[stat.backendKey] || 0}</p>
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.paymentAggregationsContainer}>
                        <h4 className={styles.paymentAggregationsTitle}>Payment Aggregations</h4>
                        <div className={styles.paymentAggregations}>
                            {PAYMENT_AGGREGATIONS.map((aggregation) => (
                                <div className={styles.moneyCard} key={aggregation.backendKey}>
                                    <h5 className={`${styles.moneyValue} ${styles.aggregationData}`}>&#8377;{formatAmountForUI(transactionAggrs[aggregation.backendKey] || 0)}</h5>
                                    <h6 className={styles.moneyType}>{aggregation.displayName}</h6>
                                    { Math.abs(transactionAggrs[aggregation.backendKey] || 0) >= 1000 &&<div className={styles.exactAmountContainer}>
                                        <IonIcon icon={informationCircleOutline} className={styles.infoIcon}/>
                                        <p className={styles.exactAmount}>&#8377;{transactionAggrs[aggregation.backendKey] || 0}</p>
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className={styles.topCategoriesContainer}>
                        <h4 className={styles.topCategoriesTitle}>Top 5 Categories</h4>
                        <div className={styles.topCategories}>
                            <div className={styles.categoryCard}>
                                <IonIcon icon={fastFood} className={styles.categoryIcon} />
                                <p className={styles.categoryName}>Food</p>
                            </div>
                            <div className={styles.categoryCard}>
                                <IonIcon icon={fastFood} className={styles.categoryIcon}/>
                                <p className={styles.categoryName}>Food</p>
                            </div>
                            <div className={styles.categoryCard}>
                                <IonIcon icon={fastFood} className={styles.categoryIcon}/>
                                <p className={styles.categoryName}>Food</p>
                            </div>
                            <div className={styles.categoryCard}>
                                <IonIcon icon={fastFood} className={styles.categoryIcon}/>
                                <p className={styles.categoryName}>Food</p>
                            </div>
                            <div className={styles.categoryCard}>
                                <IonIcon icon={fastFood} className={styles.categoryIcon}/>
                                <p className={styles.categoryName}>Food</p>
                            </div>
                            </div>
                        </div> */}
                </div>
            ) : <NoTransactions />}
            <IonLoading isOpen={isLoading} message="Fetching Aggregations" spinner="circles" />
        </>
    )
}

export default Dashboard;