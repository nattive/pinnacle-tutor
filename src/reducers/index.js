import { combineReducers } from 'redux'
import courseFieldReducer from './courseFieldReducer'
import courseReducer from './courseReducer'
import indexReducer from './indexReducer'
import loadingReducer from './loadingReducer'
import moduleFieldReducer from './moduleFieldReducer'
import authReducer from './authReducer'


export default combineReducers({
    courseField: courseFieldReducer,
    moduleField: moduleFieldReducer,
    course: courseReducer,
    loading: loadingReducer,
    auth: authReducer,
    index: indexReducer
})