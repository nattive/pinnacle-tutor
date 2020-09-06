import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, TextField, makeStyles } from '@material-ui/core'
import DateTimePicker from 'react-datetime-picker';

import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
    Header,
    Label,
    Message,
} from 'semantic-ui-react'
import  DiscountTable  from '../../Dashboard/DiscountTable'
import { createDiscount } from "../../../actions/courseAction"
import { primaryBlueDefault } from '../../../constants/colours'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
const Tools = (props) => {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [banner, setBanner] = useState(null)
    const [type, setType] = useState('')
    const [due, setDue] = useState(new Date());
    const [code, setCode] = useState('')
    const [discount, setDiscount] = useState('')
    const [course_id, setCourse_id] = useState(null)

    const handleDateChange = (date) => {
        setDue(date);
    };
    const handleSubmit = () => {
        const data = {
            name,
            banner,
            discount,
            type,
            due,
            code,
            course_id,
        }
        props.createDiscount(data)
    }
    const field = [
        {
            value: name,
            type: 'text',
            onChange: (e) => setName(e.target.value),
            placeholder: "Give the discount a name",
            required: true,
            control: 'input'
        },
        {
            value: type,
            onChange: (e, { value }) => setType(value),
            placeholder: "Select to choose either discount takes some percentage of or some amount off the initial price",
            required: true,
            control: Select,
            option: [
                { key: 'Percentage', text: 'Percentage Off', value: 'Percentage' },
                { key: 'amount', text: 'Amount Off', value: 'Percentage' },
            ]
        },
        {
            value: code,
            type: 'text',
            onChange: (e) => setCode(e.target.value),
            placeholder: "Type a unique code which the user will user to benefit from discount",
            required: true,
            control: 'input'
        },
        {
            value: discount,
            type: 'number',
            onChange: (e) => setDiscount(e.target.value),
            placeholder: "The amount or percentage to be taken off",
            required: true,
            control: 'input'
        },

        // {
        //     value: course_id,
        //     type: 'text',
        //     onChange: (e) => setName(e.target.value),
        //     placeholder: "GiSelect if this is for a specific ",
        //     required: true,
        //     control: 'input'
        // },

    ]
    return (
        <Container>
            <Grid container>
                <Grid item sm={12} md={6} style={{ margin: '3em 0' }}>
                    <Header
                        as='h2'
                        content='Discount/Promo code'
                        subheader='Create promo/discount codes for your courses'
                    />
                    <Message hidden={!props.createDiscountError} error>{props.createDiscountError}</Message>
                    <div style={{margin: "2em"}}>
                    <Label >The discount Elapse date and time</Label>
                    <DateTimePicker
                        onChange={handleDateChange}
                        value={due}
                        yearPlaceholder="yyyy"
                        style={{ paddingL: 10 }}
                        secondPlaceholder="ss"
                        name='due'
                        amPmAriaLabel="Select AM/PM"
                        required
                    />
                    </div>
                    <Form onSubmit={handleSubmit}>
                        {
                            field.map((item, key) => (
                                <Form.Field
                                    key={key}
                                    control={item.control}
                                    label={item.placeholder}
                                    onChange={item.onChange}

                                    options={item.option}
                                    required={item.required}
                                />
                            ))
                        }
                        <Form.Button loading={props.isCreatingDiscounts} color="blue" style={{ margin: "15px 0" }} content="Create" />
                    </Form>
                </Grid>
                <Grid item sm={12} md={6}>
                    <DiscountTable />
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    isCreatingDiscounts: state.course.isCreatingDiscounts,
    createDiscountError: state.course.createDiscountError,
    discountError: state.course.discountError,
})

const mapDispatchToProps = {
    createDiscount
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools)
