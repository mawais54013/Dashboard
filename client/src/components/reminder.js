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
import axios from "axios";

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

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete(data) {
        
        console.log("tester")
        console.log(data)
        // API.deleteReminder(data)
        //     .then(console.log("Deleted"))
        //     .catch(err => console.log(err))
    }
    state = {
        open: false,
        reminders: [],
        deletedReminders: [],
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
                this.setState({ reminders: res.data })
            }).then(
                console.log(this.state.reminders))
            .catch(err => console.log(err));
            
            // console.log(this.state.reminders.length);
    };

    deleteIt = (data) => {
        console.log(data)
        API.deleteReminder(data)
            .then(console.log("Deleted"))
            .catch(err => console.log(err))
            window.location.reload();
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
        console.log(this.state.reminders)
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
                                
                                    onChange={this.handleInputChange}
                                    placeholder="What needs to be done?"
                                    name="reminder"
                                    fullWidth={true}
                                >
                                </TextField>
                            </div>
                            <div>
                                <h2>Reminders on my list</h2>

                            

                                <div>
                                {/* {this.state.reminders.reminder} */}
                               
                                    {this.state.reminders.length ? (
                                        <List>
                                            {this.state.reminders.map(elem => (
                                                <ListItem>
                                                    {elem.reminder}
                                                    {/* <Button onClick={this.delete(elem._id)}>Delete</Button> */}
                                                    <Button onClick={()=>this.deleteIt(elem._id)}>Delete</Button>
                                                </ListItem>
                                            ))}
                                          
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