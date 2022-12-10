import { IonIcon, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { fastFood } from 'ionicons/icons';
import React,{FC} from 'react';
import styles from './Dashboard.module.css';
import '../../global.css';
import { MONEY_STATS, PAYMENT_AGGREGATIONS } from '../../config/constants';

const Dashboard:FC<{}> = () => {
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.moneyDataContainer}>
                <h4 className={styles.moneyDataTitle}>Money Stats</h4>
                <div className={styles.moneyData}>
                    {MONEY_STATS.map((stat) => (
                        <div className={styles.moneyCard} key={stat.backendKey}>
                            <h5 className={`${styles.moneyValue} ${styles[stat.backendKey]}`}>Rs. 10,000</h5>
                            <h6 className={styles.moneyType}>{stat.displayName}</h6>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.paymentAggregationsContainer}>
                <h4 className={styles.paymentAggregationsTitle}>Payment Aggregations</h4>
                <div className={styles.paymentAggregations}>
                    {PAYMENT_AGGREGATIONS.map((aggregation) => (
                        <div className={styles.moneyCard} key={aggregation.backendKey}>
                            <h5 className={`${styles.moneyValue} ${styles.aggregationData}`}>Rs. 10,000</h5>
                            <h6 className={styles.moneyType}>{aggregation.displayName}</h6>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.topCategoriesContainer}>
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
            </div>
        </div>
    )
}

export default Dashboard;