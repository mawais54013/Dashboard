import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { withStyles } from '@material-ui/core';

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
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Test extends Component {

    handleLoginCheck = event => {
        event.preventDefault();
        axios.get("/auth/login").then(res => console.log(res));
    }

    handleLogout = event => {
        event.preventDefault();
        axios.get("auth/logout").then(res => console.log(res));
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <form className={classes.form}>
                            <Button type="submit" fullWidth variant="raised" color="secondary" className={classes.submit} onClick={this.handleLoginCheck}>Check Login</Button>
                            <Button type="submit" fullWidth variant="raised" color="default" className={classes.submit} onClick={this.handleLogout}>Logout</Button>
                        </form>
                    </Paper>
                </main>

            </React.Fragment>
        )
    }

}

Test.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Test);