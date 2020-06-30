import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'



class TweetPage extends Component {
    render() {
        console.log(this.props)

        const { id, replies } = this.props

        return (
            <div>
                <Tweet id={id}></Tweet>
                <NewTweet id={id}></NewTweet>
                {replies.length !== 0 && (
                    <div>
                        <h3 className='center'>Replies</h3>
                        <ul>
                            {
                                replies.map((replyId) => (
                                    <li key={replyId} >
                                        <Tweet id={replyId}></Tweet>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, tweets, users }, props) => {
    const { id } = props.match.params

    return {
        id,
        replies: !tweets[id]
            ? []
            : tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(TweetPage)