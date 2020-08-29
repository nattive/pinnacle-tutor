import React, { Component } from 'react'
import { connect } from 'react-redux'
import CourseView from '../CourseView'
import { Switch, BrowserRouter } from 'react-router-dom'
import AddModuleHeader from './AddModuleHeader'

const Modules = () => {
    return (
        <div>
            <Switch>
                <BrowserRouter exact path={path}>
                    <AddModuleHeader />
                </BrowserRouter>
                <BrowserRouter path={`${path}/modules/:slug`}>
                    {/* <Topic /> */}
                </BrowserRouter>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Modules)
