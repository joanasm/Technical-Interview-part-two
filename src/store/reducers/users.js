import * as actionTypes from '../actions/actionTypes';

const initialState = {
  users: null,
  fetchUsersInProgress: false,
  fetchUsersError: false
};

//Fetch Users
const onFetchUsersFulfilled = (state, action) => {
  const { users } = action.payload;
  const usersMap = users.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});
  return {
    ...state,
    fetchUsersInProgress: false,
    users: usersMap
  };
};

const onFetchUsersPending = (state, action) => {
  return {
    ...state,
    fetchUsersInProgress: true,
    fetchUsersError: false
  };
};

const onFetchUsersError = (state, action) => {
  return {
    ...state,
    fetchUsersInProgress: false,
    fetchUsersError: true
  };
};

//Fetch user posts
const onFetchUserPostsFulfilled = (state, action) => {
  const { userId, posts } = action.payload;
  const user = state.users[userId];
  const updatedUser = {
    ...user,
    posts,
    loadingState: {
      ...user.loadingState,
      fetchPostsInProgress: false
    }
  };
  return {
    ...state,
    users: {
      ...state.users,
      [userId]: updatedUser
    }
  };
};

const onFetchUserPostsPending = (state, action) => {
  const { userId } = action.payload;
  const user = state.users[userId];
  const updatedUser = {
    ...user,
    loadingState: {
      ...user.loadingState,
      fetchPostsInProgress: true,
      fetchPostsError: false
    }
  };
  return {
    ...state,
    users: {
      ...state.users,
      [userId]: updatedUser
    }
  };
};

const onFetchUserPostsError = (state, action) => {
  const { userId } = action.payload;
  const user = state.users[userId];
  const updatedUser = {
    ...user,
    loadingState: {
      ...user.loadingState,
      fetchPostsInProgress: false,
      fetchPostsError: true
    }
  };
  return {
    ...state,
    users: {
      ...state.users,
      [userId]: updatedUser
    }
  };
};

//Edit user
const onEditUser = (state, action) => {
  const { userId } = action.payload;
  const user = state.users[userId];

  //create temp user object to store user changes
  const updatedUser = {
    ...user,
    address: { ...user.address },
    company: { ...user.company },
    posts: undefined, //TODO: review
    loadingState: undefined //TODO: review
  };

  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...state.users[userId],
        updatedUser
      }
    }
  };
};

const onEditUserCancel = (state, action) => {
  const { userId } = action.payload;
  return {
    ...state,
    users: {
      ...state.users,
      [userId]: {
        ...state.users[userId],
        updatedUser: null
      }
    }
  };
};

//Update user
const onSaveUserFulfilled = (state, action) => {
  const { user } = action.payload;
  const updatedUser = {
    ...state.users[user.id],
    ...user,
    updatedUser: null,
    loadingState: {
      ...state.users[user.id].loadingState,
      saveUserInProgress: false
    }
  };

  return {
    ...state,
    users: {
      ...state.users,
      [user.id]: updatedUser
    }
  };
};

const onSaveUserPending = (state, action) => {
  const { userId } = action.payload;
  const user = state.users[userId];
  const updatedUser = {
    ...user,
    loadingState: {
      ...user.loadingState,
      saveUserInProgress: true,
      saveUserError: false
    }
  };
  return {
    ...state,
    users: {
      ...state.users,
      [userId]: updatedUser
    }
  };
};

const onSaveUserRejected = (state, action) => {
  const { userId } = action.payload;
  const user = state.users[userId];
  const updatedUser = {
    ...user,
    loadingState: {
      ...user.loadingState,
      saveUserInProgress: false,
      saveUserError: true
    }
  };
  return {
    ...state,
    users: {
      ...state.users,
      [userId]: updatedUser
    }
  };
};

//Update user field
const onUpdateUserField = (state, action) => {
  const { userId, field, value, parent } = action.payload;
  const updatedUser = {
    ...state.users[userId].updatedUser
  };
  if (parent) {
    updatedUser[parent] = {
      ...updatedUser[parent],
      [field]: value
    };
  } else {
    updatedUser[field] = value;
  }
  console.log(111, userId, field, value, parent);
  const updatedUsers = {
    ...state.users,
    [userId]: {
      ...state.users[userId],
      updatedUser
    }
  };
  return {
    ...state,
    users: updatedUsers
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_FIELD:
      return onUpdateUserField(state, action);
    //edit user
    case actionTypes.EDIT_USER:
      return onEditUser(state, action);
    case actionTypes.EDIT_USER_CANCEL:
      return onEditUserCancel(state, action);
    //fetch user posts
    case actionTypes.FETCH_USER_POSTS_PENDING:
      return onFetchUserPostsPending(state, action);
    case actionTypes.FETCH_USER_POSTS_FULFILLED:
      return onFetchUserPostsFulfilled(state, action);
    case actionTypes.FETCH_USER_POSTS_REJECTED:
      return onFetchUserPostsError(state, action);
    //save user
    case actionTypes.SAVE_USER_PENDING:
      return onSaveUserPending(state, action);
    case actionTypes.SAVE_USER_FULFILLED:
      return onSaveUserFulfilled(state, action);
    case actionTypes.SAVE_USER_REJECTED:
      return onSaveUserRejected(state, action);
    //fetch users
    case actionTypes.FETCH_USERS_PENDING:
      return onFetchUsersPending(state, action);
    case actionTypes.FETCH_USERS_FULFILLED:
      return onFetchUsersFulfilled(state, action);
    case actionTypes.FETCH_USERS_REJECTED:
      return onFetchUsersError(state, action);
    default:
      return state;
  }
};

export default reducer;
