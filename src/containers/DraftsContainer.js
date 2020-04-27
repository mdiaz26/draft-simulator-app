import React from 'react'
import { connect } from 'react-redux'
// import Draft from '../components/Draft'
import { Redirect } from "react-router-dom"


class DraftsContainer extends React.Component {

    state = {
        redirect: ''
    }

    redirectToDraftDetails = (event) => {
        // event.persist()
        // console.log(event.target)
        this.setState({
            redirect: `/draft/${event.target.id}`
        })
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <div>
                <h1>Drafts Container</h1>
                {this.props.drafts.map(draft =>
                    <div key={draft.id} id={draft.id} onClick={this.redirectToDraftDetails}>
                        Draft {draft.id} - {draft.name}
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        drafts: state.drafts.drafts
    }
}

export default connect(mapStateToProps)(DraftsContainer)