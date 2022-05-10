import React, { Component } from "react";
import {PostsList, FriendsList} from "./"
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedin && <FriendsList friends={friends}/>}
      </div>
    );
  }
}

export default Home;
