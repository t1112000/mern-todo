import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get all posts
  const getPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/posts`);
      if (res.data.success)
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: res.data.posts });
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  //Add post
  const addPost = async (newPost) => {
    try {
      const res = await axios.post(`${apiUrl}/posts`, newPost);
      if (res.data.success)
        dispatch({ type: ADD_POST, payload: res.data.post });
      return res.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Find pst when user is updating post
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_POST, payload: post });
    return post;
  };

  //Delete post
  const deletePost = async (postId) => {
    try {
      const res = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (res.data.success) dispatch({ type: DELETE_POST, payload: postId });
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  //Update post
  const updatePost = async (updatedPost) => {
    try {
      const res = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (res.data.success) {
        dispatch({ type: UPDATE_POST, payload: res.data.post });
        return res.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  //Post context data
  const postContextData = {
    findPost,
    updatePost,
    deletePost,
    showToast,
    setShowToast,
    addPost,
    postState,
    getPosts,
    setShowAddPostModal,
    showAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
