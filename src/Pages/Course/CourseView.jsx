import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Select as MaterialSelect, FormHelperText } from '@material-ui/core';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {
    Icon, Container, Grid,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
    Header
} from 'semantic-ui-react'
import { Divider, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { useDispatch, connect, useSelector } from 'react-redux';
import { uploadCourse, getAllMainCategories } from '../../actions/courseAction';
import {
    SET_TITLE,
    SET_SUB_CATEGORY_ID,
    SET_VIDEO_URL,
    LOAD_SUB_CAT,
    SET_BANNER,
    SET_IS_PO,
    SET_IS_CAREER,
    SET_IS_FREE,
    SET_PRICE,
    SET_OBJECTIVE,
    SET_DIFFICULTY,
    SET_DESCRIPTION,
} from '../../actions/types';
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
    const isPO = useSelector(state => state.courseField.isPO)
    const isCareer = useSelector(state => state.courseField.isCareer)
    const isFree = useSelector(state => state.courseField.isFree)
    const price = useSelector(state => state.courseField.price)
    const tutor_id = useSelector(state => state.courseField.tutor_id)
    const allMainCategories = useSelector(state => state.course.allMainCategories)
    const loadSubCategory = useSelector(state => state.course.loadSubCategory)
    const course_difficulty = useSelector(state => state.courseField.course_difficulty)
    const [mainCat, setMainCat] = useState()
    const [subCat, setSubCat] = useState()
    const options = [
        { key: 'Easy', text: 'Easy', value: 'Easy' },
        { key: 'Medium', text: 'Medium', value: 'Medium' },
        { key: 'Top Level', text: 'Top Level', value: 'Top Level' },
    ]
    const stepOne = [
        {
            name: title,
            error: { content: 'Please enter Title of the course', pointing: 'below' }, control: Input,
            label: 'Course Title',
            placeholder: 'e.g Introduction To Pinnacle Courses',
            onChange: (e) => dispatch({ type: SET_TITLE, payload: e.target.value })
        },

        {
            name: isPO,
            control: Checkbox,
            type: 'checkbox',
            label: 'Make This course available for Pinnacle ULearn students',
            placeholder: '',
            onChange: () => {
                dispatch({ type: SET_IS_PO, payload: !isPO })
            }
        },
        {
            name: isCareer,
            control: Checkbox,
            type: 'checkbox',
            label: 'Make This course available for Career of the future students',
            placeholder: '',
            onChange: () => {
                dispatch({ type: SET_IS_CAREER, payload: !isCareer })
            }
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
        <Grid.Row style={{ width: '90%', paddingTop: '10px' }}>
            <Typography variant='h4' color='primary' style={{ margin: 5 }}>Basic information about the course</Typography>
            <Divider style={{ margin: 2 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        }}
                        label="Main Category"
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
            </div>
            <Form.Group >
                {
                    stepOne.map(input => (
                        <>
                            <Form.Field
                                required
                                fluid
                                size='large'
                                type={input.type}
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
            <Form.Group >
                {
                    stepOneMini.map(input => (
                        <>
                            <Form.Field
                                required
                                // fluid
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
            </Form.Group>
        </Grid.Row>
    )
}

const StepTwo = () => {
    const [video, setVideo] = useState()
    const [sub_category_id, setSubCategoryId] = useState()
    const [banner, setBanner] = useState()
    const [description, setDescription] = useState()
    const [tutor_id, setTutor_id] = useState()
    const dispatch = useDispatch()

    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files) => { console.log(files.map(f => f.meta)) }
    return (
        <Grid.Row style={{ width: '90%', padding: 10 }}>
            <Typography variant='h4' color='primary' style={{ margin: 5 }}> Upload media files for your course</Typography>
            <Divider style={{ margin: 10 }} />
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={({ meta, file }, status) => { dispatch({ type: SET_BANNER, payload: file }) }}
                onSubmit={handleSubmit}
                accept="image/*"
                maxFiles={1}
                autoUpload={false}
                multiple={false}
                inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Upload course banner image')}
            />
            <Divider style={{ margin: 10 }} />
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="video/*"
                maxFiles={1}
                autoUpload={false}
                multiple={false}
                inputContent={(files, extra) => (extra.reject ? 'video files only' : 'Upload Introductory video for the course')}
            />
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
            <div style={{ margin: '10px' }}>
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

        default:
            return 'Unknown step';
    }
}

function CourseView(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const classes = useStyles();
    useEffect(() => {
        props.getAllMainCategories()
    }, [])
    useEffect(() => {
        // if (props.uploadedCourse !== {}) {
        //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // }

    }, [props.uploadedCourse])
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                                        onClick={props.uploadCourse}
                                        className={classes.button}
                                    >
                                        {'Next'}
                                    </Button> : <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={activeStep === steps.length - 1 ? props.uploadCourse : handleNext}
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
    allMainCategories: state.course.allMainCategories,
    loadSubCategory: state.course.loadSubCategory,
})

const mapDispatchToProps = {
    uploadCourse, getAllMainCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseView)