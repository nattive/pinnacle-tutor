import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Statistic, Segment, Feed, Header } from 'semantic-ui-react'
import { Container, Grid, Icon, Typography, Divider } from '@material-ui/core'
import { getAllCourses } from "../../actions/courseAction"
import { useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import avatar from '../../Assets/img/team/1.png'
import { getActivities } from "../../actions/indexActon"
import { Skeleton } from '@material-ui/lab'
import DiscountTable from './DiscountTable'
const DashboardView = (props) => {

    useEffect(() => {
        props.getActivities()
        props.getAllCourses()
    }, [])

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} md={7}>
                    <Segment>
                    <Grid container>
                        <Grid item xs={6} md={3}>
                                <Statistic style={{ padding: '2em', borderRight: '1px solid #37373799' }}>
                                    <Statistic.Label style={{ color: 'green' }}>Uploaded <br />Courses</Statistic.Label>
                                    <Statistic.Value>{props.courses.length}</Statistic.Value>
                                </Statistic>
                        </Grid>
                         <Grid item xs={6} md={3}>
                                <Statistic style={{ padding: '2em', borderRight: '1px solid #37373799' }}>
                                    <Statistic.Label style={{ color: 'green' }}>Total <br />reviews</Statistic.Label>
                                    <Statistic.Value>{props.reviews || 0}</Statistic.Value>
                                </Statistic>
                        </Grid>
                         <Grid item xs={6} md={3}>
                                <Statistic style={{ padding: '2em', borderRight: '1px solid #37373799' }}>
                                    <Statistic.Label style={{ color: 'green' }}>Unread <br />messages</Statistic.Label>
                                    <Statistic.Value>{0}</Statistic.Value>
                                </Statistic>
                        </Grid>
                         <Grid item xs={6} md={3}>
                                <Statistic style={{ padding: '2em', borderRight: '1px solid #37373799' }}>
                                    <Statistic.Label style={{ color: 'green' }}>Discount <br />Codes</Statistic.Label>
                                    <Statistic.Value>{props.discounts ? props.discounts.length  : 0}</Statistic.Value>
                                </Statistic>
                        </Grid>
                    </Grid>
                    </Segment>
                    <Divider />
                    {/* <Segment> */}
                        <DiscountTable />
                    {/* </Segment> */}
                </Grid>
                <Grid item xs={12} md={5} style={{ padding: '1em' }}>
                    <Header as='h2' >
                        <Icon name='newspaper' />
                         Activity
                        <Header.Subheader>
                            Recent Activities your courses
                        </Header.Subheader>
                    </Header>
                    <Segment>
                        <Feed>
                            {
                                props.gettingActivities ? (
                                    <Skeleton variant="rect" height={100}/>
                                ) :
                                props.Activities.data && props.Activities.data.length > 0 ? props.Activities.data.map((activity, key) => (
                                <React.Fragment key={key}>
                                        <Feed.Event
                                            icon='check circle outline'
                                            date={activity.created_at}
                                            summary={activity.title}
                                            extraText={activity.body}
                                        />
                                </React.Fragment>)
                            ) : (<Typography variant="body2">No recent activity</Typography>)}

                        </Feed>
                    </Segment>

                </Grid>
            </Grid>

        </Container>
    )
}

const mapStateToProps = (state) => ({
    courses: state.course.courses,
    gettingActivities: state.index.gettingActivities,
    discounts: state.course.discounts.data,
    ActivitiesError: state.index.ActivitiesError,
    Activities: state.index.Activities,
})

const mapDispatchToProps = {
    getAllCourses, getActivities
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)
