import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default class ChatInput extends React.Component {
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
    }

    render(){
        return (
            <Grid container container direction="row" justify="space-evenly" alignItems="center">
                <Grid xs={10} >
                        <TextField
                            id="outlined-full-width"
                            //label="Label"
                            style={{width:'100%',height:60,marginTop:5}}
                            //placeholder="Placeholder"
                            fullWidth
                            //margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.props.msg || ''}
                            onChange={this.props.setMsg}
                            onKeyUp={this.props.handleEnterPress}
                        />
                </Grid>
                <Grid xs={2} >
                    
                    <Button  variant="contained" color="primary" style={{marginLeft:5,marginRight:15,width:'95%',height:55}}>
                        Send
                    </Button>
                
                </Grid>
            </Grid>
        )
    }
}
    
        
