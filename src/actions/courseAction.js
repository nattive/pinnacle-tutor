import {
    COURSE_FIELD_HAS_ERROR,
    UPLOAD_COURSE,
    COURSE_UPLOADED,
    ERR_UPLOADING_COURSE,
    GET_ALL_MAIN_CATEGORY,
    MAIN_CATEGORIES,
    ERR_MAIN_CATEGORIES,
    UPDATE_COURSE,
    COURSE_UPDATED,
    ERR_UPDATING_COURSE,
    GET_ALL_COURSES,
    ALL_COURSES,
    ERR_GETTING_ALL_COURSES
} from "./types"
import { baseUrl } from "../constants/baseUrl"
import Axios from "axios"
import store from "../constants/store"
import Swal from 'sweetalert2'

export const uploadCourse = data => dispatch => {

    const {
        title,
        isPO,
        isCareer,
        isFree,
        price,
        tutor_id,
        sub_category_id,
        course_difficulty
    } = store.getState().courseField

    dispatch({
        type: UPLOAD_COURSE
    })
    if (
        title === '' ||
        course_difficulty === '') {
        return dispatch({
            type: COURSE_FIELD_HAS_ERROR,
            payload: true
        })
    } else {
        dispatch({
            type: COURSE_FIELD_HAS_ERROR,
            payload: false
        })
        Axios.post(`${baseUrl}/upload-course/basic`, {
            title,
            isPO,
            isCareer,
            isFree,
            price,
            sub_category_id,
            tutor_id: 1,
            course_difficulty
        }).then(res => {
            console.log(res)
            dispatch({
                type: COURSE_UPLOADED,
                payload: res.data
            })

        }).catch(err => {
            console.log(err)
            Swal.fire({
                title: 'Error!',
                text: err.response ? err.response.message : err.message || err.message.data || JSON.stringify(err),
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            dispatch({
                type: ERR_UPLOADING_COURSE,
                payload: err.message || err.message || err.message.data || JSON.stringify(err)
            })
        })
    }
}

export const updateCourse = () => dispatch => {
    const {
        title,
        videoUrl,
        sub_category_id,
        banner_thumbnail,
        banner,
        isPO,
        isCareer,
        isFree,
        price,
        objective,
        tutor_id,
        course_difficulty,
        uploadedCourse,
        description,
    } = store.getState().courseField

    dispatch({
        type: UPDATE_COURSE
    })

    fetch(`${baseUrl}/courses/update/${uploadedCourse.id}`, {
        method: 'post',
        body: JSON.stringify({
            title,
            videoUrl,
            sub_category_id,
            banner_thumbnail,
            banner,
            isPO,
            isCareer,
            isFree,
            price,
            objective,
            tutor_id,
            course_difficulty,
            description,
        })
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        Swal.fire({
            title: 'success!',
            text: 'OK',
            icon: 'success',
            confirmButtonText: 'Okay!'
        })
        dispatch({
            type: COURSE_UPDATED,
            payload: data
        })
    });


    // Axios.post(`${baseUrl}/courses/update/${uploadedCourse.id}`,
    //     title,
    //     videoUrl,
    //     sub_category_id,
    //     banner_thumbnail,
    //     banner,
    //     isPO,
    //     isCareer,
    //     isFree,
    //     price,
    //     objective,
    //     tutor_id,
    //     course_difficulty,
    //     description,
    // ).then(res => {
    //     console.log(res)
    //     Swal.fire({
    //         title: 'success!',
    //         text: res.data,
    //         icon: 'success',
    //         confirmButtonText: 'Okay!'
    //     })
    //     dispatch({
    //         type: COURSE_UPDATED,
    //         payload: res.data
    //     })

    // }).catch(err => {
    //     console.log(err)
    //     Swal.fire({
    //         title: 'Error!',
    //         text: err.response ? err.response.message : err.message || err.message.data || JSON.stringify(err),
    //         icon: 'error',
    //         confirmButtonText: 'Cool'
    //     })
    //     dispatch({
    //         type: ERR_UPDATING_COURSE,
    //         payload: err.message || err.message || err.message.data || JSON.stringify(err)
    //     })
    // })
}

export const getAllCourses = () => dispatch => {

    dispatch({
        type: GET_ALL_COURSES
    })

    fetch(`${baseUrl}/courses/my/${1}`)
        .then(function(response) {
            return response.json();

        }).then(function(data) {
            console.log(data);
            dispatch({
                type: ALL_COURSES,
                payload: data
            })

        }).catch(err => {
            dispatch({
                type: ERR_GETTING_ALL_COURSES,
                payload: err
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