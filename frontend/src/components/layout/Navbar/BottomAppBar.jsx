import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#000000',
    boxShadow: '0px -1px 3px rgba(0, 0, 0, 0.1)', // Add a shadow to the app bar,
    borderRadius: '13px 13px 0px 0px',
    height:"50px"
  },
  toolbar: {
    justifyContent: 'center',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    // color: '#333', // Customize the text color
    fontWeight: 'bold',
  },
  cartIcon: {
    marginRight: theme.spacing(1),
    // color: '#333', // Customize the icon color
  },
}));

function BottomAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          My Ecommerce Project
        </Typography>
        <ShoppingCartIcon className={classes.cartIcon} />
      </Toolbar>
    </AppBar>
  );
}

export default BottomAppBar;
