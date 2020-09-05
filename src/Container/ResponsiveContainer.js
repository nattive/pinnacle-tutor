import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText, Breadcrumbs } from '@trendmicro/react-sidenav';

import { primaryBlueDefault } from '../constants/colours';
import store from '../constants/store';
import { EXPAND_NAV } from '../actions/types';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        zIndex: 10000,
        backgroundColor: '#000066'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ResponsiveContainer() {
    const classes = useStyles();
    const expanded = useSelector(state => state.index.expanded)
    return (
        <div className={classes.root}>
            <AppBar position="fixed" elevation={0} style={{ backgroundColor: primaryBlueDefault }}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <SideNav.Toggle expanded={expanded} onClick={() => store.dispatch({ type: EXPAND_NAV, payload: !expanded })} />
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
