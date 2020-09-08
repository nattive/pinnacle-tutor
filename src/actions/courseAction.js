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
    ERR_GETTING_ALL_COURSES,
    CREATE_MODULE_HEADER,
    MODULE_HEADER,
    GET_COURSE,
    ERR_GETTING_COURSE,
    COURSE,
    ERR_CREATING_MODULE_HEADER,
    APP_LOADER,
    APP_STOPPED_LOADING,
    ADD_QUIZ,
    QUIZ_ADDED,
    ERR_ADDING_QUIZ,
    UPDATE_MODULE_HEADER,
    ERR_UPDATING_MODULE_HEADER,
    MODULE_UPDATED,
    CREATE_DISCOUNT,
    DISCOUNT_CREATED,
    ERROR_CREATING_DISCOUNT,
    GET_DISCOUNT,
    DISCOUNT,
    ERROR_GETTING_DISCOUNT,
} from "./types"
import { baseUrl } from "../constants/baseUrl"
import Axios from "axios"
import store from "../constants/store"
import Swal from 'sweetalert2'

export const uploadCourse = data => dispatch => {
    const token = localStorage.getItem('PO_user_token')
    const {
        title,
        courseType,
        isFree,
        price,
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

        Axios.post(`${baseUrl}/tutor/courses/upload-course/basic`, {
            title,
            courseType,
            isFree,
            price,
            sub_category_id,
            course_difficulty
        }, { headers: { Authorization: `Bearer ${token}` } }).then(res => {
            console.log(res)
            dispatch({
                type: COURSE_UPLOADED,
                payload: res.data
            })

        }).catch(err => {
            console.log(err.response.data.message)
            Swal.fire({
                title: 'Error!',
                text: err.response ? err.response.data && err.response.data.message : JSON.stringify(err),
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

export const createDiscount = data => dispatch => {
    const token = localStorage.getItem('PO_user_token')
    if (token) {
        const {
            name,
            banner,
            type,
            discount,
            due,
            code,
            course_id,
        } = data

        dispatch({
            type: CREATE_DISCOUNT
        })

        Axios.post(`${baseUrl}/tutor/discount`, {
            name,
            banner,
            type,
            discount,
            due,
            code,
            course_id,
        }, { headers: { Authorization: `Bearer ${token}` } }).then(res => {
            console.log(res)
            dispatch({
                type: DISCOUNT_CREATED,
                payload: res.data
            })
            Swal.fire({
                title: 'Discount Created!',
                text: JSON.stringify(res.data),
                icon: 'success',
                confirmButtonText: 'Okay'
            })
        }).catch(err => {
            console.log(err.response.data.message)
            Swal.fire({
                title: 'Error!',
                text: err.response ? err.response.data && err.response.data.message : JSON.stringify(err),
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            dispatch({
                type: ERROR_CREATING_DISCOUNT,
                payload: err.message || err.message || err.message.data || JSON.stringify(err)
            })
        })
    } else {
        dispatch({
            type: ERROR_CREATING_DISCOUNT,
            payload: "You are not signed in"
        })
    }

}

export const myDiscounts = VOUdata => dispatch => {
    const token = localStorage.getItem('PO_user_token')

    dispatch({
        type: GET_DISCOUNT
    })

    Axios.get(`${baseUrl}/tutor/discount`, { headers: { Authorization: `Bearer ${token}` } }).then(res => {
        console.log(res)
        dispatch({
            type: DISCOUNT,
            payload: res.data
        })
    }).catch(err => {
        console.log(err.response.data.message)

        dispatch({
            type: ERROR_GETTING_DISCOUNT,
            payload: err.message && err.message.data || err.response.data.message || JSON.stringify(err)
        })
    })
}


export const addQuiz = ({ data }) => dispatch => {
    console.info(data)
    const {
        question,
        course_materials_id,
        optionA,
        optionB,
        optionC,
        answer,
        optionD,
    } = data

    dispatch({
        type: ADD_QUIZ
    })

    Axios.post(`${baseUrl}/tutor/courses/add-question`, {
        question,
        course_materials_id,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
    }).then(res => {
        console.log(res)
        dispatch({
            type: QUIZ_ADDED,
            payload: res.data
        })
        Swal.fire({
            title: 'Quiz Added!',
            text: "Quiz added successfully",
            icon: 'success',
            confirmButtonText: 'OK!'
        })
    }).catch(err => {
        console.log(err.response)
        Swal.fire({
            title: 'Error!',
            text: err.response ? err.response.data && err.response.data.message : JSON.stringify(err),
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        dispatch({
            type: ERR_ADDING_QUIZ,
            payload: err.message || err.message || err.message.data || JSON.stringify(err)
        })
    })
}


export const uploadCourseMaterial = () => dispatch => {

    const {
        title,
        course_module_id,
        text,
        objective,
        prerequisite,
        videoPath,
        images,
    } = store.getState().moduleField
    console.log(store.getState().moduleField);

    dispatch({
        type: APP_LOADER
    })
    if (
        title === '') {
        return dispatch({
            type: COURSE_FIELD_HAS_ERROR,
            payload: true
        })
    } else {
        dispatch({
            type: COURSE_FIELD_HAS_ERROR,
            payload: false
        })
        Axios.post(`${baseUrl}/tutor/course/add-module`, {
            title,
            course_module_id,
            text,
            objective,
            prerequisite,
            videoPath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Kaveri_by_Dubare_Forest.jpg/1200px-Kaveri_by_Dubare_Forest.jpg',
            images: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Kaveri_by_Dubare_Forest.jpg/1200px-Kaveri_by_Dubare_Forest.jpg',
        }).then(res => {
            console.log(res)
            dispatch({
                type: APP_STOPPED_LOADING
            })
            Swal.fire({
                title: 'Upload Successful!',
                text: 'Course Material has been successfully added',
                icon: 'success',
                confirmButtonText: 'OK'
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
        courseType,
        isFree,
        price,
        objective,
        course_difficulty,
        uploadedCourse,
        description,
    } = store.getState().courseField

    dispatch({
        type: UPDATE_COURSE
    })
    const token = localStorage.getItem('PO_user_token')

    Axios.put(`${baseUrl}/tutor/courses/${uploadedCourse.id}`, {
        title,
        videoUrl,
        sub_category_id,
        banner_thumbnail,
        banner,
        courseType,
        isFree,
        price,
        objective,
        course_difficulty,
        description
    }, { headers: { Authorization: `Bearer ${token}` } }, ).then(res => {
        console.log(res)
        Swal.fire({
            title: 'success!',
            text: res.data,
            icon: 'success',
            confirmButtonText: 'Okay!'
        })
        dispatch({
            type: COURSE_UPDATED,
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
            type: ERR_UPDATING_COURSE,
            payload: err.message || err.message || err.message.data || JSON.stringify(err)
        })
    })
}

export const getAllCourses = () => dispatch => {

    dispatch({
        type: GET_ALL_COURSES
    })

    fetch(`${baseUrl}/tutor/courses/my/${1}`)
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

export const getCourse = (slug) => dispatch => {
    const token = localStorage.getItem('PO_user_token')

    dispatch({
        type: GET_COURSE
    })
    Axios
        .get(`${baseUrl}/tutor/courses/${slug}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            console.log(res)
            dispatch({
                type: COURSE,
                payload: res.data
            })

        }).catch(err => {
            console.log(err)
            dispatch({
                type: ERR_GETTING_COURSE,
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

export const createModuleHeader = (data) => dispatch => {

    dispatch({
        type: CREATE_MODULE_HEADER
    })

    Axios.post(`${baseUrl}/courses/nodules/store`, {
        title: data.title,
        course_id: data.course_id,

    }).then(res => {
        console.log(res)
        dispatch({
            type: MODULE_HEADER,
            payload: res.data
        })

    }).catch(err => {
        console.log(err)
        dispatch({
            type: ERR_CREATING_MODULE_HEADER,
            payload: err.message || err.message || err.message.data || JSON.stringify(err)
        })
    })
}

export const updateModuleHeader = (data) => dispatch => {

    dispatch({
        type: UPDATE_MODULE_HEADER
    })

    Axios.post(`${baseUrl}/tutor/courses/modules/update/${data.id}`, {
        title: data.title,
        course_id: data.course_id,

    }).then(res => {
        console.log(res)
        dispatch({
            type: MODULE_UPDATED,
            payload: res.data
        })

    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: ERR_UPDATING_MODULE_HEADER,
            payload: err.response && err.response.data ?
                err.response.data.message : err.response.message ||
                'An unknown server error occured'
        })
    })
}

export const deleteCourse = (id) => dispatch => {

    Swal.fire({
        title: 'Delete course?',
        text: "You are about to permanenly delete this course, you won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {

            dispatch({
                type: APP_LOADER
            })
            Axios.delete(`${baseUrl}/tutor/courses/delete/${id}`).then(res => {
                console.log(res)
                dispatch({
                    type: APP_STOPPED_LOADING
                })
                Swal.fire(
                    'Deleted!',
                    'The course has been deleted.',
                    'success'
                )
            }).catch(err => {
                console.log(err)
                dispatch({
                    type: APP_STOPPED_LOADING
                })
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
    })

}