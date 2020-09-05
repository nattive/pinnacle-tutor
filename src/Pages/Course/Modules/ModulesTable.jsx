import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { connect, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { SHOW_COURSE_EDIT_PANEL } from '../../../actions/types';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const dispatch = useDispatch()
    const { module } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const { url } = useRouteMatch()
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{module.id}</TableCell>
                <TableCell align="right">{module.title}</TableCell>
                <TableCell align="right">{module.CourseModule ? module.CourseModule.length : 0}</TableCell>
                <TableCell align="right"><Button onClick={() => dispatch({ type: SHOW_COURSE_EDIT_PANEL, payload: {
                    show: true,
                    ...module
                }})} >Edit Module Header</Button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Modules Materials
              </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Course Module Title</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {module.course_materials && module.course_materials.length > 0 ? module.course_materials.map(material => (
                                        <TableRow key={material.id}>
                                            <TableCell component="th" scope="row">
                                                {material.id}
                                            </TableCell>
                                            <TableCell>{material.title}</TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right">
                                                <ButtonGroup>
                                                    <Button variant='outlined' color='primary'>Edit</Button>
                                                    <Button variant='contained' color="primary" component={Link} to={`${url}/quiz/${material.id}`}>Add Quiz</Button>
                                                    <Button variant='contained' color="secondary">Delete</Button>
                                                </ButtonGroup>
                                                </TableCell>
                                        </TableRow>
                                    )) :
                                        <TableCell colSpan={4}><Typography variant='body1'>You are yet to upload a material</Typography></TableCell>
                                    } </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function ModulesTable(props) {
    const { modules } = props.course
    const { url } = useRouteMatch()
    return (
        <>
            {module &&
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Modules</TableCell>
                                <TableCell align="right">Total Courses</TableCell>
                                <TableCell><Button component={Link} to={`${url}/create`}>Add Courses Materials to Module</Button></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {modules && modules.map((module) => (
                                <Row key={module.name} module={module} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
        </>
    );
}
const mapStateToProps = (state) => ({
    course: state.course.course,
    hasCreatedModule: state.course.hasCreatedModule,
    isCreating: state.course.isCreating,
    isGettingCourse: state.course.isGettingCourse,
    errorGettingModule: state.course.errorGettingModule
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ModulesTable)

