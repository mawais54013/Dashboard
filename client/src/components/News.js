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

class News extends Component {
    state = {
        open: false,
        // show: false,
        showNews: false,
        news: [],
    }

    componentDidMount() {
        this.getNews();
    }
    getNews = () => {
        // this.setState({
        //     showNews: !this.state.show
        // });
        API.getNews()
            .then(res => {
                this.setState({ news: res.data })
                console.log(this.state.news);
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
            this.state.news.map(elem => {
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
                  Full Story
                </Button>
              </CardActions>
            </Card>
          
            })

          );
    }
}
export default withStyles(styles)(News);