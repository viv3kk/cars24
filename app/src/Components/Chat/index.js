import React from 'react';

import io from "socket.io-client";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Registration from './Registration';
import Products from './Products';
import Bidding from './Bidding';
import Results from './Results';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
    constructor(){
        super();
        this.state = {
            value: 0,
            bidder_id:'',
            bid_value:null,
            product_id:null,
            product_name:''
        };
        this.socket = null;
    }

    componentWillMount(){
        this.socket = io('http://localhost:3002');
    }

    handleChange = (event, value) => {
        console.log('tabVal',value)
        this.setState({ value });
        // if(value === 3){
        //     this.socket.emit('get-results','data');
        //     this.socket.on('broadcast-result', (data)=>{
        //         console.log(data)
        //     });
        // }
    };

    handleTabsRegistration=(tabVal,bidder_id)=>{
        console.log('tabVal',bidder_id);
        this.setState({value:tabVal,bidder_id:bidder_id});
    }

    handleTabsProducts=(tabVal,product_id,product_name)=>{
        this.setState({value:tabVal,product_id:product_id,product_name});
        this.socket.emit('land-on-bid',{product_name,product_id:product_id,bidder_id:this.state.bidder_id,bid_value:null})
    }

    handleBids=(bid_value)=>{
        this.setState({bid_value:bid_value});
        this.socket.emit('make-a-bid',{product_id:this.state.product_id,bidder_id:this.state.bidder_id,bid_value:bid_value})
    }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="REGISTRATION" disabled={value !== 0}/>
            <Tab label="PRODUCTS" disabled={value !== 1}/>
            <Tab label="BIDDING VIEW" />
            <Tab label="RESULTS" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Registration handleTabs={this.handleTabsRegistration} socket={this.socket}/></TabContainer>}
        {value === 1 && <TabContainer><Products handleTabs={this.handleTabsProducts} socket={this.socket}/></TabContainer>}
        {value === 2 && <TabContainer><Bidding handleBids={this.handleBids} handleTabs={this.handleChange} socket={this.socket} product_name={this.state.product_name}/></TabContainer>}
        {value === 3 && <TabContainer><Results socket={this.socket} /></TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
