/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useState,useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Typography,
  ListItemIcon,
  Divider,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from "next/router";
import { Context } from "../../../../../../../context";
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  navLink: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  closeIcon: {
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    marginRight: theme.spacing(8),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
  divider: {
    width: '100%',
  },
}));

const SidebarNav = props => {
  const { pages, onClose, className, ...rest } = props;
  const classes = useStyles();


  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    router.push("/login");
  };

  let logoutButton;
  if (!user ) {
     logoutButton=null
   } else {
     logoutButton = <Button
      variant="outlined"
      component="a"
      onClick={logout}
     >
       Logout
     </Button>
   }

   let loginButton;
   if (user) {
      loginButton = null
    } else {
      loginButton = <Button
        variant="outlined"
        component="a"
        href="/login"
      >
        Login
      </Button>
    }

    let predictButton;
    if (!user ) {
       predictButton=null
     } else {
       predictButton = <Button
        variant="outlined"
        component="a"
        href="/user"
       >
         Predict
       </Button>
     }

     let registerButton;
     if (user) {
        registerButton = null
      } else {
        registerButton = <Button
          variant="outlined"
          component="a"
          href="/register"
        >
          Register
        </Button>
      }



  const MenuGroup = props => {
    const { item } = props;
    return (
      <List disablePadding>
        <ListItem disableGutters>
          <Typography
            variant="body2"
            color="primary"
            className={classes.menuGroupTitle}
          >
            {item.groupTitle}
          </Typography>
        </ListItem>
        {item.pages.map((page, i) => (
          <ListItem disableGutters key={i} className={classes.menuGroupItem}>
            <Typography
              variant="body2"
              component={'a'}
              href={page.href}
              className={clsx(classes.navLink, 'submenu-item')}
              color="textPrimary"
              onClick={() => onClose()}
            >
              {page.title}
            </Typography>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      <ListItem className={classes.closeIcon} onClick={() => onClose()}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
      </ListItem>
      <ListItem className={classes.listItem}>
      {loginButton}
      </ListItem>
      <ListItem className={classes.listItem}>
        <Divider className={classes.divider} />
      </ListItem>
      <ListItem className={classes.listItem}>
      {registerButton}
      </ListItem>
      <ListItem className={classes.listItem}>
      {predictButton}
      </ListItem>
      <ListItem className={classes.listItem}>
        <Divider className={classes.divider} />
      </ListItem>
      <ListItem className={classes.listItem}>
      {logoutButton}
      </ListItem>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default SidebarNav;
