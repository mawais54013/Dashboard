import React from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RegisterIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/LockOutlined';
import SendIcon from '@material-ui/icons/Send';

export const authItems = (
    <div>
        <Link to="/register">
            <ListItem button>
                <ListItemIcon>
                    <RegisterIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
            </ListItem>
        </Link>
        <Link to="/signin">
            <ListItem button>
                <ListItemIcon>
                    <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>
    </div>
);