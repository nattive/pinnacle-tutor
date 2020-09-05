import React, { Component } from 'react'
import { connect } from 'react-redux'
import CourseView from './CourseView'
import Modules from './Modules'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

const CourseRoutes = () => {
    const { path } = useRouteMatch()

    return (
        <div>
            <Switch>
                <Route exact path={path}>
                   <CourseView />
                </Route>
                <Route path={`${path}/modules/:slug`}>
                    <Modules />
                </Route>
                <Route path="*">404</Route>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseRoutes)
