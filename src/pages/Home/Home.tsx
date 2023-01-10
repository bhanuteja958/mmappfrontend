import { IonPage, IonHeader, IonToolbar, IonIcon, IonTitle,IonContent, IonLabel, IonFooter, IonSelect, IonSelectOption, SelectCustomEvent} from '@ionic/react';
import { FC, useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import Dashboard from '../../components/Dashboard/Dashboard';
import Transactions from '../../components/Transactions/Transactions';
import { DATE_FILTER_NEEDED_TABS, HOME_TABS, MONTH_NUMBER_MAP } from '../../config/constants';
import { GlobalContext } from '../../store/GlobalContext';
import Account from '../../components/Account/Account';
import { useToast } from '../../common/CustomHooks';
import Toast from '../../components/Toast/Toast';

const Home:FC<{}> = () => {
    const {state, dispatch} = useContext(GlobalContext);

    const [selectedTab, setSelectedTab] = useState<string>('dashboard');
    const [month, setMonth] = useState<number>(0);
    const [year, setYear] = useState<number>(0);
    const {text, type, displayToast, showToast} = useToast(2500)

    const tabClickHandler = (tabKey: string) => {
        setSelectedTab(tabKey);
    }

    const monthChangeHandler = (event:SelectCustomEvent) => {
        const {value} = event.target;
        setMonth(value);
    }

    const setCurrentMonthAndYear = () => {
        const dateToday = new Date();
        const todayMonth = dateToday.getMonth() + 1;
        const todayYear = dateToday.getFullYear();

        setMonth(todayMonth);
        setYear(todayYear);
    }

    const yearChangeHandler = (event:SelectCustomEvent) => {
        const {value} = event.target;
        const userJoinedYear = new Date(state.userDetails.date_joined).getFullYear();
        const userJoinedMonth = new Date(state.userDetails.date_joined).getMonth();

        const monthToBeSet = (value === userJoinedYear) ? userJoinedMonth + 1 : 1;
        setYear(value);
        setMonth(monthToBeSet); 
    }

    const getYearsToDisplay = () => {
        const years = []
        const yearJoined = new Date(state.userDetails.date_joined).getFullYear();
        const currentYear = new Date().getFullYear();
        for (let year = yearJoined; year<= currentYear; year++){
            years.push(year);
        }
        return years;
    }

    const getMonthsToDisplay = () => {
        const dateToday = new Date();
        const todayMonth = dateToday.getMonth() + 1;
        const todayYear = dateToday.getFullYear();

        const userJoinedYear = new Date(state.userDetails.date_joined).getFullYear()
        const userJoinedMonth = new Date(state.userDetails.date_joined).getMonth(); 
        
        if(year === todayYear) {
            return MONTH_NUMBER_MAP.filter((month) => {
                return month.value <= todayMonth
            });
        }
        if(year === userJoinedYear) {
            return MONTH_NUMBER_MAP.filter((month) => {
                return month.value >= userJoinedMonth + 1
            });
        }

        return MONTH_NUMBER_MAP;
    }

    useEffect(() => {
        setCurrentMonthAndYear();
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
                            <IonSelect className='selectInput' value={month} onIonChange={(event) => {monthChangeHandler(event)}}>
                                {getMonthsToDisplay().map((month, index) => (
                                    <IonSelectOption value={month.value} key={month.name}>{month.name}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </div>
                        <div className='formGroup'>
                            <IonLabel className={styles.filterInputLabel}>Year</IonLabel>
                            <IonSelect className='selectInput' value={year} onIonChange={(event) => {yearChangeHandler(event)}}>
                                {getYearsToDisplay().map((year:number) => (
                                    <IonSelectOption value={year} key={year}>{year}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </div>
                    </div>
                )}

                {/* tabs */}
                { selectedTab === 'dashboard' && <Dashboard month={month} year={year} displayToast={displayToast}/>}
                { selectedTab === 'transactions' && <Transactions month={month} year={year} displayToast={displayToast}/>}
                { selectedTab === 'account' && <Account />}
                { showToast && (<Toast text={text} type={type}/>)}
            </IonContent>
            <IonFooter className={styles.homeFooter}>
                {HOME_TABS.map((tab) => (
                    <div
                        key={tab.key}
                        className={styles.footerButton}
                        style={{
                            color: (selectedTab === tab.key) ? 'var(--ion-color-primary)': 'var(--ion-color-dark)'
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