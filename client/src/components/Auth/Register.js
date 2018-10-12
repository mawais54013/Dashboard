import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RegisterIcon from '@material-ui/icons/HowToReg';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from "axios";

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Register extends Component {
  state = {
    user: {
      username: "",
      password: "",
      confirmPassword: ""
    },
    error: {
      username: "",
      password: "",
      confirmPassword: ""
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let error = {};
    console.log(this.state.user);
    if (!this.state.user.username) {
      error.username = "Username cannot be blank";
    }
    //other input checks here...


    else {
      //send to server...
      axios.post("/auth/register", this.state.user).then(res => {
        if (res.status === 200) {
          axios.post("/auth/login", this.state.user).then(res => {
            if (res.status === 200) {
              this.props.history.push("/userForm");
            }
          })
        }
      });
    }
    this.setState({ error: error });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    let user = this.state.user;
    user[name] = value;
    if (this.state.error[name]) {
      let error = this.state.error;
      error[name] = "";
      this.setState({ error: error });
    }

    this.setState({ user: user });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <RegisterIcon />
            </Avatar>
            <Typography variant="headline">Register</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" name="username" autoComplete="username" error={this.state.error.username} autoFocus onChange={this.handleInputChange} />
                {this.state.error.username ? (<FormHelperText error>{this.state.error.username}</FormHelperText>) : (null)}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  onChange={this.handleInputChange}
                />
                {this.state.error.password ? (<FormHelperText error>{this.state.error.password}</FormHelperText>) : (null)}
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  onChange={this.handleInputChange}
                />
                {this.state.error.confirmPassword ? (<FormHelperText error>{this.state.error.confirmPassword}</FormHelperText>) : (null)}
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={this.handleFormSubmit}
              ><Link to="/userForm"></Link>
                Register
            </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);