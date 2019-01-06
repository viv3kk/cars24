import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';




const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});


class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            errMsg: null,
            bidder_id:''
          };
    }

    handleChange = (event,field) => {
        console.log(event)
        this.setState({
            name:event.target.value,
            bidder_id:(event.target.value+'_'+Date.now()).toLowerCase(),
            errMsg:null
        })
    }

    handleTabs(tabVal){
        if(this.state.name){
            this.props.handleTabs(tabVal,this.state.bidder_id);
            this.props.socket.emit('registration',{name:this.state.name,bidder_id:this.state.bidder_id});
        }else{
            this.setState({
                errMsg : 'Kindly Enter your name to proceed to products section.'
            })
        }
        
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={2}>
                    <Typography variant="h5" component="h3">
                        Signup for Bidding
                    </Typography>
                    <Typography component="p">
                        Unique Bidding id will be generated automatically.
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                    </form>
                    <Typography component="p">
                        Bidder Id - {this.state.bidder_id}
                    </Typography>
                    <Button variant="outlined" color="secondary" className={classes.button} onClick={this.handleTabs.bind(this,1)}>
                        Proceed to Bidding Products
                    </Button>
                    {this.state.errMsg && <Typography component="p" color='error'>
                        Unique Bidding id will be generated automatically.
                    </Typography>}
                </Paper>
            </div>
        )
    }
}


Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Registration);