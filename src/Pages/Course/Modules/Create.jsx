import React, { Component } from 'react'
import { connect } from 'react-redux'

class Create extends Component {
    constructor(){
        this.state = {
            module: {},
            title: "",
            moduleId: "",
            text: "",
            quiz: "",
            objective: "",
            description: "",
            prerequisite: "",
            videoLink: "",
            media: "",
            video: "",
            images: "",
            hasError: {}
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
