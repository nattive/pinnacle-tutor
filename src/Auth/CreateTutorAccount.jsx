import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, TextArea, Checkbox, Input } from 'semantic-ui-react'
import { useEffect } from 'react'
import { createTutor } from "../actions/authAction";
import { Container } from '@material-ui/core'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const CreateTutorAccount = (props) => {
    const [isPO_tutor, setIsPO_tutor] = useState(false)
    const [name, setName] = useState(props.user && props.user.name)
    const [image, setImage] = useState('')
    const [about, setAbout] = useState('')
    const [files, setFiles] = useState('')
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const [youTube, setYouTube] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [isCotF_tutor, setIsCotF_tutor] = useState(false)
    const [unAuth, setUnAuth] = useState(false);
    const [disableForm, setDisableForm] = useState(true)
    const handleSubmit = () => {
        const data = {
            isPO_tutor,
            name,
            image,
            about,
            files,
            facebook,
            twitter,
            instagram,
            youTube,
            user_id: props.user && props.user.id,
            linkedIn,
            isCotF_tutor,
            disableForm,
        }
        props.createTutor(data)
    }
    const field = [
        {
            name: about,
            component: 'textarea',
            type: 'text',
            component: TextArea,
            placeholder: 'Write a short bio about you',
            onChange: (e) => setAbout(e.target.value)

        },
        {
            name: isPO_tutor,
            type: 'checkbox',
            component: 'input',
            placeholder: 'Do you want to be a pinnacle Ulearn tutor?',
            onChange: () => setIsPO_tutor(!isPO_tutor)

        },
        {
            name: isCotF_tutor,
            component: 'input',
            type: 'checkbox',
            input: 'checkbox',
            placeholder: 'Do you want to be a tutor for the career of the future?',
            onChange: (e, c) => setIsCotF_tutor(c)

        },
        {
            name: image,
            type: 'file',
            component: 'input',
            placeholder: 'Upload a profile image',
            error: '',
            onChange: (e) => setImage(e.target.value)

        },
        {
            name: files,
            type: 'file',
            component: 'input',
            placeholder: 'Upload your files, cv and any other document to enhance your application',
            error: null,
            onChange: (e) => setFiles(e.target.value)

        },
        {
            name: facebook,
            component: Input,
            type: 'text',
            placeholder: 'Your facebook id',
            onChange: (e) => setFacebook(e.target.value),
            icon: 'facebook',
            iconPosition: 'left',

        },
        {
            name: twitter,
            component: Input,
            type: 'text',
            placeholder: 'Your twitter handle',
            onChange: (e) => setTwitter(e.target.value),
            icon: 'twitter',
            iconPosition: 'left',
        },
        {
            name: instagram,
            component: Input,
            type: 'text',
            placeholder: 'Your instagram account link',
            onChange: (e) => setInstagram(e.target.value),
            icon: 'instagram',
            iconPosition: 'left',
        },
        {
            name: youTube,
            component: Input,
            type: 'text',
            placeholder: 'Link to your youtube account',
            onChange: (e) => setYouTube(e.target.value),
            icon: 'youtube',
            iconPosition: 'left',
        },
        {
            name: linkedIn,
            component: Input,
            type: 'text',
            placeholder: 'your linkedIn ptofile link',
            icon: 'linkedin',
            onChange: (e) => setName(e.target.value),
            icon: 'linkedin',
            iconPosition: 'left',
        },

    ]
    
    useEffect(() => {
        if (props.user.id) {
            setDisableForm(false)
            setErrorMessage(null)
        } else {
            setDisableForm(true)
            setUnAuth(true)
            setErrorMessage("You need a user account, login, or sign up to proceed")
        }
    }, [props.user])

    useEffect(() => {
        if (props.tutor && props.tutor.tutor && props.tutor.tutor.id) {
            props.history.push('/')
        }
    }, [props.tutor])

     useEffect(() => {
        if (props.createTutorError) {
            setErrorMessage(props.createTutorError)
        }
    }, [props.createTutorError])
    
    return (
      <div style={{ margin: "1em 0" }}>
        <Container>
          <Grid.Column>
            <Header as="h2" color="teal" textAlign="center">
              ...And finally
            </Header>
            <Form
              loading={false}
              unstackable
              size="large"
              onSubmit={handleSubmit}
            >
              <Message visible={errorMessage} error>
                {errorMessage} {unAuth && <Link to="/auth">Login</Link>}
              </Message>
              <Segment stacked>
                {/* <Message hidden={!registerError} negative={registerError}>{registerError}</Message> */}
                {field.map((item, key) => (
                  <Form.Field
                    iconPosition={item.iconPosition}
                    icon={item.icon}
                    value={item.name}
                    disableForm={disableForm}
                    checked={item.name}
                    onChange={item.onChange}
                    required={item.required}
                    label={item.placeholder}
                    control={item.component}
                    type={item.type}
                  />
                ))}
                <Form.Button
                  disabled={disableForm}
                  loading={props.isCreatingTutor}
                  color="blue"
                  fluid
                  size="large"
                  content="Submit"
                />
              </Segment>
            </Form>
          </Grid.Column>
        </Container>
      </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    createTutorError: state.auth.createTutorError,
    isCreatingTutor: state.auth.isCreatingTutor,
    tutor: state.auth.tutor,
})

const mapDispatchToProps = {
    createTutor
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTutorAccount)
