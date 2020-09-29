import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardView from './DashboardView';
import { getActivities } from "../../actions/indexActon";
import { getAllCourses, myDiscounts} from "../../actions/courseAction";

class DashboardClass extends React.Component {
       
    componentDidMount(){
        this.props.getAllCourses()
        this.props.myDiscounts();
    }

    render() {
        return (
            <DashboardView {...this.props} />
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        
    };
}

export default connect(mapStateToProps, { myDiscounts, getAllCourses })(
  DashboardClass
);
