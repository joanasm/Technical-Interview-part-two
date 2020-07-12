import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: '48px',
    [theme.breakpoints.up('sm')]: {
      minHeight: '56px'
    }
  }
}));

const NavigationBar = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" noWrap>
          Demo App for EGT Digital
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
