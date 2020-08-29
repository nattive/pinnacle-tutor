import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Form } from 'semantic-ui-react'

const AddModuleHeader = () => {
    return (
        <Grid.Row centered>
            <Grid.Column verticalAlign>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='First name' placeholder='First name' />
                        <Form.Input fluid label='Last name' placeholder='Last name' />
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                </Form>
            </Grid.Column>
        </Grid.Row>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModuleHeader)
