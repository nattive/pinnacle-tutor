import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Avatar, Grid, Divider } from '@material-ui/core'
import { Grid as SemanticGrid, Image, Item, Segment, TextArea, Input, Header, Form, Message, Button } from 'semantic-ui-react'


const Profile = (props) => {
    const [isPO_tutor, setIsPO_tutor] = useState(false)
    const [name, setName] = useState(props.user && props.user.name)
    const [image, setImage] = useState('')
    const [about, setAbout] = useState('')
    const [files, setFiles] = useState('')
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [instagram, setInstagram] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [youTube, setYouTube] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [isCotF_tutor, setIsCotF_tutor] = useState(false)
    const [disableForm, setDisableForm] = useState(true)


const handleUploadImage =
  window.cloudinary &&
  window.cloudinary.createUploadWidget(
    {
      cloudName: "charisbiz-africa",
      upload_preset: "qtwirqod",
      multiple: false,
      autoMinimize: true,
      themes: "minimal",
      sources: ["local", "url", "dropbox"],
      clientAllowedFormats: ["jpg", "jpeg", "png"],
      text: {
        en: {
          local: {
            browse: "Upload image",
            main_title: "Upload Profile Image",
            dd_title_single: "Drag and Drop a Image file here",
            dd_title_multi: "Drag and Drop a Image file here",
            drop_title_single: "Drag and Drop a Image file here",
            drop_title_multiple: "Drag and Drop a Image file here",
          },
        },
      },
    },
    (error, result) => {
      if (result.event == "success") {
        setImage(result.info.url)
        console.log(result.info); // result.info contains data from upload
      }
    }
  );

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
        // pr

    }
    const formField = [
        {
            name: name,
            type: "text",
            placeholder: "Full Name",
            error: props.hasError && props.hasError.name,
            onChange: e => setName(e.target.value)
        },
        {
            name: email,
            type: "email",
            placeholder: "Email Address",
            error: props.hasError && props.hasError.email,
            onChange: e => setEmail(e.target.value)

        },
        {
            name: password,
            placeholder: "Password",
            error: props.hasError && props.hasError.password,
            onChange: e => setPassword(e.target.value),
            type: "password",
        },
        {
            onChange: e => setConfirmPassword(e.target.value),
            type: "password",
            placeholder: "Confirm Password",
            error: props.hasError && props.hasError.ConfirmPassword,
            name: "ConfirmPassword",
        },
    ]
    const { tutor, user } = props
    return (
      <div>
        <Container>
          <Grid container style={{ margin: "3em" }}>
            <Grid item xs={12} md={4} justify="center">
              <Container>
                <SemanticGrid verticalAlign="middle">
                  <Item>
                    <div className="mx-auto">
                      <Avatar
                        src={props.tutor.image}
                        component={Button}
                        onClick={handleUploadImage}
                        alt={user.name}
                        style={{ width: "100%", height: "20em" }}
                      />
                    </div>
                    <Segment>
                      <Item.Group divided>
                        <Item.Content>
                          <Item.Header as="h2">{user.name}</Item.Header>
                          <Item.Meta>Your short Bio</Item.Meta>
                          <Divider />
                          <Item.Description className="mb-4">
                            {tutor.about}
                          </Item.Description>
                          <Item.Description>
                            <Item.Meta>Description</Item.Meta>
                            <Divider />
                          </Item.Description>
                          <Item.Extra>{`You are a ${
                            tutor.isCotF_tutor === 1 ||
                            tutor.isCotF_tutor === "1"
                              ? "Career of the future Tutor"
                              : tutor.isPO === 1 || tutor.isPO === "1"
                              ? "Pinnacle Ulearn tutor"
                              : "Free resource tutor"
                          }, 
                                                You have ${
                                                  tutor.rating || 0
                                                } rating`}</Item.Extra>
                        </Item.Content>
                      </Item.Group>
                    </Segment>
                  </Item>
                </SemanticGrid>
              </Container>
            </Grid>
            <Grid item xs={12} md={7}>
              <Form
                loading={false}
                unstackable
                size="large"
                onSubmit={handleSubmit}
              >
                <Message visible={errorMessage} error>
                  {errorMessage}
                </Message>
                <Segment stacked>
                  <Header as="h5">Update your Tutor profile</Header>
                  {field.map((item, key) => (
                    <Form.Field
                      iconPosition={item.iconPosition}
                      icon={item.icon}
                      value={item.name}
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
            </Grid>
          </Grid>
        </Container>
      </div>
    );
}

const mapStateToProps = (state) => ({
    appIsLoading: state.loading.appIsLoading,
    loadingText: state.loading.loadingText,
    tutor: state.auth.tutor,
    user: state.auth.user,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
