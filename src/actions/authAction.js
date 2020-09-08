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
    IS_CREATING_TUTOR,
    ERROR_CREATING_TUTOR,
    TUTOR,
    APP_LOADER,
    APP_STOPPED_LOADING,
} from './types'
import Swal from 'sweetalert2'
// import jwt from 'jsonwebtoken'

export const login = (email, password) => dispatch => {

    dispatch({ type: IS_LOGGING })
    axios.post(`${baseUrl}/login`, {
        email: email,
        password: password
    }).then(res => {
        dispatch({ type: LOGGED_IN })
        dispatch({
            type: TUTOR,
            payload: res.data.tutor
        })
        dispatch({
            type: USER,
            payload: res.data.user
        })
        console.log(res)
        localStorage.removeItem('PO_user_token')
        localStorage.setItem('PO_user_token', res.data.access_token)
    }).catch(err => {
        console.log(err)
        dispatch({ type: ERROR_LOGGING_IN, payload: (err.response && err.response.data && err.response.data.message) || JSON.stringify(err) })
        console.log(err.response)
    })
}


export const logout = () => dispatch => {
    dispatch({
        type: APP_LOADER,
        payload: 'logging out'
    })
    const token = localStorage.getItem('PO_user_token')
    axios.get(`${baseUrl}/logout`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
        console.log(res)
        localStorage.removeItem('PO_user_token')

        dispatch({
            type: USER,
            payload: {}
        })
        dispatch({
            type: TUTOR,
            payload: {}
        })

        dispatch({
            type: APP_STOPPED_LOADING
        })
        window.location.href = '/'
    }).catch(err => {
        console.log(err.response)

        dispatch({
            type: APP_STOPPED_LOADING
        })

        dispatch({
            type: ERROR_REGISTERING_IN,
            payload: err.response && err.response.data ? err.response.data.message : JSON.stringify(err.response)
        })
    })
}



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

export const createTutor = data => dispatch => {
    const token = localStorage.getItem("PO_user_token")
    dispatch({ type: IS_CREATING_TUTOR })
    const {
        isCotF_tutor,
        isPO_tutor,
        rating,
        image,
        about,
        files,
        user_id,
        facebook,
        twitter,
        linkedIn,
        youTube,
    } = data
    axios.post(`${baseUrl}/tutor/register`, {
        isCotF_tutor,
        isPO_tutor,
        rating,
        image,
        about,
        files,
        user_id,
        facebook,
        twitter,
        linkedIn,
        youTube,
    }, { headers: { Authorization: `Bearer ${token}` } }, ).then(res => {
        console.log(res)
        Swal.fire({
            title: 'success!',
            text: "You have successfully created a tutor account",
            icon: 'success',
            confirmButtonText: 'Okay!'
        })
        dispatch({
            type: TUTOR,
            payload: res.data
        })

    }).catch(err => {
        console.log(err.response)
        Swal.fire({
            title: 'An error occurredError!',
            text: (err.response && err.response.data.message) || JSON.stringify(err),
            icon: 'success',
            confirmButtonText: 'Okay!'
        })
        err.response &&
            err.response.data && err.response.data.errors &&
            dispatch({
                type: HAS_ERRORS,
                payload: err.response.data.errors
            })

        dispatch({
            type: ERROR_CREATING_TUTOR,
            payload: err.response && err.response.data.message || 'An Error occurred while registering'
        })
    })
}
export const me = () => dispatch => {
    const token = localStorage.getItem("PO_user_token")
    dispatch({ type: APP_LOADER, payload: 'authenticating' })
    dispatch({ type: APP_STOPPED_LOADING })


    axios.get(`${baseUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    }, ).then(res => {
        dispatch({ type: APP_STOPPED_LOADING })
        console.log(res)
        dispatch({
            type: TUTOR,
            payload: res.data.tutor
        })
        dispatch({
            type: USER,
            payload: res.data.user
        })

    }).catch(err => {
        console.log(err.response)
        dispatch({ type: APP_STOPPED_LOADING })
        err.response &&
            err.response.data && err.response.data.errors &&
            dispatch({
                type: HAS_ERRORS,
                payload: err.response.data.errors
            })
        dispatch({
            type: ERROR_LOGGING_IN,
            payload: err.response && err.response.data.message || 'An Error occurred while registering'
        })
    })
}