import React from 'react'
// import { Redirect } from "react-router-dom"


class Draft extends React.Component {

    render() {
        return(
            <div>
                <h1>Draft {this.props.draft.id} - {this.props.draft.name}</h1>
            </div>
        )
    }
}

export default Draft