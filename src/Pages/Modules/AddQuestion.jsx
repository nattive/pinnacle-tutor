import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { Card, Checkbox, Button, TextArea, Form, Header, Label } from 'semantic-ui-react';
import { addQuiz } from '../../actions/courseAction'

class AddQuestion extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            question: '',
            course_materials_id: props.match.params.module,
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange = (e, { value }) => this.setState({ answer: value })
    handleQuiz = () => {
        const data = {
           ...this.state
        }
        this.props.addQuiz({data})
    }
    render() {
        const { question,
            optionA,
            optionB,
            optionC,
            optionD } = this.state
        const form = [
            {
                name: question,
                label: 'Write an apt an precise question to test the knowledge of the student.',
                placeholder: 'Write the question you which ask...',
                onChange: (e) => this.setState({ question: e.target.value })
            },
            {
                name: optionA,
                label: 'Option A',
                placeholder: 'In the first option...',
                onChange: (e) => this.setState({ optionA: e.target.value })
            },
            {
                name: optionB,
                label: 'Option B',
                placeholder: 'In the second option...',
                onChange: (e) => this.setState({ optionB: e.target.value })
            },
            {
                name: optionC,
                label: 'Option C',
                placeholder: 'In the third option...',
                onChange: (e) => this.setState({ optionC: e.target.value })
            },
            {
                name: optionD,
                label: 'Option C',
                placeholder: 'In the fourth option...',
                onChange: (e) => this.setState({ optionD: e.target.value })
            },
        ]
        const option = ['A', 'B', 'C', 'D']

        return (
            <Container>
                <Paper style={{ padding: 20, width: '80%' }}>
                    <Header as='h2'>
                        Add Question
                            <Header.Subheader>
                            Add Quiz and option to be included in the course module.
                            Please ensure you choose the appropriate answer to the question.
                        </Header.Subheader>
                    </Header>
                    <Grid container justify='center'>
                        <Grid item xs={12}>
                            <Form>
                                {
                                    form.map((field, key) =>
                                        <div style={{ margin: 10 }}>
                                            <Label>{field.label}</Label>
                                            <TextArea key={key} placeholder={field.placeholder} onChange={field.onChange} style={{ minHeight: 100 }} />
                                        </div>
                                    )
                                }

                                <Form.Group inline>
                                    <Label>Which of the option is the correct answer</Label>
                                    {
                                        option.map((e, k) =>
                                            <Form.Field key={k}>
                                                <Checkbox
                                                    radio
                                                    label={e}
                                                    name='answer'
                                                    value={e}
                                                    checked={this.state.answer === e}
                                                    onChange={this.handleChange}
                                                />
                                            </Form.Field>)
                                    }
                                </Form.Group>
                                <div style={{ margin: 20, float: 'right' }}>
                                    <Button.Group>
                                        <Button>Go Back</Button>
                                        <Button.Or />
                                        <Button positive onClick={this.handleQuiz} loading={this.props.isAddingQuiz}>Save</Button>
                                    </Button.Group>
                                </div>
                            </Form>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }
}

AddQuestion.propTypes = {

};

function mapStateToProps(state, ownProps) {
    return {
        isAddingQuiz: state.course.isAddingQuiz,
        quizAdded: state.course.quizAdded,
        errorAddingQuiz: state.course.errorAddingQuiz,
    };
}

export default connect(mapStateToProps, { addQuiz })(AddQuestion);
