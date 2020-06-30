import authedUser from './authedUser'
import tweets from './tweets'
import users from './users'
import {combineReducers} from 'redux'

export default combineReducers({
    authedUser,
    tweets,
    users
})

