import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, TextArea, Checkbox, Input } from 'semantic-ui-react'
import { useEffect } from 'react'

export const CreateTutorAccount = (props) => {
    const [isPO_tutor, setIsPO_tutor] = useState(false)
    const [name, setName] = useState(props.user && props.user.name)
    const [image, setImage] = useState('')
    const [about, setAbout] = useState('')
    const [files, setFiles] = useState('')
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const [youTube, setYouTube] = useState('')
    const [admin_id, setAdmin_id] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [isCotF_tutor, setIsCotF_tutor] = useState(false)
    const handleSubmit = () => {
        return
    }
    const field = [
        {
            name: name,
            component: Input,
            type: 'text',
            required: true,
            placeholder: 'Your full Name',
            error: null,
            onChange: (e) => setName(e.target.value)
        },
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
        if(!props.user) {
            props.history.push('/login')
        }
    }, [])
    return (
        <div style={{margin: '1em 0'}}>
            <Grid xs={12}>
                <Grid.Column >
                    <Header as='h2' color='teal' textAlign='center'>
                        ...And finally
                   </Header>
                    <Form loading={false} unstackable size='large' onSubmit={handleSubmit} >
                        <Segment stacked>
                            {/* <Message hidden={!registerError} negative={registerError}>{registerError}</Message> */}
                            {field.map((item, key) => (
                                <Form.Field iconPosition={item.iconPosition}
                                    icon={item.icon}
                                    value={item.name} 
                                    checked={item.name}
                                    onChange={item.onChange} required={item.required}
                                    label={item.placeholder} control={item.component}
                                    type={item.type} />
                            ))}
                            <Form.Button color='blue' fluid size='large' content='Submit' />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTutorAccount)
