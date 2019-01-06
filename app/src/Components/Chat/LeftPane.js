

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

const CardStyles = {
    cardSelf: {
      minWidth: 275,
      maxWidth: 975,
      margin:5,
      alignSelf:'flex-end',
      float:'right',
      backgroundColor:'gold'

    },
    card: {
        minWidth: 275,
        maxWidth: 975,
        margin:5,
        alignSelf:'flex-start'
      },
    Paper : {
        padding : 15,
        margin : 5,
        height:600,
        maxHeight: '100%',
        display: 'flex',
        //justifyContent: 'center',
        flexDirection: 'column-reverse',
        overflow: 'auto'
        
    }
}    

export default class LeftPane extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            receiver : [],
            sender : []
        };

    }

    render(){
        return (
            <Paper style = {CardStyles.Paper} >

                {this.props.chats && 
                    this.props.chats.map((msgs,key)=>{
                        return (
                            <Card key={key} style={msgs.type === 0 ? CardStyles.cardSelf : CardStyles.card}>
                                <CardContent>
                                    <Typography  color="textSecondary"  style={{fontSize:12}}>
                                        {msgs.sender} - {msgs.log}
                                    </Typography>
                                    <Typography  color="textSecondary" gutterBottom>
                                        {msgs.data}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                }

            </Paper>
        )
    }
}
    
