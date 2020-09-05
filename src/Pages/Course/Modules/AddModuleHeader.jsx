import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Table, Label, Button, Message } from 'semantic-ui-react'
import { Grid, Card, CardHeader, CardContent, Typography, Container, CircularProgress } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { getCourse, createModuleHeader, updateModuleHeader } from '../../../actions/courseAction'
import { useEffect } from 'react'
import { useState } from 'react'
import ModulesTable from './ModulesTable'
const AddModuleHeader = (props) => {
    let { slug } = useParams();
    useEffect(() => {
        props.getCourse(slug)
    }, [])

    useEffect(() => {
        setModuleTitleitle(props.showUpdatePanel.title)
    }, [props.showUpdatePanel.title])

    console.log(slug)
    const [title, setTitle] = useState('')
    const [moduleTitle, setModuleTitleitle] = useState()
    const [hasError, setHasError] = useState(null)
    const handleSubmit = () => {
        if (title !== '') {
            const data = {
                title,
                course_id: props.course.id
            }
            props.createModuleHeader(data)
        } else {
            setHasError('Title Field is required')
        }
    }

    const { isGettingCourse, isCreating } = props
    return (
        <Container>
            <Grid container justify='center' alignContent='center' style={{ marginTop: '0.5vh' }}>
                <Grid item xs={12} spacing={2} md={props.showUpdatePanel ? 9 : 12}>
                    <Card>
                        <CardHeader title={`Add A module Header to the ${props.course && props.course.title} course`}
                            subheader='Module headers are like the group name, where each courses falls into ' />
                        <CardContent>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input onChange={(e) => setTitle(e.target.value)} value={title} fluid placeholder='e.g introduction' />
                                </Form.Group>
                                <div style={{ display: 'flex', margin: 3 }}>
                                    <Button disabled={!props.course.id} onClick={handleSubmit} loading={props.isCreating}>Add Module</Button>
                                </div>
                            </Form>
                        </CardContent>
                    </Card>
                    <Typography style={{ padding: 10 }} variant='subtitle2' color="primary">If you already have a module header created,
                choose from the table, to add module material</Typography>
                    <ModulesTable />
                </Grid>
                <Grid item xs={12} md={props.showUpdatePanel ? 3 : 12}>
                    {props.showUpdatePanel && <Card>
                        <CardHeader title={`Edit Module: ${props.showUpdatePanel.title}`} />
                        <CardContent>
                            <Form error={props.errUpdatingHeader} success={props.headerHasUpdated}>
                                {(props.errUpdatingHeader || props.headerHasUpdated) && <Message
                                    error={props.errUpdatingHeader}
                                    success={props.headerHasUpdated}
                                    header={props.errUpdatingHeader ? 'An error occured' : props.headerHasUpdated}
                                    content={props.errUpdatingHeader}
                                />}
                                <Form.Group widths='equal'>
                                    <Form.Input onChange={(e) => setModuleTitleitle(e.target.value)} value={moduleTitle} fluid placeholder='e.g introduction' />
                                </Form.Group>
                                <div style={{ display: 'flex', margin: 3 }}>
                                    <Button loading={props.isUpdatingHeader}
                                        onClick={() => props.updateModuleHeader({
                                            id: props.showUpdatePanel.id,
                                            title: moduleTitle
                                        })}>Update</Button>
                                </div>
                            </Form>
                        </CardContent>
                    </Card>}
                </Grid>
            </Grid>
        </Container>
    )
}
const mapStateToProps = (state) => ({
    course: state.course.course,
    hasCreatedModule: state.course.hasCreatedModule,
    isCreating: state.course.isCreating,
    isUpdatingHeader: state.course.isUpdatingHeader,
    isGettingCourse: state.course.isGettingCourse,
    errorGettingModule: state.course.errorGettingModule,
    showUpdatePanel: state.course.showUpdatePanel,
    isUpdatingHeader: state.course.isUpdatingHeader,
    errUpdatingHeader: state.course.errUpdatingHeader,
    headerHasUpdated: state.course.headerHasUpdated,
})

const mapDispatchToProps = {
    getCourse,
    createModuleHeader,
    updateModuleHeader
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModuleHeader)
