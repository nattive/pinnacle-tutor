import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardView from './DashboardView';

class DashboardClass extends React.Component {
       

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

export default connect(mapStateToProps)(DashboardClass);
