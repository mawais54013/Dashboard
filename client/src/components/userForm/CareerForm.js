import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

class CareerForm extends React.Component {
    state = {
        interest: {
          
        }
    };
    
    handleCheck = () => {
        console.log(this.state.interest);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        let interest = this.state.interest;
        interest[name] = value;
        this.setState({ interest: interest });
        console.log(this.state.interest);
    }
    
    render () {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
        Please Type Your Career Interest Here
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="interests"
              name="interests"
              label="List Here"
              fullWidth
              value = {this.state.name}
              autoComplete="Lname"
              onChange={this.handleInputChange}
            />
            {this.handleCheck}
          </Grid>
           
        </Grid>
      </React.Fragment>
    );
    }
  }

export default CareerForm;