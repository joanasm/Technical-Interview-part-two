import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(1)
  }
}));

const UserPost = (props) => {
  const classes = useStyles();
  const { post } = props;

  console.log('RENDERING POST'); //TODO - remove console.log
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" color="primary">
          {post.title}{' '}
        </Typography>
        <Typography> {post.body} </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(
  UserPost,
  (prevProps, nextProps) => nextProps.post === prevProps.post
);
