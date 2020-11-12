import { postsDB } from '../firebase'
export const FETCH_POSTS = 'FETCH_POSTS';

export const addPost = (newPost) => async dispatch => {
  postsDB.push().set(newPost);
};

export const removePost = (removePost) => async dispatch => {
  postsDB.child(removePost).remove();
};

export const fetchPosts = () => async dispatch => {
  postsDB.on("value", snapshot => {
    dispatch({
      type: FETCH_POSTS,
      payload: snapshot.val()
    });
  });
};