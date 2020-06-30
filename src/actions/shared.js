import {getInitialData} from '../utils/api'
import {receiveTweets} from './tweets'
import {receiveUsers} from './users'
import {setAuthedUser} from './authedUser'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData(){
    return (dispath) =>{
        return getInitialData().then( ({users,tweets})=>{
            dispath( receiveUsers(users) )
            dispath( receiveTweets(tweets) )    
            dispath(setAuthedUser(AUTHED_ID))        
        })
    }
}

