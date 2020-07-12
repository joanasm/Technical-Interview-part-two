import React, { memo, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ExpandIcon from '@material-ui/icons/ExpandMore';

import UserPost from './UserPost';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

const UserPosts = (props) => {
  const classes = useStyles();
  const { posts, loading, error } = props;

  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  console.log('RENDERING POSTS'); //TODO - remove console.log
  return (
    <div>
      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error">
          Error getting user's posts! Please try again or reload the page.
        </Alert>
      )}
      {!loading && posts && (
        <>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={toggleExpand}
            aria-expanded={expanded}
            aria-label="show more"
            title="Show More"
          >
            <ExpandIcon />
          </IconButton>

          <Collapse in={expanded} timeout="auto">
            {posts.map((post) => (
              <UserPost key={post.id} post={post} />
            ))}
          </Collapse>
        </>
      )}
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
