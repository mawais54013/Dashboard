import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class NameForm extends React.Component {
    state = {
        user: {
          
        }
    };
    
    handleCheck = () => {
        console.log(this.state.user);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        let user = this.state.user;
        user[name] = value;
        this.setState({ user: user });
        console.log(this.state.user);
    }
    
    render () {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Your Name
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Your Name Here"
              fullWidth
              value = {this.state.name}
              autoComplete="fname"
              onChange={this.handleInputChange}
            />
            {this.handleCheck}
          </Grid>
           
        </Grid>
      </React.Fragment>
    );
    }
  }

export default NameForm;