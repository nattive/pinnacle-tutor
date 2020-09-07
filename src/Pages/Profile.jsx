import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { connect } from 'react-redux'
import { useEffect } from "react";
import { me } from '../actions/authAction'
import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "fit-content",
    },
    avatar: {
        width: 60,
        height: 60,
    },
    name: {
        marginTop: theme.spacing(1),
    },
}));

const Profile = (props) => {
    const { className, ...rest } = props;
   
    
    const classes = useStyles();
    return (
        <div {...rest} className={clsx(classes.root, className)}>
            {
                props.user.id !== undefined ?
                    <>
                        <Avatar
                            alt={ props.user.name}
                            className={classes.avatar}
                            component={RouterLink}
                            src={props.tutor.image}
                            to="/profile"
                        />
                        <Typography className={classes.name} variant="h6">
                            {props.user.name}
                        </Typography>
                            <Typography variant='body2'>{props.user.account_type}</Typography>
                    </> : <Typography variant='body2'>Loading profile...</Typography>
            }

        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string,
};

const mapStateToProps = (state) => ({
    appIsLoading: state.loading.appIsLoading,
    loadingText: state.loading.loadingText,
    tutor: state.auth.tutor,
    user: state.auth.user,
    
});

const mapDispatchToProps = {
    me
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
