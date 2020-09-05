import axios from 'axios'
import { baseUrl } from "../constants/baseUrl"
import {
    IS_LOGGING,
    ERROR_LOGGING_IN,
    LOGGED_IN,
    IS_REGISTERING,
    ERROR_REGISTERING_IN,
    REGISTERED,
    HAS_ERRORS,
    USER,
} from './types'
// import jwt from 'jsonwebtoken'

export const login = (email, password) => dispatch => {

    dispatch({ type: IS_LOGGING })
    axios.post(`${baseUrl}/login`, {
        email: email,
        password: password
    }).then(res => {
        dispatch({ type: LOGGED_IN })
        console.log(res)
        localStorage.removeItem('uwin_manager_token')
        localStorage.setItem('uwin_manager_token', res.data.success.token)
    }).catch(err => {
        dispatch({ type: ERROR_LOGGING_IN, payload: ((err.response && err.response.data.error) || err.response.data.message) || JSON.stringify(err) })
        console.log(err.response)
    })
}


// export const logout = () => dispatch => {
//     dispatch({
//         type: APP_IS_LOADING
//     })
//     const token = localStorage.getItem('uwin_manager_token')
//     axios.get(`${baseUrl}auth/logout`, {
//         headers: { Authorization: `Bearer ${token}` }
//     }).then(res => {
//         console.log(res)
//         localStorage.removeItem('uwin_manager_token')
//         dispatch({
//             type: LOGGED_OUT
//         })
//         dispatch({
//             type: REDIRECT,
//             payload: '/login'
//         })
//         dispatch({
//             type: LOGIN_STATUS,
//             payload: false
//         })
//         dispatch({
//             type: TOKEN,
//             payload: null
//         })
//         dispatch({
//                 type: STORE_USER,
//                 payload: {}
//             })
//             // dispatch({
//             //     type: LOGIN_STATUS,
//             //     payload: false
//             // })
//         dispatch(ChecklistExist(res.data.user.id))

//     }).catch(err => {
//         console.log(err.response)
//         if (err.response !== undefined && err.response.status === 500) {
//             dispatch({
//                 type: AUTH_STOPPED_LOADING
//             })
//             dispatch({
//                 type: ERR_LOGIN,
//                 payload: 'Server Error'
//             })
//         } else {

//             dispatch({
//                 type: AUTH_STOPPED_LOADING
//             })
//             dispatch({
//                 type: ERR_LOGIN,
//                 payload: err.response !== undefined && err.response.data ? err.response.data.error : JSON.stringify(err.response)
//             })
//         }

//     })
// }



export const register = data => dispatch => {

    dispatch({ type: IS_REGISTERING })

    axios.post(`${baseUrl}/register`, {
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
        name: data.name,
        account_type: 'tutor',
    }).then(res => {
        console.log(res)
        localStorage.removeItem('PO_user_token')
        localStorage.setItem('PO_user_token', res.data.access_token)

        dispatch({
            type: REGISTERED,
            payload: res.data.access_token
        })

        dispatch({
            type: USER,
            payload: res.data.user
        })

    }).catch(err => {
        console.log(err.response)
        err.response &&
            err.response.data && err.response.data.errors &&
            dispatch({
                type: HAS_ERRORS,
                payload: err.response.data.errors
            })

        dispatch({
            type: ERROR_REGISTERING_IN,
            payload: err.response.data.message || 'An Error occurred while registering'
        })
    })
}