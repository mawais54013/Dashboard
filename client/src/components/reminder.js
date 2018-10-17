import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import API from "../utils/API";
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 10,
        right: theme.spacing.unit * 10,
    },
});

class Reminder extends Component {

    state = {
        open: false,
        reminders: [],
        remain: "",
    };

    componentDidMount() {
        this.loadReminders();
        setInterval(
            () => this.setState({ date: new Date() }),
            1000
        );
    };

    loadReminders = () => {
        API.getReminders()
            .then(res => {
                console.log(res, "hey this is the response");
                this.setState({ reminders: [res.data[0].reminder], remain: "" })
            })
            .catch(err => console.log(err));
            console.log(this.state.reminders);
            console.log(this.state.reminders.length);
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    setReminder = event => {
        console.log("tester");
        if (this.state.reminder) {
            API.saveReminder({
                reminder: this.state.reminder,
            })
                .then(res => this.loadReminders())
                .catch(err => console.log(err));
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    onChange = date => this.setState({ date })

    render() {

        return (
            <React.Fragment>
                <CssBaseline />
                <MuiThemeProvider>
                    <form id="myForm">
                        <Paper style={{ width: '90%', leftMargin: '15px' }} zDepth={1}>
                            <div
                                style={{ marginLeft: '10px' }}
                            >
                                <TextField
                                    value={this.state.reminder}
                                    onChange={this.handleInputChange}
                                    placeholder="What needs to be done?"
                                    name="reminder"
                                    fullWidth={true}
                                // onChange={(e) => this.setState({ inputValue: e.target.value })}
                                >
                                </TextField>
                            </div>
                            <div>
                                <h2>Reminders on my list</h2>

                                {/* {this.state.reminders.reminder} */}

                                <div>
                                {this.state.reminders.reminder}
                                {/* <Button>Delete</Button> <Button>Checked</Button> */}
                                    {this.state.reminders.length ? (
                                        <List>
                                            {this.state.reminders.map(elem => (
                                                <ListItem>
                                                    {elem}
                                                    <Button>Delete</Button>
                                                </ListItem>
                                            ))}
                                            {/* {this.state.reminders.map((number) =>
                                                    {
                                                        <ListItem>
                                                            {number.reminder}
                                                        </ListItem>
                                                    }
                                                )
                                            } */}
                                        </List>
                                    ) : (
                                            <h3>No Results to Display</h3>
                                        )}

                                </div>

                            </div>
                        </Paper>
                        <br />
                        <Button
                            disabled={!(this.state.reminder)}
                            onClick={() => this.setReminder()}>
                            Set Reminder</Button>
                    </form>
                </MuiThemeProvider>
            </React.Fragment>
        )
    }

}
export default withStyles(styles)(Reminder);