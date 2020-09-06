// 
// 

import { GET_ACTIVITIES, ERR_GETTING_ACTIVITIES, RECENT_ACTIVITIES } from "./types";
import { baseUrl } from "../constants/baseUrl";
import Axios from "axios";


export const getActivities = () => dispatch => {
    const token = localStorage.getItem('PO_user_token')


    dispatch({
        type: GET_ACTIVITIES
    })
    Axios.get(`${baseUrl}/tutor/activities`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
        console.log(res)
        dispatch({
            type: RECENT_ACTIVITIES,
            payload: res.data
        })

    }).catch(err => {
        console.log(err.response && err.response.data.message)
        dispatch({
            type: ERR_GETTING_ACTIVITIES,
            payload: err.message || err.message || err.message.data || JSON.stringify(err)
        })
    })
}