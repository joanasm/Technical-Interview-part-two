import * as actionTypes from './actionTypes';
import { UsersApi } from '../../api/apiUsers';

//Fetch Users
const fetchUsersPending = () => {
  return {
    type: actionTypes.FETCH_USERS_PENDING
  };
};

const fetchUsersFulfilled = (data) => {
  return {
    type: actionTypes.FETCH_USERS_FULFILLED,
    payload: { users: data }
  };
};

const fetchUsersRejected = (error) => {
  return {
    type: actionTypes.FETCH_USERS_REJECTED,
    payload: { error: error }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersPending());
    const response = await UsersApi.getUsers();
    if (response && !response.error) {
      dispatch(fetchUsersFulfilled(response));
    } else {
      dispatch(fetchUsersRejected(response.errorMessage));
    }
  };
};

//Fetch User Posts
const fetchUserPostsPending = (userId) => {
  return {
    type: actionTypes.FETCH_USER_POSTS_PENDING,
    payload: { userId: userId }
  };
};

const fetchUserPostsFulfilled = (userId, data) => {
  return {
    type: actionTypes.FETCH_USER_POSTS_FULFILLED,
    payload: { userId: userId, posts: data }
  };
};

const fetchUserPostsRejected = (userId, error) => {
  return {
    type: actionTypes.FETCH_USER_POSTS_REJECTED,
    payload: { userId: userId, error: error }
  };
};

export const fetchUserPosts = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUserPostsPending(userId));
    const response = await UsersApi.getUserPosts(userId);
    if (response && !response.error) {
      dispatch(fetchUserPostsFulfilled(userId, response));
    } else {
      dispatch(fetchUserPostsRejected(userId, response.errorMessage));
    }
  };
};

//Edit User
export const editUser = (userId) => {
  return {
    type: actionTypes.EDIT_USER,
    payload: { userId: userId }
  };
};

export const editUserCancel = (userId) => {
  return {
    type: actionTypes.EDIT_USER_CANCEL,
    payload: { userId: userId }
  };
};

//Save User
const saveUserPending = (userId) => {
  return {
    type: actionTypes.SAVE_USER_PENDING,
    payload: { userId: userId }
  };
};

const saveUserFulfilled = (user) => {
  return {
    type: actionTypes.SAVE_USER_FULFILLED,
    payload: { user: user }
  };
};

const saveUserRejected = (userId, error) => {
  return {
    type: actionTypes.SAVE_USER_REJECTED,
    payload: { userId: userId, error: error }
  };
};

export const saveUser = (user) => {
  return async (dispatch) => {
    dispatch(saveUserPending(user.id));
    const response = await UsersApi.updateUser(user);
    if (response && !response.error) {
      dispatch(saveUserFulfilled(response));
    } else {
      dispatch(saveUserRejected(user.id, response.errorMessage));
    }
  };
};

//Update user field
export const updateUserField = (fieldData) => {
  return (dispatch) =>
    dispatch({
      type: actionTypes.UPDATE_USER_FIELD,
      payload: {
        userId: fieldData.userId,
        field: fieldData.field,
        value: fieldData.value,
        parent: fieldData.parent
      }
    });
};
