import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { uploadCourseMaterial, getCourse } from '../../../actions/courseAction'
import { Container, Divider, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, ButtonGroup } from '@material-ui/core';
import { Card, Icon, Grid, Input, TextArea, Dimmer, Loader } from 'semantic-ui-react';
import htmlToDraft from 'html-to-draftjs';
import { primaryBlueDefault, primaryGoldDefault, primaryBlue1 } from '../../../constants/colours'
import store from '../../../constants/store';
import { SET_MODULE_PREREQUISITE, SET_MODULE_OBJECTIVE, SET_COURSE_MODULE_ID, SET_MODULE_TEXT, SET_MODULE_BANNER, SET_MODULE_VIDEO, SET_MODULE_TITLE } from '../../../actions/types';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom/cjs/react-router-dom';



function CreateView(props) {
    const { course } = props;
    const [course_module_id, setCourse_module_id] = React.useState('');
    const [text, setText] = React.useState(EditorState.createEmpty());
    const [objective, setObjective] = React.useState(EditorState.createEmpty());
    const [prerequisite, setPrerequisite] = React.useState(EditorState.createEmpty());
    const [videoPath, setVideoPath] = React.useState('');
    const [images, setimages] = React.useState('');
    const [hasError, setHasError] = React.useState([]);
    const [moduleField, setModuleField] = React.useState({ ...props.moduleField });

    const handleUpload = () => {
        setHasError([])
        // console.log(5555)
        const {
            title,
            course_module_id,
            text,
            videoPath,
            images } = props.moduleField

        if (title === '') {
            console.log(200)
            hasError.concat({ error: 'title', message: 'Please included the module title' })
            return
        }

        if (course_module_id === '') {
            hasError.concat({ error: 'course_module_id', message: 'Select a module header or create one if you have\'nt yet' })
            return
        }

        if (text === '') {
            hasError.concat({ error: 'text', message: 'include a comprehensive text to complement the module\'s media' })
            return
        }

        if (videoPath === '' || images === '') {
            hasError.concat({ error: 'media', message: "Upload either a vudeo or an image" })
            return
        }
        props.uploadCourseMaterial()

    }
    // const handleUploadImage = window.cloudinary.createUploadWidget({
    //     cloudName: 'charisbiz-africa',
    //     multiple: false,
    //     // encryption: {
    //     //     key: "ff234fe526725753fa45b53325",
    //     //     iv: "cd8a46d72e26a365dca78ef"
    //     // }
    //     clientAllowedFormats: ["png", "gif", "jpeg"],
    //     // styles: {
    //     //     palette: {
    //     //         window: primaryBlueDefault,
    //     //         windowBorder: "#90A0B3",
    //     //         tabIcon: '#FFFFFF',
    //     //         menuIcons: '#FFFFFF',
    //     //         textDark: primaryBlueDefault,
    //     //         textLight: "#FFFFFF",
    //     //         link: primaryBlueDefault,
    //     //         action: primaryGoldDefault,
    //     //         inactiveTabIcon: '#fff',
    //     //         error: "#F44235",
    //     //         inProgress: "#0078FF",
    //     //         complete: "#20B832",
    //     //         sourceBg: " #fff"
    //     //     },
    //     //     // fonts: {
    //     //     //     "'Cute Font', cursive": "https://fonts.googleapis.com/css?family=Cute+Font",
    //     //     // }
    //     // },
    //     upload_preset: 'qtwirqod',
    // }, (error, result) => {
    //     if (result.event == "success") {
    //         dispatch({ type: SET_MODULE_BANNER, payload: result.info.url })
    //         // console.log(result.info) // result.info contains data from upload
    //     }
    //     }) 

    // const handleUploadVideo = window.cloudinary.createUploadWidget({
    //     cloudName: 'charisbiz-africa',
    //     multiple: false,
    //     // encryption: {
    //     //     key: "ff234fe526725753fa45b53325",
    //     //     iv: "cd8a46d72e26a365dca78ef"
    //     // }
    //     clientAllowedFormats: ["mp4", "3gp", "avi", "mpeg"],
    //     // styles: {
    //     //     palette: {
    //     //         window: primaryBlueDefault,
    //     //         windowBorder: "#90A0B3",
    //     //         tabIcon: '#FFFFFF',
    //     //         menuIcons: '#FFFFFF',
    //     //         textDark: primaryBlueDefault,
    //     //         textLight: "#FFFFFF",
    //     //         link: primaryBlueDefault,
    //     //         action: primaryGoldDefault,
    //     //         inactiveTabIcon: '#fff',
    //     //         error: "#F44235",
    //     //         inProgress: "#0078FF",
    //     //         complete: "#20B832",
    //     //         sourceBg: " #fff"
    //     //     }
    //     // },
    //     upload_preset: 'qtwirqod',
    // }, (error, result) => {
    //     if (result.event == "success") {
    //         // this.setState({ videoPath: result.info.url })
    //         dispatch({ type: SET_MODULE_VIDEO, payload: result.info.url })
    //         console.log(result.info) // result.info contains data from upload
    //     }
    // }) 
    const { dispatch } = store


    return (
        <Container style={{ marginTop: '10%' }}>
            <Grid.Row centered>
                {hasError && hasError.length !== 0 && hasError.map(error => <Alert severity="error">{error.message}</Alert>)}

                <Typography variant='h5' color='primary' style={{ margin: '20px 0' }}>Upload module to {course.title} </Typography>
            </Grid.Row>


            <Grid divided='vertically' >
                <Grid.Row  >
                    <Grid.Column width={8}>
                        <Card fluid>
                            <Card.Content header='Module Title' />
                            <Card.Content description={'Specify the module title, with a maximum characters of 200'} />
                            <Card.Content >
                                <Input fluid onChange={e => dispatch({ type: SET_MODULE_TITLE, payload: e.target.value })} />
                            </Card.Content>
                        </Card>
                        {/* <div style={{ margin: '10px', display: 'flex' }}>
                            <Button variant="contained" style={{ margin: 10 }} onClick={() => handleUploadImage.open()} color="primary" >
                                Upload Cover image  </Button>
                            <Button variant="contained" style={{ margin: 10 }} onClick={() => handleUploadVideo.open()} color="primary" >
                                Module Video  </Button>

                        </div> */}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Card fluid>
                            <Card.Content header='Module Header' />
                            <Card.Content description={'This will be name of the group this module belong to'} />
                            <Card.Content >
                                <FormControl fullWidth variant="outlined" style={{ padding: 5 }} >
                                    <InputLabel id="demo-simple-select-outlined-label">Module Headers</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={e => store.dispatch({ type: SET_COURSE_MODULE_ID, payload: e.target.value })}
                                        label="Course Category"
                                    >
                                        <MenuItem disabled value="null">
                                            <em>-- Select Module Header --</em>
                                        </MenuItem>
                                        {
                                            course.modules && course.modules.map(module =>
                                                <MenuItem value={module.id} key={module.id}>{module.title}</MenuItem>
                                            )
                                        }
                                    </Select>
                                    <FormHelperText>{course.modules && course.modules.length < 1 ? "You need to create a module header"
                                        : "Or create a new Header"}<Link to={`/courses/modules/${course.slug}`} >create a new header</Link></FormHelperText>
                                </FormControl>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row >
                    <Card fluid>
                        <Card.Content header='Module Objective' />
                        <Card.Content description={'The summary of what this module is aimed to achieve'} />
                        <Card.Content extra>
                            {/* <Icon name='user' />4 Friends */}
                            <Editor
                                editorStyle={{ width: '100%', height: '100px' }}
                                // initialEditorState={objective}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={(state) => {
                                    store.dispatch({ type: SET_MODULE_OBJECTIVE, payload: draftToHtml(convertToRaw(state.getCurrentContent())) })
                                }} />
                        </Card.Content>
                    </Card>
                </Grid.Row>
                <Grid.Row >
                    <Card fluid>
                        <Card.Content header='Module Prerequisite' />
                        <Card.Content description={'What are the essential knowledge, prospective student had to know before enrolling'} />
                        <Card.Content extra>
                            {/* <Icon name='user' />4 Friends */}
                            <Editor
                                editorStyle={{ width: '100%', height: '100px' }}
                                // editorState={htmlToDraft(objective)}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={(state) => {
                                    store.dispatch({ type: SET_MODULE_PREREQUISITE, payload: draftToHtml(convertToRaw(state.getCurrentContent())) })
                                }} />
                        </Card.Content>
                    </Card>
                </Grid.Row>

                <Grid.Row>
                    <Card fluid>
                        <Card.Content header='Module Text' />
                        <Card.Content description={'Here is where you explain comprehensively about the module, this complements the video resource'} />
                        <Card.Content extra>
                            {/* <Icon name='user' />4 Friends */}
                            <Editor
                                editorStyle={{ width: '100%', height: '400px' }}
                                // editorState={htmlToDraft(objective)}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={(state) => {
                                    store.dispatch({ type: SET_MODULE_TEXT, payload: draftToHtml(convertToRaw(state.getCurrentContent())) })
                                }} />
                        </Card.Content>
                    </Card>
                </Grid.Row>
                <Grid.Row>
                    <ButtonGroup style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='outlined' style={{ margin: 10 }}>Save To Draft</Button>
                        <Button variant='contained' onClick={props.uploadCourseMaterial} color="primary" style={{ margin: 10 }}>Upload</Button>
                    </ButtonGroup>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    course: state.course.course,
    moduleField: state.moduleField,
})

const mapDispatchToProps = {
    uploadCourseMaterial,
    getCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateView)

