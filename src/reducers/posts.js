import {
  ADD_COMMENT,
  ADD_POST,
  UPDATE_POSTS,
  UPDATE_POST_LIKE,
} from "../actions/actionTypes";

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;

    case ADD_POST:
      return [action.post, ...state];

    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPosts;

    case UPDATE_POST_LIKE:
      const UpdatedPosts = state.map((post) => {
        if (post._id === action.postId) {
          console.log("action : ", post);
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }
        return post;
      });
      return UpdatedPosts;

    default:
      return state;
  }
}
