import React, { Component } from 'react'
import { connect } from 'react-redux'
import { EditorState } from 'draft-js';
import { uploadCourseMaterial, getCourse } from '../../../actions/courseAction'
import { Container, Divider, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button, ButtonGroup } from '@material-ui/core';
import CreateView from './CreateView';
import { Breadcrumb } from 'semantic-ui-react'
import { Link } from 'react-router-dom/cjs/react-router-dom';
class Create extends Component {

    
    componentDidMount() {
        this.props.getCourse(this.props.match.params.slug);
    }


    render() {
        return (
          <Container>
            <Breadcrumb>
              <Breadcrumb.Section as={Link} to="/home" link>
                Home
              </Breadcrumb.Section>
              <Breadcrumb.Divider>/</Breadcrumb.Divider>
              <Breadcrumb.Section as={Link} to="/home" link>
                Registration
              </Breadcrumb.Section>
              <Breadcrumb.Divider>/</Breadcrumb.Divider>
              <Breadcrumb.Section active>
                Personal Information
              </Breadcrumb.Section>
            </Breadcrumb>
            <CreateView />
          </Container>
        );
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
