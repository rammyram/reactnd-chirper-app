import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartFullOutline, TiHeartOutline, TiScissors } from 'react-icons/ti'
import {Link, withRouter} from 'react-router-dom'

import {handleToggleTweet} from '../actions/tweets'

class Tweet extends Component {
    toParent = (e, id) => {
        e.preventDefault()
        // todo : redired to parent tweet 
        // if tweet component is rendered by react router we can use passed prop history 
        // this.props.history.push(`/tweet/${id}`)
        // withRouter helps to pass all router props to tweet component so we can use history prop
        this.props.history.push(`/tweet/${id}`)
    }
    handleLike = (e) => {
        e.preventDefault()
        // todo : Handle Like Tweet 
        const { dispatch , tweet , authedUser } = this.props
        const info = { id:tweet.id ,hasLiked:tweet.hasLiked, authedUser }
        dispatch(handleToggleTweet(info))
    }
    render() {
        const { tweet } = this.props

        if (tweet === null) {
            return (
                <div>
                    This tweet does not exist
                </div>
            )
        }

        const { name, avatar, timestamp, text, hasLiked, likes, replies, id, parent } = tweet

        return (
            <Link to={`/tweet/${id}`} className='tweet' >
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                >
                </img>

                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon'></TiArrowBackOutline>
                        <span>{replies !== 0 && replies}</span>

                        <button className='heart-button' onClick={this.handleLike}>
                            {
                                hasLiked === true
                                    ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                                    : <TiHeartOutline className='tweet-icon' />
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({ tweets, users, authedUser }, { id }) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null
    return {
        authedUser,
        tweet: tweet
            ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
            : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))