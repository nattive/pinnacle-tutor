import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Course from './Course'
export default function MainPage() {
    return (
        <>
        <Router>
            <ResponsiveContainer />

            <Switch>
                <Route exact path="/">
                    <p>Home</p>
                </Route>
                <Route  path="/courses">
                    <Course />
                </Route>
                 <Route  path="/course/tool">
                    <p>course tool</p>
                </Route>
                 <Route  path="/resource">
                    <p>resource</p>
                </Route>
                
            </Switch>
        </Router>
        </>
    )
}
