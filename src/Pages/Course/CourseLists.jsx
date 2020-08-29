import React from 'react'
import { Header, Table, Rating, Icon } from 'semantic-ui-react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { getAllCourses } from '../../actions/courseAction'
import { Button } from '@material-ui/core'

const CourseLists = (props) => {
    useEffect(() => {
        props.getAllCourses()
    }, [])
    return (
        <Table celled padded>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>banner</Table.HeaderCell>
                    <Table.HeaderCell singleLine>Title</Table.HeaderCell>
                    <Table.HeaderCell singleLine>Status</Table.HeaderCell>
                    <Table.HeaderCell singleLine>courseCode</Table.HeaderCell>
                    <Table.HeaderCell singleLine>isPO</Table.HeaderCell>
                    <Table.HeaderCell singleLine>isCareer</Table.HeaderCell>
                    <Table.HeaderCell singleLine>isFree</Table.HeaderCell>
                    <Table.HeaderCell singleLine>Rating</Table.HeaderCell>
                    <Table.HeaderCell singleLine>Course Difficulty</Table.HeaderCell>
                    <Table.HeaderCell singleLine></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.allCategories.length > 0 ? props.allCategories.map(course => (
                    <Table.Row key={course.key}>
                        <Table.Cell singleLine>banner </Table.Cell>
                        <Table.Cell singleLine>{course.title} </Table.Cell>
                        <Table.Cell singleLine>{!course.banner || !course.videoUrl ? 'Course Upload incomplete' : course.ApprovedBy ? 'Yet to be approve' : 'Approved'} </Table.Cell>
                        <Table.Cell singleLine> {course.courseCode} </Table.Cell>
                        <Table.Cell textAlign='center'>
                            {course.isCareer === '1' && <Icon color='green' name='checkmark' size='large' />}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            {course.isFree === '1' && <Icon color='green' name='checkmark' size='large' />}

                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                            {course.isPO === '1' && <Icon color='green' name='checkmark' size='large' />}

                        </Table.Cell>
                        <Table.Cell>
                            <Rating icon='star' defaultRating={course.rating_percentage} maxRating={5} />
                        </Table.Cell>
                        <Table.Cell singleLine>
                        <Button variant='primary'> Add Modules </Button><br />
                        <Button variant='primary'> Delete Course </Button><br />
                        <Button variant='primary'> Order Course Tools </Button>
                         </Table.Cell>
                        <Table.Cell singleLine> </Table.Cell>
                    </Table.Row>
                )

                ) : 'You are yet to upload a course'}

            </Table.Body>
        </Table>
    )
}
const mapStateToProps = (state) => ({
    allCategories: state.course.allCategories,
    isGettingCourses: state.course.isGettingCourses,
    fetchCoursesError: state.course.fetchCoursesError,
})

const mapDispatchToProps = {
    getAllCourses
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseLists)