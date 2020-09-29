import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CourseView from './CourseView.jsx';
import CourseRoutes from './CourseRoutes.jsx';

class CourseClass extends React.Component {
    /**
     * to delete
     */

    render() {
        return <CourseRoutes / >
    }
}

// CourseClass.propTypes = {

// };

// function mapStateToProps(state, ownProps) {
//     return {

//     };
// }

export default CourseClass;
// export default connect(mapStateToProps)(CourseClass);