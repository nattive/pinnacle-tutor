import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Select as MaterialSelect, FormHelperText, Input as MaterialInput, CircularProgress } from '@material-ui/core';
import 'react-dropzone-uploader/dist/styles.css'
// import Dropzone from 'react-dropzone-uploader'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDropzone } from 'react-dropzone'

import {
    Icon, Container, Grid,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
    Header,
    Label
} from 'semantic-ui-react'
import { Divider, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { useDispatch, connect, useSelector } from 'react-redux';
import { uploadCourse, getAllMainCategories, updateCourse } from '../../actions/courseAction';
import {
    SET_TITLE,
    SET_SUB_CATEGORY_ID,
    SET_VIDEO_URL,
    LOAD_SUB_CAT,
    SET_BANNER,
    SET_COURSE_TYPE,
    SET_IS_FREE,
    SET_PRICE,
    SET_OBJECTIVE,
    SET_DIFFICULTY,
    SET_DESCRIPTION,
    SET_BANNER_THUMBNAIL,
} from '../../actions/types';
import { baseUrl } from '../../constants/baseUrl';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        overflowX: 'scroll'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['Course Basic Information', 'Upload course Media', 'Course Objective', 'Course Description'];
}

const CreateStep = () => {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const dispatch = useDispatch()
    const title = useSelector(state => state.courseField.title)
    const videoUrl = useSelector(state => state.courseField.videoUrl)
    const sub_category_id = useSelector(state => state.courseField.sub_category_id)
    const banner = useSelector(state => state.courseField.banner)
    const courseType = useSelector(state => state.courseField.isCareer)
    const isFree = useSelector(state => state.courseField.isFree)
    const price = useSelector(state => state.courseField.price)
    const tutor_id = useSelector(state => state.courseField.tutor_id)
    const allMainCategories = useSelector(state => state.course.allMainCategories)
    const loadSubCategory = useSelector(state => state.course.loadSubCategory)
    const course_difficulty = useSelector(state => state.courseField.course_difficulty)
    const hasError = useSelector(state => state.courseField.hasError)
    const [mainCat, setMainCat] = useState()
    const [subCat, setSubCat] = useState()
    const options = [
        { key: 'Easy', text: 'Easy', value: 'Easy' },
        { key: 'Medium', text: 'Medium', value: 'Medium' },
        { key: 'Top Level', text: 'Top Level', value: 'Top Level' },
    ]
    const courseTypeOptions = [
        { key: 'isPO', text: 'Pinnacle Ulearn', value: 'isPO' },
        { key: 'isCareer', text: 'Career of the future', value: 'isCareer' },
    ]
    
    const stepOne = [
        {
            name: courseType,
            control: Select,
            label: 'Set difficulty level for this course',
            placeholder: '',
            courseTypeOptions,
            onChange: (e, { value }) => dispatch({ type: SET_COURSE_TYPE, payload: value })
        },
        {
            name: title,
            error: { content: 'Please enter Title of the course', pointing: 'below' }, control: Input,
            label: 'Course Title',
            placeholder: 'e.g Introduction To Pinnacle Courses',
            onChange: (e) => dispatch({ type: SET_TITLE, payload: e.target.value })
        },

        {
            name: isFree,
            control: Checkbox,
            type: 'checkbox',
            label: 'Make This course Free for students',
            placeholder: '',
            onChange: () => {
                dispatch({ type: SET_IS_FREE, payload: !isFree })
            }
        }

    ]
    const stepOneMini = [

        {
            name: course_difficulty,
            control: Select,
            label: 'Set difficulty level for this course',
            placeholder: '',
            options,
            onChange: (e, { value }) => dispatch({ type: SET_DIFFICULTY, payload: value })
        },
        {
            name: price,
            control: Input,
            type: 'number',
            // error: { content: 'Please enter Title of the course', pointing: 'below' }, control: Input,
            label: 'Course Price',
            small: 'If this is not free, How much does this course cost',
            placeholder: 'e.g Introduction To Pinnacle Courses',
            onChange: (e) => dispatch({ type: SET_PRICE, payload: e.target.value })
        },

    ]

    const classes = useStyles();

    return (
        <Container >
            <Typography variant='h4' color='primary' >Basic information about the course</Typography>
            <Divider style={{ margin: 2 }} />
            <div >
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Main Category</InputLabel>
                    <MaterialSelect
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={mainCat}
                        onChange={e => {
                            setMainCat(e.target.value && e.target.value.name)
                            dispatch({ type: LOAD_SUB_CAT, payload: e.target.value })
                        }}
                        label="Course Category"

                    >
                        <MenuItem disabled value="null">
                            <em>-- select main category --</em>
                        </MenuItem>
                        {
                            allMainCategories.map(main =>
                                <MenuItem value={main} key={main.id}>{main.name}</MenuItem>
                            )
                        }
                    </MaterialSelect>
                    <FormHelperText>Select from the main category list that best describe your course</FormHelperText>
                </FormControl>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label"> Category</InputLabel>
                    <MaterialSelect
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={subCat}
                        onChange={e => {
                            setSubCat(e.target.value && e.target.value.name)
                            dispatch({ type: SET_SUB_CATEGORY_ID, payload: e.target.value })
                        }}
                        label="Course Category"
                    >
                        <MenuItem disabled value="null">
                            <em>-- select main category --</em>
                        </MenuItem>
                        {
                            loadSubCategory.sub_categories && loadSubCategory.sub_categories.map(main =>
                                <MenuItem value={main.id} key={main.id}>{main.name}</MenuItem>
                            )
                        }
                    </MaterialSelect>
                </FormControl>
            </div><br />
            <Form.Group >
                {
                    stepOne.map(input => (
                        <>
                            <Form.Field
                                required
                                fluid
                                size='large'
                                type={input.type}
                                error={hasError && input.name === '' && input.error}
                                width={5}
                                checked={input.type === 'checkbox' && input.name}
                                value={input.name}
                                options={input.options}
                                control={input.control}
                                onChange={input.onChange}
                                style={{ margin: 5 }}
                                label={input.label}
                                placeholder={input.placeholder}
                            /><br />
                        </>
                    ))
                }
            </Form.Group>
            <Form >
                <Form >
                    {
                        stepOneMini.map(input => (
                            <>
                                <Form.Field
                                    required
                                    id='form-input-control-error-email'
                                    size='large'
                                    type={input.type}
                                    // width={5}
                                    checked={input.type === 'checkbox' && input.name}
                                    value={input.name}
                                    options={input.options}
                                    control={input.control}
                                    onChange={input.onChange}
                                    style={{ margin: 5 }}
                                    label={input.label}
                                    placeholder={input.placeholder}
                                />
                            </>
                        ))
                    }
                </Form>
            </Form>
        </Container>
    )
}

const StepTwo = () => {
    const [sub_category_id, setSubCategoryId] = useState()
    const [banner, setBanner] = useState()
    const [video, setVideo] = useState()
    const [description, setDescription] = useState()
    const [tutor_id, setTutor_id] = useState()
    const dispatch = useDispatch()


    // specify upload params and url for your files

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
    }));
    const classes = useStyles();
    const handleUploadVideo = window.cloudinary.createUploadWidget({
        cloudName: 'charisbiz-africa',
        upload_preset: 'qtwirqod',
        multiple: false,
        autoMinimize: true,
        themes: 'minimal',
        clientAllowedFormats: ["mp4", "avi", "mpeg"],
        text: {
            "en": {
                "local": {
                    browse: "Upload Video",
                    main_title: "Upload Video",
                    dd_title_single: "Drag and Drop a video file here",
                    dd_title_multi: "Drag and Drop a video file here",
                    drop_title_single: "Drag and Drop a video file here",
                    drop_title_multiple: "Drag and Drop a video file here"
                },
            }
        }
    }, (error, result) => {
        if (result.event == "success") {
            dispatch({ type: SET_BANNER, payload: result.info.url })
            // dispatch({ type: SET_BANNER_THUMBNAIL, payload: result.info.url })
            console.log(result.info) // result.info contains data from upload
        }
    })

    const handleUpload = window.cloudinary.createUploadWidget({
        cloudName: 'charisbiz-africa',
        upload_preset: 'qtwirqod',
        multiple: false,
        autoMinimize: true,
        themes: 'minimal',
        clientAllowedFormats: ["jpg", "jpeg", "png"],
        text: {
            "en": {
                "local": {
                    browse: "Upload image",
                    main_title: "Upload Image Banner",
                    dd_title_single: "Drag and Drop a Image file here",
                    dd_title_multi: "Drag and Drop a Image file here",
                    drop_title_single: "Drag and Drop a Image file here",
                    drop_title_multiple: "Drag and Drop a Image file here"
                },
            }
        }
    }, (error, result) => {
        if (result.event == "success") {
            dispatch({ type: SET_VIDEO_URL, payload: result.info.url })
            console.log(result.info) // result.info contains data from upload
        }
    })

    return (
        <Grid.Row >
            <Typography variant='h4' color='primary' style={{ margin: 5 }}> Upload media files for your course</Typography>
            <Divider style={{ margin: 10 }} />
            {/* handleUpload */}
            <Button variant="contained" style={{ margin: 10 }} onClick={() => handleUpload.open()} color="primary" >
                Course banner Upload  </Button>
            <Button variant="contained" style={{ margin: 10 }} onClick={() => handleUploadVideo.open()} color="primary" >
                Video Upload  </Button>
        </Grid.Row>
    )
}

const StepThree = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    // const description = useSelector(state => state.courseField.description)
    const dispatch = useDispatch()
    // SET_DESCRIPTION
    return (
        <Container>
            <div >
                <Typography variant='h6'>Course Objective</Typography>
                <Typography variant='subtitle2'>Write in Detail the aim of this course</Typography>
                <Editor
                    editorStyle={{ width: '100%', height: '100px' }}
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={(state) => {
                        setEditorState(state)
                        dispatch({ type: SET_OBJECTIVE, payload: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
                    }}
                />
            </div>
        </Container>
    )
}

const StepFour = () => {
    const dispatch = useDispatch()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    return (
        <Container>
            <div style={{ margin: '10px' }}>
                <Typography variant='h6'>Course Description</Typography>
                <Typography variant='subtitle2'>Describe the course to prospective students,
                let the know how the can get the best off the course </Typography>
                <Editor
                    editorStyle={{ width: '100%', height: '100px' }}
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={(state) => {
                        setEditorState(state)
                        dispatch({ type: SET_DESCRIPTION, payload: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
                    }}
                />
            </div>
        </Container>
    )
}
function getStepContent(step) {

    switch (step) {
        case 0:
            return <CreateStep />

        case 1:
            return <StepTwo />;
        case 2:
            return <StepThree />;
        case 3:
            return <StepFour />;
        case 4:
            return <p>All course upload successfully</p>
        default:
            return 'Unknown step';
    }
}

function CourseView(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const classes = useStyles();
    const { title,
        videoUrl,
        sub_category_id,
        banner } = props
    useEffect(() => {
        props.getAllMainCategories()
    }, [])
    useEffect(() => {
        if (props.uploadedCourse && props.uploadedCourse.id) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    }, [props.uploadedCourse])
    // useEffect(() => {
    //     if (props.updateSuccess) {
    //         setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     }

    // }, [props.updateSuccess])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleUploadCourse = () => {
        props.uploadCourse()
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    {activeStep === 0 ? <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUploadCourse}
                                        className={classes.button}
                                    >
                                        {props.uploadingCourse ? <CircularProgress size={22} /> : 'Next'}
                                    </Button> : <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={activeStep === steps.length - 1 ? props.updateCourse : handleNext}
                                        className={classes.button}
                                    >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>}
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
          </Button>
                </Paper>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    title: state.courseField.title,
    videoUrl: state.courseField.videoUrl,
    sub_category_id: state.courseField.sub_category_id,
    banner: state.courseField.banner,
    isPO: state.courseField.isPO,
    isCareer: state.courseField.isCareer,
    isFree: state.courseField.isFree,
    price: state.courseField.price,
    objective: state.courseField.objective,
    tutor_id: state.courseField.tutor_id,
    course_difficulty: state.courseField.course_difficulty,
    description: state.courseField.description,
    uploadedCourse: state.courseField.uploadedCourse,
    uploadingCourse: state.course.uploadingCourse,
    uploadingError: state.course.uploadingError,
    allMainCategories: state.course.allMainCategories,
    updateSuccess: state.course.updateSuccess,
    loadSubCategory: state.course.loadSubCategory,
})

const mapDispatchToProps = {
    uploadCourse, getAllMainCategories, updateCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseView)