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
  buttonBid: {
    marginTop: theme.spacing.unit * 3,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});


class Bidding extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bid_value:0,errMsg:null,msg:null,
            cool_off_period:0
          };
    }

    componentWillMount(){
        this.props.socket.on('cool_off_period',(data)=>{
            console.log(data);
            this.setState({cool_off_period:data.time,});

            this.setState({
                errMsg : `Bidding Closed. Try Again after ${this.state.cool_off_period} seconds`
            })
        })
    }
    componentDidMount(){
        this.props.socket.on('cool_off_period',(data)=>{
            console.log(data);
            this.setState({cool_off_period:data.time,});

            this.setState({
                errMsg : `Bidding Closed. Try Again after ${this.state.cool_off_period} seconds`
            })
        })
    }
    handleChange = (event) => {
        this.setState({
            bid_value:event.target.value,errMsg:null
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

    handleBids(){

        if(this.state.bid_value > 0 && this.state.cool_off_period === 0){
            this.props.handleBids(this.state.bid_value);
            this.setState({
                msg : 'You can make more bid or update your current bid'
            })
        }else{
            var errMsg = this.state.cool_off_period > 0  ? `Bidding Closed. Try Again after ${this.state.cool_off_period} seconds`: 'Kindly Enter a valid amount !!'
            this.setState({
                errMsg
            })
        }
    }

    getSlots=()=>{
        var d = new Date();

        if(30-d.getMinutes() > 0){
        console.log('here')
        return (d.getHours()+':00 - ' +d.getHours()+':30');
        }else{
        console.log('there')
        return (d.getHours()+':30 - ' +(d.getHours()+1)+':00');
        }
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={2}>
                    <Typography variant="h5" component="h3">
                        Make your bid for {this.props.product_name}
                    </Typography>

                    <form className={classes.container} noValidate autoComplete="off">    
                        <TextField
                            id="outlined-name"
                            label="Bid Value in INR"
                            className={classes.textField}
                            value={this.state.bid_value}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button variant="outlined" color="secondary" className={classes.buttonBid} onClick={this.handleBids.bind(this,3)}>
                            Submit Bid [ {this.getSlots()} ]
                        </Button>
                    </form>

                    <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleTabs.bind(this,3)}>
                        Proceed to Result
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleTabs.bind(this,1)}>
                        Back to products
                    </Button>
                    {this.state.errMsg && <Typography component="p" color='error'>
                        {this.state.errMsg}
                    </Typography>}
                    {this.state.msg && this.state.errMsg == null && <Typography component="p" color='error'>
                        {this.state.msg}
                    </Typography>}
                </Paper>
            </div>
        )
    }
}


Bidding.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bidding);