import React from 'react'
import { connect } from 'react-redux'
import Draft from '../components/Draft'


class DraftsContainer extends React.Component {
    
    componentDidMount(){
        
    }

    render(){
        return (
            <div>
                <h1>Drafts Container</h1>
                {this.props.drafts.map(draft => 
                    <Draft key={draft.id} draft={draft}/>)}
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