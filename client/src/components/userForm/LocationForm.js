import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class LocationForm extends React.Component {
    state = {
        location: {
          
        }
    };
    
    handleCheck = () => {
        console.log(this.state.location);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        let location = this.state.location;
        location[name] = value;
        this.setState({ location: location });
        console.log(this.state.location);
    }
    
    render () {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Location
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="locations"
              name="locations"
              label="ZipCode"
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

export default LocationForm;