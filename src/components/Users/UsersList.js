import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import UserCard from './UserCard/UserCard';
import Loader from '../UI/Loader';
import Alert from '../UI/Alert';
import * as actions from '../../store/actions/users';

const useStyles = makeStyles((theme) => ({
  usersList: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  },
  loader: {
    marginTop: '5%'
  },
  alert: {
    marginTop: '5%'
  }
}));

const UsersList = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users);
  const loading = useSelector((state) => state.fetchUsersInProgress);
  const error = useSelector((state) => state.fetchUsersError);

  const getUsers = useCallback(() => {
    dispatch(actions.fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const editUserHandler = (userId) => {
    dispatch(actions.editUser(userId));
  };

  const editUserCancelHandler = (userId) => {
    dispatch(actions.editUserCancel(userId));
  };

  const saveUserHandler = (user) => {
    dispatch(actions.saveUser(user));
  };

  const getUserPostsHandler = (userId) => {
    dispatch(actions.fetchUserPosts(userId));
  };

  const updateUserFieldHandler = (updatedFieldData) => {
    dispatch(actions.updateUserField(updatedFieldData));
  };

  let userList = null;
  if (!loading && !error && usersData) {
    userList = Object.keys(usersData).map((userId) => {
      return (
        <UserCard
          key={userId}
          user={usersData[userId]}
          editUser={editUserHandler}
          editUserCancel={editUserCancelHandler}
          saveUser={saveUserHandler}
          updateUserField={updateUserFieldHandler}
          getUserPosts={getUserPostsHandler}
        />
      );
    });
  }

  console.log('RENDERING USERS'); //TODO - remove console.log
  return (
    <div>
      {loading && <Loader className={classes.loader} />}
      {error && (
        <Alert severity="error" className={classes.alert}>
          Error getting users data! Please reload the page.
        </Alert>
      )}
      <div className={classes.usersList}>{userList}</div>
    </div>
  );
};

export default UsersList;
