// import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import ensureArray from 'ensure-array';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText, Breadcrumbs } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavList } from './NavList';
 import 'semantic-ui-css/semantic.min.css'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"; 
import { primaryBlueDefault } from '../constants/colours'
import Course from '../Pages/Course';
import ResponsiveContainer from './ResponsiveContainer';
import { Divider } from '@material-ui/core';
const navWidthCollapsed = 64;
const navWidthExpanded = 280;

const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'block' : 'none')};
    white-space: nowrap;
    background-color: #26265c;
    color: #fff;
    > * {
        color: inherit;
        background-color: inherit;
    }
`;

// height: 20px + 10px + 10px = 40px
const NavTitle = styled.div`
    font-size: 2em;
    line-height: 20px;
    padding: 10px 0;
`;

// height: 20px + 4px = 24px;
const NavSubTitle = styled.div`
    font-size: 1em;
    line-height: 20px;
    padding-bottom: 4px;
`;

const NavInfoPane = styled.div`
    float: left;
    width: 100%;
    padding: 10px 20px;
    background-color: #eee;
`;

const Separator = styled.div`
    clear: both;
    position: relative;
    margin: .8rem 0;
    background-color: #ddd;
    height: 1px;
`;

const Main = styled.main`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: ${navWidthCollapsed}px;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    background: ${props => (props.expanded ? 'rgba(0, 0, 0, .6)' : 'inherit')};
    transition: background-color .35s cubic-bezier(.4, 0, .2, 1);
`;

export default class extends PureComponent {
    state = {
        selected: 'home',
        expanded: false
    };

    lastUpdateTime = new Date().toISOString();

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    pageTitle = {
        'home': 'Home',
        'devices': ['Devices'],
        'reports': ['Reports'],
        'settings/policy': ['Settings', 'Policy'],
        'settings/network': ['Settings', 'Network']
    };

    // renderBreadcrumbs() {
    //     const { selected } = this.state;
    //     const list = ensureArray(this.pageTitle[selected]);

    //     return (
    //         <Breadcrumbs>
    //             {list.map((item, index) => (
    //                 <Breadcrumbs.Item
    //                     active={index === list.length - 1}
    //                     key={`${selected}_${index}`}
    //                 >
    //                     {item}
    //                 </Breadcrumbs.Item>
    //             ))}
    //         </Breadcrumbs>
    //     );
    // }
    render() {
        const { expanded, selected } = this.state;

        return (
            <Router>
                <Route render={({ location, history }) => (
                    <React.Fragment>
                        <SideNav
                            style={{ backgroundColor: primaryBlueDefault }}
                            onSelect={(selected) => {
                                const to = '/' + selected;
                                if (location.pathname !== to) {
                                    history.push(to);
                                }
                            }}
                        >
                            <SideNav.Toggle />
                            <NavHeader expanded={expanded}>
                                {/* <NavTitle>Tutor Name</NavTitle> */}
                            </NavHeader>
                            <Divider />
                            <SideNav.Nav defaultSelected="home">
                                {
                                    NavList.map(nav =>
                                    <React.Fragment key={nav.name}>
                                        <NavItem eventKey={nav.link}>
                                            <NavIcon>
                                                <nav.icon />
                                            </NavIcon>
                                            <NavText style={{ paddingRight: 32, textTransform: 'uppercase' }} title="HOME">
                                                {nav.name}
                                            </NavText>
                                        </NavItem>
                                        <Divider color='secondary' />
                                        </React.Fragment>
                                    )
                                }
                            </SideNav.Nav>
                        </SideNav>
                        <Main expanded={expanded}>
                            <main>
                            <ResponsiveContainer />
                                {/* <Route path="/" exact component={props => <RootComponent />} /> */}
                                <Route path="/dashboard" component={props =>'dashboard'} />
                                <Route path="/courses" component={props => <Course {...props} />} />
                                <Route path="/course/tool" component={props => 'course/tool'} />
                                <Route path="/resource" component={props => 'resource'} />
                            </main>
                        </Main>
                    </React.Fragment>
                )}
                />
            </Router>
        );
    }
}