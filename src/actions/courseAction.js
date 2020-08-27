import { UPLOAD_COURSE, COURSE_UPLOADED, ERR_UPLOADING_COURSE, GET_ALL_MAIN_CATEGORY, MAIN_CATEGORIES, ERR_MAIN_CATEGORIES } from "./types"
import { baseUrl } from "../constants/baseUrl"
import Axios from "axios"
import store from "../constants/store"

export const uploadCourse = data => dispatch => {

    const {
        title,
        isPO,
        isCareer,
        isFree,
        price,
        tutor_id,
        course_difficulty
    } = store.getState().courseField

    dispatch({
        type: UPLOAD_COURSE
    })

    Axios.post(`${baseUrl}/upload-course/basic`, {
        title,
        isPO,
        isCareer,
        isFree,
        price,
        tutor_id,
        course_difficulty
    }).then(res => {
        console.log(res)
        dispatch({
            type: COURSE_UPLOADED,
            payload: res.data
        })

    }).catch(err => {
        console.log(err)
        dispatch({
            type: ERR_UPLOADING_COURSE,
            payload: err.message || err.message || err.message.data || JSON.stringify(err)
        })
    })
}
export const getAllMainCategories = () => dispatch => {

    dispatch({
        type: GET_ALL_MAIN_CATEGORY
    })

    Axios.get(`${baseUrl}/courses/main_controller/all`, ).then(res => {
        console.log(res)
        dispatch({
            type: MAIN_CATEGORIES,
            payload: res.data
        })

    }).catch(err => {
        console.log(err)
        dispatch({
            type: ERR_MAIN_CATEGORIES,
            payload: err.message || err.message || err.message.data || JSON.stringify(err)
        })
    })
}