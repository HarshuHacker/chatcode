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

// function mapStateToProps(state) {
//   return {
//     posts: state.posts,
//   };
// }

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

// export default connect(mapStateToProps)(Home);

export default Home;
