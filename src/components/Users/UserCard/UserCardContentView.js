import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Collapse,
  Typography,
  Avatar,
  Divider,
  IconButton
} from '@material-ui/core';
import {
  ForumOutlined as ForumIcon,
  EditOutlined as EditIcon,
  Phone as PhoneIcon,
  LocationOnOutlined as LocationIcon,
  EmailOutlined as EmailIcon,
  LanguageOutlined as WebsiteIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    }
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1)
    }
  },
  collapsibleSection: {
    width: '100%'
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  detailsRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'flex-start'
    }
  },
  detailsIcon: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1)
    }
  },
  cardActions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
}));

const UserCardContentView = (props) => {
  const classes = useStyles();

  const { user, expanded } = props;

  console.log('RENDERING USER VIEW'); //TODO - remove console.log
  return (
    <>
      <div className={classes.header}>
        <Avatar
          aria-label="avatar"
          alt={user.name}
          src="/assets/images/avatar.svg"
          className={classes.avatar}
        />
        <div>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="subtitle1" color="primary">
            {user.username}
          </Typography>
        </div>
      </div>
      <Collapse
        className={classes.collapsibleSection}
        in={expanded}
        timeout="auto"
      >
        <Divider className={classes.divider} />
        <div className={classes.detailsRow}>
          <div className={classes.detailsIcon}>
            <EmailIcon color="primary" />
          </div>
          <Typography>{user.email}</Typography>
        </div>
        <div className={classes.detailsRow}>
          <div className={classes.detailsIcon}>
            <LocationIcon color="primary" />
          </div>
          <Typography>
            {user.address.street +
              ', ' +
              user.address.suite +
              ', ' +
              user.address.city}
          </Typography>
        </div>
        <div className={classes.detailsRow}>
          <div className={classes.detailsIcon}>
            <PhoneIcon color="primary" />
          </div>
          <Typography>{user.phone}</Typography>
        </div>
        <div className={classes.detailsRow}>
          <div className={classes.detailsIcon}>
            <WebsiteIcon color="primary" />
          </div>
          <Typography>{user.website}</Typography>
        </div>
      </Collapse>
      <div className={classes.cardActions}>
        <IconButton
          onClick={() => props.edit(user.id)}
          aria-label="edit"
          title="Edit"
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => props.getPosts(user.id)}
          aria-label="get user's posts"
          title="Get user's posts"
          color="primary"
        >
          <ForumIcon />
        </IconButton>
      </div>
    </>
  );
};

export default UserCardContentView;
