import { APIUrls } from "../helpers/urls";
import { getAuthTokenFromLocalStorage, getFormBody } from "../helpers/utils";
import {
  ADD_COMMENT,
  ADD_POST,
  UPDATE_POSTS,
  ADD_POST_LIKE,
  REMOVE_POST_LIKE,
} from "./actionTypes";

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function addPostLikeToStore(postId, userId) {
  return {
    type: ADD_POST_LIKE,
    postId,
    userId,
  };
}

export function removePostLikeToStore(postId, userId) {
  return {
    type: REMOVE_POST_LIKE,
    postId,
    userId,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}

export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addLike(id, likeType, userId) {
  return (dispatch) => {
    const url = APIUrls.toggleLike(id, likeType);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && !data.data.deleted) {
          dispatch(addPostLikeToStore(id, userId));
        } else {
          dispatch(removePostLikeToStore(id, userId));
        }
      });
  };
}
