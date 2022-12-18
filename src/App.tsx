import { Redirect, Route, useHistory, withRouter} from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Global Styles */
import  './global.css';

/* Pages */
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import { useEffect, useReducer, useState } from 'react';
import { GlobalContext } from './store/GlobalContext';
import { GlobalReducer, initialState } from './store/GlobalReducer';
import { checkInLocalIfLoggedIn } from './services/AuthService';


setupIonicReact();

const App: React.FC = () => {
  const history = useHistory()
  const [state, dispatch] = useReducer(GlobalReducer, initialState)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {isLoggedIn} = state;

  const gotoHome = () => {
    history.replace('/login')
  }

  useEffect(() => {
    setIsLoading(true);
    checkInLocalIfLoggedIn().then((res) => {
      console.log('hello');
      setIsLoading(false);
      if (res) {
        dispatch({type: 'LOGIN', payload: res.userDetails})
      }
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
    });
  },[]);

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
       <IonApp>
        {!isLoading ? (
           <IonReactRouter>
           <IonRouterOutlet>
               <Route exact path="/login" component={Login}/>
               <Route exact path="/signup" component={Signup} />
               <Route path="/home" component={Home} />
               <Route exact path="/">
                 {isLoggedIn ? <Redirect to="/home" /> :<Redirect to="/login" />}
               </Route>
           </IonRouterOutlet>
         </IonReactRouter>
        ) : <p>loading</p>}
       
      </IonApp>
    </GlobalContext.Provider>
  )
  
};

export default App;
