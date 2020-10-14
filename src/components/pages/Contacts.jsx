import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Button } from '../../button/Button';
import { AiFillPushpin, AiOutlineDelete } from "react-icons/ai";
import Typography from '@material-ui/core/Typography';
import './Styles.css';


function Contacts({contact_data, mode}) {
    const [contact_list, setContact_list] = useState(contact_data);
    const [item, setItem] = useState(() => {
        const currValue = window.localStorage.getItem('Contacts');

        return currValue !== null ? JSON.parse(currValue) : [];
    });
    
    const _onPinItemHandle = (pinItem) => {
        
        setItem(oldArray => [...oldArray, pinItem]);
        alert("You have successfully pin this card!")
    }

    const _onDeleteItemHandle = (index) => {
        contact_list.splice(index, 1);
        localStorage.setItem('Contacts', JSON.stringify(contact_list));
        window.location.reload(false);
    }

    // Save pin items to local storage
    useEffect(() => {
        if(mode === 'pin') {
            localStorage.setItem('Contacts', JSON.stringify(item));
        }
        else {
            // Update the list when we delete an item
            setContact_list(JSON.parse(localStorage.getItem('Contacts')));
        }
      }, [item, mode]);

    return (
        <div className="res-container">
            <Typography style={{fontSize: 14}}>Contacts</Typography>
                {contact_list.map((data, index) => (
                    <Card className="card-style" key={index} style={{minWidth: 275, marginTop: 12, marginBottom: 12}}>
                        <CardContent>
                            <Typography style={{fontSize: 14}}>{data.name}</Typography>
                            <Typography style={{fontSize: 12}}>Company:</Typography>
                            <Typography style={{fontSize: 10}}>{data.company}</Typography>
                            <Typography style={{fontSize: 12}}>Emails:</Typography>
                            {data.emails.map((email) => (
                                <Typography style={{fontSize: 10}}>{email}</Typography>
                            ))}
                            <Typography style={{fontSize: 12}}>Phones:</Typography>
                            {data.phones.map((phone) => (
                                <Typography style={{fontSize: 10}}>{phone}</Typography>
                            ))}
                            <Typography style={{fontSize: 12}}>Last Contact:</Typography>
                            <Typography style={{fontSize: 10}}>{data.last_contact}</Typography>
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

export default Contacts;

