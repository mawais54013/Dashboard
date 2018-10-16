import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';


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

class hackJobs extends Component {
    state = {
        open: false,
        hackJob: [],
    }

    componentDidMount() {
        this.hackerJobs();
    }
    hackerJobs = () => {
        // this.setState({
        //     showNews: !this.state.show
        // });
        API.getHackerJobs()
            .then(res => {

                console.log('hey there');
                this.setState({ hackJob: res.data})
                console.log(this.state.hackJob);
            })
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    openInNewTab = url => {
      window.open(url, '_blank');
    }

    render() {
        return (
          this.state.hackJob.map(elem => {
            return <Card >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {elem.title}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=>this.openInNewTab(elem.link)}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        
          })

          );
    }
}
export default withStyles(styles)(hackJobs);