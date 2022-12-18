import {Preferences} from '@capacitor/preferences';

export const checkInLocalIfLoggedIn = async () => {
    return Preferences.get({
        key: 'accessDetails'
    }).then((res) => {
        if(res.value){
            return JSON.parse(res.value)
        } else {
            return false;
        }
    }).catch((error) => {
        return false;
    })
}

export const setAuthDetailsLocally = async (userDetails:any) => {
    await Preferences.set({
        key: 'accessDetails',
        value: JSON.stringify({
            userDetails,
            loggedInDate: new Date().toLocaleString()
        })
    })
}
export const deleteAuthDetailsLocally = async () => {
    await Preferences.remove({
        key: 'accessDetails'
    })
}