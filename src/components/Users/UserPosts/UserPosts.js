import React, { memo, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, IconButton } from '@material-ui/core';
import ExpandIcon from '@material-ui/icons/ExpandMore';

import UserPost from './UserPost';
import Loader from '../../UI/Loader';
import Alert from '../../UI/Alert';

const useStyles = makeStyles((theme) => ({
  postsContainer: {
    width: '100%'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  loader: {
    marginTop: `-${theme.spacing(6)}px`
  }
}));

const UserPosts = (props) => {
  const classes = useStyles();
  const { posts, loading, error } = props;

  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // console.log('RENDERING POSTS');
  return (
    <div className={classes.postsContainer}>
      {loading && <Loader className={classes.loader} />}
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
