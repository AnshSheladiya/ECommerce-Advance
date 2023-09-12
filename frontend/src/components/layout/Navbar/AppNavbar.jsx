import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from 'material-ui-search-bar';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { fetchProductsAction, setSearchStringAction } from '../../../actions/actions';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';
import AdbIcon from '@mui/icons-material/Adb';
import useMediaQuery from '@material-ui/core/useMediaQuery'; 

function MobileAppNavbar({ toggleMobileMenu, mobileMenuOpen }) {
  const { t } = useTranslation();

  return (
    <AppBar position="static" style={{ backgroundColor: '#27005D' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
            LOGO
          </Link>
        </Typography>
        <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
          <List>
            <ListItem button component={Link} to="/categories">
              <ListItemText primary={t('navbar.categories')} />
            </ListItem>
            <ListItem button component={Link} to="/account">
              <ListItemText primary={t('navbar.account')} />
            </ListItem>
            <ListItem button component={Link} to="/logout">
              <ListItemText primary={t('navbar.logout')} />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

function DesktopAppNavbar() {
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();
  const pageSize = 16;
  const { t } = useTranslation();

  const handleSearch = (value) => {
    setSearchString(value);
    dispatch(setSearchStringAction(value));
    dispatch(fetchProductsAction(1, pageSize, value));
  };

  const handleSearchRequestClose = () => {
    handleSearch('');
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#27005D' }}>
      <Toolbar>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography variant="h6" noWrap>
          <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
            LOGO
          </Link>
        </Typography>
        <Typography variant="h6" noWrap>
          <Link to="/categories" style={{ textDecoration: 'none', color: 'white', marginLeft: '50px', fontSize: '16px' }}>
            {t('navbar.categories')}
          </Link>
        </Typography>
        <SearchBar
          value={searchString}
          onChange={(newValue) => handleSearch(newValue)}
          onRequestSearch={() => handleSearch(searchString)}
          onCancelSearch={handleSearchRequestClose}
          placeholder={t('productList.searchbar')}
          className="search-box"
          style={{ marginLeft: '50px' }}
        />
        <Typography variant="h6" noWrap>
          <Link to="/account" style={{ textDecoration: 'none', color: 'white', marginLeft: '50px', fontSize: '16px' }}>
            {t('navbar.account')}
          </Link>
        </Typography>
        <Typography variant="h6" noWrap>
          <Link to="/logout" style={{ textDecoration: 'none', color: 'white', marginLeft: '40px', fontSize: '16px' }}>
            {t('navbar.logout')}
          </Link>
        </Typography>
        <Box style={{ marginLeft: '40px' }}>
          <LanguageDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function AppNavbar() {
  const isMobile = useMediaQuery('(max-width:750px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {isMobile ? (
        <MobileAppNavbar toggleMobileMenu={toggleMobileMenu} mobileMenuOpen={mobileMenuOpen} />
      ) : (
        <DesktopAppNavbar />
      )}
    </>
  );
}

export default AppNavbar;
