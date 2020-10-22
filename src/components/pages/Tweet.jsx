import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AiFillPushpin, AiOutlineDelete } from "react-icons/ai";
import { Button } from '../../button/Button';
import './Styles.css';


function Tweet({tweet_data, mode}) {
    const [tweet_list, setTweet_list] = useState(tweet_data);
    const [item, setItem] = useState(() => {
        const currValue = window.localStorage.getItem('Tweet');

        return currValue !== null ? JSON.parse(currValue) : [];
    });
    
    const _onPinItemHandle = (pinItem) => {
        
        setItem(oldArray => [...oldArray, pinItem]);
        alert("You have successfully pin this card!")
    }

    const _onDeleteItemHandle = (index) => {
        tweet_list.splice(index, 1);
        localStorage.setItem('Tweet', JSON.stringify(tweet_list));
        window.location.reload(false);
    }
    // Save pin items to local storage
    useEffect(() => {
        if(mode === 'pin') {
            localStorage.setItem('Tweet', JSON.stringify(item));
        }
        else {
            setTweet_list(JSON.parse(localStorage.getItem('Tweet')));
        }
      }, [item, mode]);

    return (
        <div className="res-container">
            <Typography style={{fontSize: 14}}>Tweet </Typography>
                {tweet_list.map((data, index) => (
                    <Card className="card-style" key={index} style={{minWidth: 275, marginTop: 12, marginBottom: 12}}>
                        <CardContent>
                            <Typography style={{fontSize: 12}}>User: </Typography>
                            <Typography style={{fontSize: 10}}>{data.user}</Typography>
                            <Typography style={{fontSize: 12}}>Message:</Typography>
                            <Typography style={{fontSize: 10}}>{data.message}</Typography>
                            <Typography style={{fontSize: 12}}>Timestamp:</Typography>
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

export default Tweet;

