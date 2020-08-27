import { combineReducers } from 'redux'
import courseFieldReducer from './courseFieldReducer'
import courseReducer from './courseReducer'


export default combineReducers({
    courseField: courseFieldReducer,
    course: courseReducer,
})