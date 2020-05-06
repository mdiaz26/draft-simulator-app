import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import '../styles/DraftsContainer.css'
import { fetchDrafts } from '../JSONAPIAdapter'

class DraftsContainer extends React.Component {

    state = {
        redirect: ''
    }

    componentDidMount() {
        this.props.fetchDrafts()
    }

    redirectToDraftDetails = (event) => {
        this.setState({
            redirect: `/draft/${event.target.id}`
        })
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <div className='drafts-container'>
                <h1>Drafts Container</h1>
                {this.props.drafts.map(draft =>
                    <div key={draft.id} id={draft.id} onClick={this.redirectToDraftDetails}>
                        <strong>Draft {draft.id}</strong> - {draft.name}
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

const mapDispatchToProps = dispatch => {
    return {
        fetchDrafts: () => dispatch(fetchDrafts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftsContainer)