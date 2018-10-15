import React, { Component } from "react";
import API from "../utils/API";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

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

    componentWillMount() {
        this.getNews();
    }
    getNews = () => {
        // this.setState({
        //     showNews: !this.state.show
        // });
        API.getNews()
            .then(res => {
                console.log(res.data[0]);
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

    render() {
        return (
            <Card>
                <CardHeader title="News"/>

                <CardContent>
                    <Typography>
                        {/* {this.state.news} */}
                    </Typography>
                </CardContent>
            </Card>
          );
    }
}
export default withStyles(styles)(News);