import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AiFillPushpin, AiOutlineDelete } from "react-icons/ai";
import { Button } from '../../button/Button';
import './Styles.css';


function Slack({slack_data, mode}) {
    const [slack_list, setSlack_list] = useState(slack_data);
    const [item, setItem] = useState(() => {
        const currValue = window.localStorage.getItem('Slack');

        return currValue !== null ? JSON.parse(currValue) : [];
    });
    
    const _onPinItemHandle = (pinItem) => {
        
        setItem(oldArray => [...oldArray, pinItem]);
        alert("You have successfully pin this card!");
    }

    const _onDeleteItemHandle = (index) => {
        slack_list.splice(index, 1);
        localStorage.setItem('Slack', JSON.stringify(slack_list));
        window.location.reload(false);
    }
    // Save pin items to local storage
    useEffect(() => {
        if(mode === 'pin') {
            localStorage.setItem('Slack', JSON.stringify(item));
        }
        else {
            setSlack_list(JSON.parse(localStorage.getItem('Slack')));
        }
      }, [item, mode]);

    return (
        <div className="res-container">
            <Typography style={{fontSize: 14}}>Slack </Typography>
                {slack_list.map((data, index) => (
                    <Card className="card-style" key={index} style={{minWidth: 275, marginTop: 12, marginBottom: 12}}>
                        <CardContent>
                            <Typography style={{fontSize: 12}}>Channel</Typography>
                            <Typography style={{fontSize: 10}}>{data.channel}</Typography>
                            <Typography style={{fontSize: 12}}>Author:</Typography>
                            <Typography style={{fontSize: 10}}>{data.author.toLowerCase()}</Typography>
                            <Typography style={{fontSize: 12}}>Message:</Typography>
                            <Typography style={{fontSize: 10}}>{data.message}</Typography>
                            <Typography style={{fontSize: 12}}>Time:</Typography>
                            <Typography style={{fontSize: 10}}>{data.timestamp}</Typography>
                        </CardContent> 
                        <CardActions style={{justifyContent: 'space-between'}}>
                            <Button buttonStyle='btn--outline' 
                                    buttonColor='soft-orange'
                                    buttonSize="btn--medium"
                            >
                                Learn More
                            </Button>

                            <Button buttonStyle='btn--outline' 
                                    buttonColor='soft-orange'
                                    onClick={mode === 'pin' ? () => _onPinItemHandle(data) : () => _onDeleteItemHandle(data)}
                             >
                                {mode === 'pin' ? <AiFillPushpin /> : <AiOutlineDelete/>}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
        </div>
    )
}

export default Slack;

