import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CourseView from './CourseView.jsx';

class CourseClass extends React.Component {
    constructor(props, context) {
        super(props, context);
        
    }

    render() {
        return (
            <CourseView />
        );
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
