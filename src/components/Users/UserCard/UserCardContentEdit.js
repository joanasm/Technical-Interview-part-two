import React, { memo, useState } from 'react';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, Avatar, Divider, IconButton } from '@material-ui/core';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  ForumOutlined as ForumIcon,
  LocationOnOutlined as LocationIcon,
  EmailOutlined as EmailIcon,
  LanguageOutlined as WebsiteIcon,
  Phone as PhoneIcon
} from '@material-ui/icons';

import MemoTextField from '../../UI/MemoTextField';

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
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2)
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
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: theme.spacing(2)
    }
  },
  detailsIcon: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1)
    }
  },
  inputField: {
    width: '100%',
    marginBottom: theme.spacing(1.5)
  },
  inputFieldHeader: {
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    }
  },
  address: {
    width: '100%'
  },
  cardActions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
}));

const validationSchema = yup.object().shape({
  name: yup.string().required('Please enter valid name'),
  username: yup
    .string()
    .required('Please enter valid username')
    .test(function (value) {
      return value.match(/^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/)
        ? true
        : this.createError({
            message: 'Please enter valid username',
            path: 'username'
          });
    }),
  email: yup
    .string()
    .email('Please enter valid e-mail')
    .required('Please enter valid e-mail'),
  phone: yup.string().test(function (value) {
    return value.match(
      /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}([-\s.]?[0-9]{3,6})?([-\s.][x][0-9]{1,5})?$/i
    )
      ? true
      : this.createError({
          message: 'Please enter valid phone',
          path: 'phone'
        });
  })
});

const UserCardContentEdit = (props) => {
  const classes = useStyles();

  const { user, expanded } = props;
  const [errors, setErrors] = useState({});

  const changeHandler = (event) => {
    const id = event.target.id;
    props.updateField({
      userId: user.id,
      field: id,
      value: event.target.value,
      parent:
        id === 'street' || id === 'suite' || id === 'city' ? 'address' : null
    });
  };

  const saveHandler = () => {
    try {
      validationSchema.validateSync(user, {
        abortEarly: false
      });
      props.save(user);
    } catch (validationErrors) {
      const errorList = {};
      for (let error of validationErrors.inner) {
        errorList[error.path] = error.message;
      }
      setErrors(errorList);
    }
  };

  console.log('RENDERING USER EDIT'); //TODO - remove console.log
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
          <MemoTextField
            id="name"
            error={!!errors.name}
            required
            label="Name"
            placeholder="Name"
            size="small"
            variant="outlined"
            value={user.name}
            onChange={changeHandler}
            className={classes.inputField + ' ' + classes.inputFieldHeader}
            helperText={errors.name ? errors.name : ''}
          />
          <MemoTextField
            id="username"
            error={!!errors.username}
            required
            label="Username"
            placeholder="Username"
            size="small"
            variant="outlined"
            value={user.username}
            onChange={changeHandler}
            className={classes.inputField + ' ' + classes.inputFieldHeader}
            helperText={errors.username ? errors.username : ''}
          />
        </div>
      </div>
      <Collapse
        className={classes.collapsibleSection}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <Divider className={classes.divider} />
        <div className={classes.detailsRow}>
          <div className={classes.detailsIcon}>
            <EmailIcon color="primary" />
          </div>
          <MemoTextField
            id="email"
            error={!!errors.email}
            required
            label="E-mail"
            placeholder="E-mail"
            size="small"
            variant="outlined"
            value={user.email}
            onChange={changeHandler}
            className={classes.inputField}
            helperText={errors.email ? errors.email : ''}
          />
        </div>
        <div className={classes.detailsRow}>
          <div className={classes.detailsIcon}>
            <LocationIcon color="primary" />
          </div>
          <div className={classes.address}>
            <MemoTextField
              id="street"
              label="Street"
              placeholder="Street"
              size="small"
              variant="outlined"
              value={user.address.street}
              onChange={changeHandler}
              className={classes.inputField}
            />
            <MemoTextField
              id="suite"
              label="Suite"
              placeholder="Suite"
              size="small"
              variant="outlined"
              value={user.address.suite}
              onChange={changeHandler}
              className={classes.inputField}
            />
            <MemoTextField
              id="city"
              label="City"
              placeholder="City"
              size="small"
              variant="outlined"
              value={user.address.city}
              onChange={changeHandler}
              className={classes.inputField}
            />
          </div>
        </div>
        <div className={classes.detailsRow}>
          <div className={classes.detailsIcon}>
            <PhoneIcon color="primary" />
          </div>
          <MemoTextField
            id="phone"
            error={!!errors.phone}
            label="Phone"
            placeholder="Phone"
            size="small"
            variant="outlined"
            value={user.phone}
            onChange={changeHandler}
            className={classes.inputField}
            helperText={errors.phone ? errors.phone : ''}
          />
        </div>
        <div className={classes.detailsRow}>
          <div className={classes.detailsIcon}>
            <WebsiteIcon color="primary" />
          </div>
          <MemoTextField
            id="website"
            label="Website"
            placeholder="Website"
            size="small"
            variant="outlined"
            value={user.website}
            onChange={changeHandler}
            className={classes.inputField}
          />
        </div>
      </Collapse>
      <div className={classes.cardActions}>
        <IconButton
          onClick={saveHandler}
          aria-label="save"
          title="Save"
          color="primary"
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          onClick={() => props.cancel(user.id)}
          aria-label="cancel"
          title="Cancel"
          color="primary"
        >
          <CloseIcon />
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

export default memo(
  UserCardContentEdit,
  (prevProps, nextProps) =>
    nextProps.user === prevProps.user &&
    nextProps.expanded === prevProps.expanded
);
