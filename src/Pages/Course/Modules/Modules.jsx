import React, { Component } from 'react'
import { connect } from 'react-redux'
import CourseView from '../CourseView'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import AddModuleHeader from './AddModuleHeader'
import Create from './Create'
import AddQuestion from '../../Modules/AddQuestion';

const Modules = () => {
    const { path, url } = useRouteMatch()
    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <AddModuleHeader />
                </Route>
                <Route exact path={path} render={(props) => <Create {...props} />} />
                <Route exact path={path + '/create'} render={(props) => <Create {...props} />} />
                <Route exact path={path + '/quiz/:module'} render={(props) => <AddQuestion {...props} />} />
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Modules)
