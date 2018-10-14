import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RegisterIcon from '@material-ui/icons/HowToReg';
import LockIcon from '@material-ui/icons/Input';
import SendIcon from '@material-ui/icons/Send';
import HomeIcon from '@material-ui/icons/Home';
import TestIcon from '@material-ui/icons/BugReport';
import WeatherIcon from '@material-ui/icons/WbSunny';
import ReminderIcon from '@material-ui/icons/AddAlert';
import EventIcon from '@material-ui/icons/EventAvailable';
import NewsIcon from '@material-ui/icons/FormatIndentIncrease';
import HackerJobsIcon from '@material-ui/icons/LaptopMac';
import GithubJobsIcon from '@material-ui/icons/DeveloperBoard';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100vh' ,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing.unit * 8,
    overflow: 'auto',
    padding: theme.spacing.unit * 3,
    
  },
});

class MenuAppBar extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>

            <Link to="/dash">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>

            {/* Weather */}
            <Link to="/weather">
              <ListItem button>
                <ListItemIcon>
                  <WeatherIcon />
                </ListItemIcon>
                <ListItemText primary="Weather" />
              </ListItem>
            </Link>

            {/* Reminders */}
            <Link to="/reminders">
              <ListItem button>
                <ListItemIcon>
                  <ReminderIcon />
                </ListItemIcon>
                <ListItemText primary="Reminders" />
              </ListItem>
            </Link>

            {/* Events */}
            <Link to="/events">
              <ListItem button>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Local Events" />
              </ListItem>
            </Link>

            {/* Hacker News */}
            <Link to="/news">
              <ListItem button>
                <ListItemIcon>
                  <NewsIcon />
                </ListItemIcon>
                <ListItemText primary="Hacker News" />
              </ListItem>
            </Link>

            {/* Hacker Jobs */}
            <Link to="/hackerJobs">
              <ListItem button>
                <ListItemIcon>
                  <HackerJobsIcon />
                </ListItemIcon>
                <ListItemText primary="Hacker Jobs" />
              </ListItem>
            </Link>

            {/* GitHub Jobs */}
            <Link to="/gitJobs">
              <ListItem button>
                <ListItemIcon>
                  <GithubJobsIcon />
                </ListItemIcon>
                <ListItemText primary="Github Jobs" />
              </ListItem>
            </Link>


          </List>
          <Divider />
          <List>
            {this.props.authenticated ?
              (<>
                <Link to="signin">
                  <ListItem button onClick={this.props.handleLogout}>
                    <ListItemIcon>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </Link>
              </>) : (<>
                <Link to="/register">
                  <ListItem button>
                    <ListItemIcon>
                      <RegisterIcon />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItem>
                </Link>
                <Link to="/signin">
                  <ListItem button>
                    <ListItemIcon>
                      <LockIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign In" />
                  </ListItem>
                </Link>
              </>)}

            <Link to="/test">
              <ListItem button>
                <ListItemIcon>
                  <TestIcon />
                </ListItemIcon>
                <ListItemText primary="Testing Login..." />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <main className={classes.content}>

          {this.props.children}
        </main>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MenuAppBar);