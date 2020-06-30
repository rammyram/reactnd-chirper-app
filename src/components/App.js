import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import Nav from './Nav'



class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    console.log("App")
    return (
      <Router>
        <Fragment>
          <LoadingBar></LoadingBar>
          <div className='container'>
            <Nav></Nav>
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={Dashboard}></Route>
                <Route path='/tweet/:id' exact component={TweetPage}></Route>
                <Route path='/new' exact component={NewTweet}></Route>
              </div>

            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null ? true : false
  }
}

export default connect(mapStateToProps)(App)