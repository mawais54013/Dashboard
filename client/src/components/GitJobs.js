import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

// const styles = theme => ({
//     layout: {
//         width: 'auto',
//         display: 'block',
//     },
//     fab: {
//         position: 'absolute',
//         bottom: theme.spacing.unit * 10,
//         right: theme.spacing.unit * 10,
//     },
// });



const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        // ⚠️ object-fit is not supported by IE11.
        objectFit: 'cover',
    },
};

class allEvents extends Component {
    state = {
        open: false,
        eventList: [],
        place: '',
    }

    componentWillMount() {
        this.jobsListed();
    }

    jobsListed = () => {
        API.getJobs('javascript')
            .then(res => {
                console.log(res);
                this.setState({ eventList: res.data })
                console.log(this.state.eventList)
            })
            .catch(err => console.log(err));
    };

    addLocation = () => {
        let locations = this.state.eventList;
        locations.push(this.state.place);
        this.setState({ locations: locations, place: "", open: false })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    openInNewTab = url => {
        window.open(url, '_blank');
    }

    render() {
        return (
<<<<<<< HEAD
            <React.Fragment>
                <CssBaseline />
                <Card>
                    <CardHeader title="Jobs" />

                    <CardContent>
                        <Typography>
                            {this.state.eventList.map(elem => {
                                return (<Card >
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Company Logo"
                                            height="140"
                                            image={elem.company_logo}
                                            title={"Contemplative Reptile"}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {elem.company}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {elem.title}
                                            </Typography>
                                            <Typography component="p">
                                                {elem.location}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={this.openInNewTab(elem.url)}>
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>)
                            })
                            }
                        </Typography>
                    </CardContent>
                </Card>
            </React.Fragment>



        );
=======

            this.state.eventList.map(elem => {
              return <Card >
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Company Logo"
                  height="140"
                  image={elem.company_logo}
                  title={"Contemplative Reptile"}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {elem.company}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {elem.title}
                  </Typography>
                  <Typography component="p">
                    {elem.location}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={()=>this.openInNewTab(elem.url)}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
            })
            
          );
>>>>>>> b6b9668cd3aae22dc963fd8f2dca74620885ef6f
    }
}

allEvents.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(allEvents);

