import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '86.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleTabs(tabVal,product_id,product_name){
        console.log(tabVal,product_id,product_name)
        this.props.handleTabs(tabVal,product_id,product_name);
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
            <div className={classes.root}>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Maruti Dzire</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>2019 Model</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>Slot [{this.getSlots()}]</Typography>
                    </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                    {/* <div className={classes.column} />
                    <div className={classes.column}>
                        <Chip label="Barbados" className={classes.chip} onDelete={() => {}} />
                    </div> */}
                    <div className={classNames(classes.column, classes.helper)}>
                        <Typography variant="caption">
                        Ever since the all-new Dzire has been launched in the country, it has been selling like hot cakes. Clocking over 20,000 units every month, the Dzire has even replaced the Alto as the highest selling car in the country for six out of the eight months this year. Better than ever, the Dzire has won our comparison for the best diesel small-sedan in the country. 
                        <br />
                        <a href="#sub-labels-and-columns" className={classes.link}>
                            Learn more
                        </a>
                        </Typography>
                    </div>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                    {/* <Button size="small">Cancel</Button> */}
                    <Button size="small" color="primary" onClick={this.handleTabs.bind(this,2,'t0001','Maruti Dzire 2019 Model')}>
                        Lets Bid me !
                    </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>

                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Nissan</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>2020 Model</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>Slot [{this.getSlots()}]</Typography>
                    </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                    {/* <div className={classes.column} />
                    <div className={classes.column}>
                        <Chip label="Barbados" className={classes.chip} onDelete={() => {}} />
                    </div> */}
                    <div className={classNames(classes.column, classes.helper)}>
                        <Typography variant="caption">
                        Ever since the all-new Nissan 2020 Model has been launched in the country, it has been selling like hot cakes. Clocking over 20,000 units every month, the Nissan 2019 Model has even replaced the Nissan 2020 Model as the highest selling car in the country for six out of the eight months this year. Better than ever, the Nissan 2020 Model has won our comparison for the best diesel large-sedan in the country. 
                        <br />
                        <a href="#sub-labels-and-columns" className={classes.link}>
                            Learn more
                        </a>
                        </Typography>
                    </div>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                    {/* <Button size="small">Cancel</Button> */}
                    <Button size="small" color="primary" onClick={this.handleTabs.bind(this,2,'p0001','Nissan 2020 Model')}>
                        Lets Bid me !
                    </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}


Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Products);


