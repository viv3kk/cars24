import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});


class Results extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            winner_bids : {}
        }
    }

    componentWillMount(){
        this.props.socket.emit('get-results');
        this.props.socket.on('broadcast-result', (data)=>{
            console.log(data)
            this.setState({winner_bids:data})
        })
    }

    render(){
        const { classes } = this.props;
        return (
            <List className={classes.root}>
                { Object.keys(this.state.winner_bids).length > 0 ? 
                    Object.keys(this.state.winner_bids).map( (value,i) => {
                        return( 
                            <ListItem key={i}>
                                <Avatar>
                                <WorkIcon />
                                </Avatar>
                                <ListItemText primary={value} secondary={this.state.winner_bids[value]['id'] + '  ' + this.state.winner_bids[value]['bid_value']} />
                            </ListItem>
                        )
                    })
                    :
                    <ListItem >
                        <Avatar>
                        <WorkIcon />
                        </Avatar>
                        <ListItemText primary="No Winner yet" secondary="Jan 7, 2014" />
                    </ListItem>

                }
            </List>
        );
    }
}


Results.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Results);
