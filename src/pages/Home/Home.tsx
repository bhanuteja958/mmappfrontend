import { IonPage, IonHeader, IonToolbar, IonIcon, IonTitle,IonContent, IonLabel, IonFooter, IonSelect, IonSelectOption, IonButton, IonModal} from '@ionic/react';
import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import Dashboard from '../../components/Dashboard/Dashboard';
import Transactions from '../../components/Transactions/Transactions';
import { DATE_FILTER_NEEDED_TABS, HOME_TABS } from '../../config/constants';
import AddEditTransaction from '../../components/AddEditTransaction/AddEditTransaction';
import { GlobalContext } from '../../store/GlobalContext';
import Account from '../../components/Account/Account';

const Home:FC<{}> = () => {
    const {state, dispatch} = useContext(GlobalContext);
    const [selectedTab, setSelectedTab] = useState<string>('dashboard');

    const tabClickHandler = (tabKey: string) => {
        setSelectedTab(tabKey);
    }

    useEffect(() => {
        console.log(state);
    },[])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='light'>
                    <IonTitle slot="start" className={styles.homeTitle}>{selectedTab}</IonTitle>
                </IonToolbar>  
            </IonHeader>
            <IonContent>
                {DATE_FILTER_NEEDED_TABS.includes(selectedTab) && (
                    <div className={styles.dateFilters}>
                        <div className='formGroup'>
                            <IonLabel className={styles.filterInputLabel}>Month</IonLabel>
                            <IonSelect className='selectInput'>
                                <IonSelectOption>January</IonSelectOption>
                                <IonSelectOption>February</IonSelectOption>
                                <IonSelectOption>March</IonSelectOption>
                                <IonSelectOption>April</IonSelectOption>
                            </IonSelect>
                        </div>
                        <div className='formGroup'>
                            <IonLabel className={styles.filterInputLabel}>Year</IonLabel>
                            <IonSelect className='selectInput'>
                                <IonSelectOption>2022</IonSelectOption>
                                <IonSelectOption>2021</IonSelectOption>
                                <IonSelectOption>2019</IonSelectOption>
                                <IonSelectOption>2018</IonSelectOption>
                            </IonSelect>
                        </div>
                    </div>
                )}

                {/* tabs */}
                { selectedTab === 'dashboard' && <Dashboard />}
                { selectedTab === 'transactions' && <Transactions />}
                { selectedTab === 'account' && <Account />}
            </IonContent>
            <IonFooter className={styles.homeFooter}>
                {HOME_TABS.map((tab) => (
                    <div
                        key={tab.key}
                        className={styles.footerButton}
                        style={{
                            color: (selectedTab === tab.key) ? 'var(--ion-color-primary)': 'black'
                        }}
                        onClick={() => {tabClickHandler(tab.key)}}
                    >
                        <IonIcon icon={tab.icon} />
                        <IonLabel>{tab.displayName}</IonLabel>
                    </div>
                ))}
            </IonFooter>
        </IonPage> 
    )
}

export default Home