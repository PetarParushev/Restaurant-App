import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  makeStyles,
  Drawer,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import KitchenIcon from '@material-ui/icons/Kitchen';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CategoryIcon from '@material-ui/icons/Category';
import { useState } from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import NavigationLink from '../../generic/NavigationLink';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { changeState } from '../../../store/slices/drawerSlice';
import { Link } from 'react-router-dom';
import { useHasRole } from '../../../hooks/useHasRoles';
import { Roles } from '../../../models/enums/roles';
import { useStyles } from './Navigation.styles';
import CustomDialog from '../../generic/CustomDialog';
import RegisterForm from './RegisterForm';


const Navigation: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const isAdmin = useHasRole([Roles.Admin]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDrawerButton = (isOpened: boolean) => {
    setDrawerOpen(isOpened);
    dispatch(changeState());
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  }
  const handleDialogClose = () => {
    setDialogOpen(false);
  }
  const links = [
    { name: 'Orders', icon: <KitchenIcon /> },
    { name: 'Tables', icon: <InboxIcon /> },
    { name: 'Menu', icon: <MenuBookIcon /> },
    { name: 'Users', icon: <GroupIcon /> },
    { name: 'Categories', icon: <CategoryIcon /> },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => handleDrawerButton(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <div className={classes.logout}>
                <SearchIcon />
                <NotificationsIcon />
                <Link to="/profile" className="color-white">
                  <PersonIcon />
                </Link>
              </div>
            </>
          ) : (
            <>
              <Button
                className={classes.logout}
                color="inherit"
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
              <Button color="inherit" onClick={handleDialogOpen}>Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => handleDrawerButton(false)}
      >
        <div className={`${classes.toolbar} color-white`}>
          <KeyboardBackspaceIcon
            className={classes.backButton}
            onClick={() => handleDrawerButton(false)}
          />
        </div>
        <div className={`${classes.drawer} color-white`}>
          {links.map((link) => (
            <NavigationLink key={link.name} name={link.name} icon={link.icon} />
          ))}
        </div>
      </Drawer>
      <CustomDialog 
      handleDialogClose={handleDialogClose}
      isDialogOpen={dialogOpen}
      title="Register"
      >
        <RegisterForm handleDialogClose={handleDialogClose} />
      </CustomDialog>
    </div>
  );
};

export default Navigation;
