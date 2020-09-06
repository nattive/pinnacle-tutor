import React, { Component } from 'react'
import { connect } from 'react-redux'
import CourseView from './CourseView'
import Modules from './Modules'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Tools from './Tools'

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
                 <Route path={`${path}/tools`}>
                    <Tools />
                </Route>
                
                <Route path="*">4000004</Route>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseRoutes)
