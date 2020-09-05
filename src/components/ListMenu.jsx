import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useSelector } from "react-redux";
import { NavList } from "../Container/NavList";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export const MainListItems = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [event, setEvent] = React.useState(null)
    const [openReport, setOpenReport] = React.useState(false);
    const manager = useSelector(state => state.auth.manager)
    const handleClick = () => {
        setOpen(!open);
    }
    const handleOpen = (key) => {
       event === key ? setEvent(null) : setEvent(key)
    }
    return (
        <div>
            {
                NavList.map((Menu, k) => (
                    <React.Fragment key={k}>
                        {Menu.subMenu ?
                            <React.Fragment key={Menu.name}>
                                <List disablePadding >
                                    <ListItem button onClick={() => handleOpen(k)}>
                                        <ListItemIcon>
                                            <Menu.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={Menu.name} />
                                    </ListItem>
                                    <Collapse in={event === k} timeout="auto" unmountOnExit>
                                        {Menu.subMenu.map(SubMenu => (
                                            <React.Fragment key={SubMenu.name}>
                                               <List disablePadding >
                                                    <ListItem button className={classes.nested} component={Link} to={SubMenu.link}>
                                                        <ListItemIcon>
                                                            <SubMenu.icon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={SubMenu.name} />
                                                    </ListItem>
                                                </List>
                                            </React.Fragment>))}
                                    </Collapse>
                                </List>
                            </React.Fragment>
                            : (
                                <ListItem button component={Link} to={Menu.link}>
                                    <ListItemIcon>
                                        <Menu.icon />
                                    </ListItemIcon>
                                    <ListItemText primary={Menu.name} />
                                </ListItem>

                            )}

                    </React.Fragment>
                ))
            }
            {/* 
            
           
                    <ListItem button className={classes.nested} component={Link} to="/reports/wskpa/all">
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Staff Appraisal" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to="/reports/sales/all" >
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account/Sales" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to="/reports/fuel/all" >
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Fuel Consumption" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button component={Link} to="/chat">
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Message" />
            </ListItem>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <SupervisorAccountIcon />
                </ListItemIcon>
                {<ListItemText primary="Admin Corner" />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List disablePadding >
                    <ListItem button className={classes.nested} component={Link} to="/supervisor/report">
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to="/supervisor/manage" >
                        <ListItemIcon>
                            <PersonAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Users" />
                    </ListItem>
                </List>
            </Collapse>
           <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Request" />
      </ListItem> */}
        </div>
    );
};

