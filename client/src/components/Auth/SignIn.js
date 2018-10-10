import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import LockIcon from '@material-ui/icons/LockOutlined';
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
        marginTop: theme.spacing.unit * 8,
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

class SignIn extends Component {
    state = {
        user: {
            username: "",
            password: ""
        },
        error: {
            username: "",
            password: ""
        }
    }

    componentWillMount() {
        if (this.props.authenticated) {
            this.props.history.push("/dash");
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();
        let error = {};
        if (!this.state.user.username) {
            error.username = "Please enter a username";
        }
        //other error checks here...
        else {
            axios.post("/auth/login", this.state.user).then(res => {
                if (res.status === 200) {
                    axios.get("/auth/login").then(res => {
                        // console.log(res.data.user._id);
                        this.props.login(res.data.user._id);
                        console.log(this.props)
                        this.props.history.push("/dash");
                    })
                }
            })
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
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Sign in</Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" name="username" autoComplete="username" autoFocus error={this.state.error.username} onChange={this.handleInputChange} />
                                {this.state.error.username ? (<FormHelperText error>{this.state.error.username}</FormHelperText>) : (null)}
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleInputChange}
                                />
                                {this.state.error.password ? (<FormHelperText error>{this.state.error.password}</FormHelperText>) : (null)}
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                                onClick={this.handleFormSubmit}
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
