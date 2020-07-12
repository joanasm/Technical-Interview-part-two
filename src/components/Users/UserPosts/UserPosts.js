import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({}));

const UserPosts = (props) => {
  const classes = useStyles();
  const { posts, loading, error } = props;

  console.log('RENDERING POSTS'); //TODO - remove console.log
  return (
    <div>
      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error">
          Error getting user's posts! Please try again or reload the page.
        </Alert>
      )}
      {posts && posts.map((p, idx) => <div key={idx}>{JSON.stringify(p)}</div>)}
    </div>
  );
};

export default memo(
  UserPosts,
  (prevProps, nextProps) =>
    nextProps.posts === prevProps.posts &&
    nextProps.loading === prevProps.loading &&
    nextProps.error === prevProps.error
);
