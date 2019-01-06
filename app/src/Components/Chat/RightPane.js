

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const CardStyles = {

    Paper : {
        padding : 15,
        margin : 5,
        height:600,
        display: 'flex',
        //justifyContent: 'center',
        flexDirection: 'column-reverse',
        alignItems:'flex-start'
        
    },
    chip: {
        marginBottom: 5,
    },
}    

export default class LeftPane extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };

    }

    render(){
        return (
            <Paper style = {CardStyles.Paper} >
                {Object.keys(this.props.users).map((key)=>{
                    return (

                        <Chip key={key}
                            avatar={<Avatar>{this.props.users[key][0]}</Avatar>}
                            label={this.props.users[key]}
                            style={CardStyles.chip}
                        />

                    )
                })}
            </Paper>
        )
    }
}
    
