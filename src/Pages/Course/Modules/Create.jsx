import React, { Component } from 'react'
import { connect } from 'react-redux'
import { EditorState } from 'draft-js';
import { uploadCourseMaterial, getCourse } from '../../../actions/courseAction'
import { Container, Divider, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, ButtonGroup } from '@material-ui/core';
import CreateView from './CreateView';

class Create extends Component {

    
    componentDidMount() {
        this.props.getCourse(this.props.match.params.slug);
    }


    render() {
        return (
            <Container style={{ marginTop: '10%' }}>
                <CreateView  />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    course: state.course.course,
    moduleField: state.moduleField,
})

const mapDispatchToProps = {
    uploadCourseMaterial,
    getCourse,
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
