import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AiFillPushpin, AiOutlineDelete } from "react-icons/ai";
import { Button } from '../../button/Button';

import './Styles.css';



function Calendar({calendar_data, mode}) {
    const [calendar_list, setCalendar_list] = useState(calendar_data);
    // var calendar_list = calendar_data;
    const [item, setItem] = useState(() => {
        const currValue = window.localStorage.getItem('Calendar');

        return currValue !== null ? JSON.parse(currValue) : [];
    });
    
    const _onPinItemHandle = (pinItem) => {
        setItem(oldArray => [...oldArray, pinItem]);
        alert("You have successfully pin this card!");
    }

    const _onDeleteItemHandle = (index) => {
        calendar_list.splice(index, 1);
        localStorage.setItem('Calendar', JSON.stringify(calendar_list));
        window.location.reload(false);
    }
    // Save pin items to local storage
    useEffect(() => {
        if(mode === 'pin') {
            localStorage.setItem('Calendar', JSON.stringify(item));
        }
        else {
            // Update the list when we delete an item
            setCalendar_list(JSON.parse(localStorage.getItem('Calendar')));
        }
      }, [item, mode]);

    return (
        <div className="res-container">
            <Typography style={{fontSize: 14}}>Calendar </Typography>
                {calendar_list.map((data, index) => (
                    <Card className="card-style" key={index} style={{minWidth: 275, marginTop: 12, marginBottom: 12}}>
                        <CardContent>
                            <Typography style={{fontSize: 14}}>{data.title}</Typography>
                            <Typography style={{fontSize: 12}}>Invitees:</Typography>
                            <Typography style={{fontSize: 10}}>{data.invitees}</Typography>
                            <Typography style={{fontSize: 12}}>Date:</Typography>
                            <Typography style={{fontSize: 10}}>{data.date}</Typography>
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
                                    onClick={mode === 'pin' ? () => _onPinItemHandle(data) : () => _onDeleteItemHandle(index)}
                             >
                                {mode === 'pin' ? <AiFillPushpin /> : <AiOutlineDelete/>}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
        </div>
    )
}

export default Calendar

