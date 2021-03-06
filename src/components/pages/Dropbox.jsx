import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AiFillPushpin, AiOutlineDelete } from "react-icons/ai";
import { Button } from '../../button/Button';
import './Styles.css';


function Dropbox({dropbox_data, mode}) {
    const [dropbox_list, setDropbox_list] = useState(dropbox_data);
    const [item, setItem] = useState(() => {
        const currValue = window.localStorage.getItem('Dropbox');

        return currValue !== null ? JSON.parse(currValue) : [];
    });
    
    const _onPinItemHandle = (pinItem) => {
        setItem(oldArray => [...oldArray, pinItem]);
        alert("You have successfully pin this card!")
    }

    const _onDeleteItemHandle = (index) => {
        dropbox_list.splice(index, 1);
        localStorage.setItem('Dropbox', JSON.stringify(dropbox_list));
        window.location.reload(false);
    }
    // Save pin items to local storage
    useEffect(() => {
        if(mode === 'pin') {
            localStorage.setItem('Dropbox', JSON.stringify(item));
        }
        else {
            // Update the list when we delete an item
            setDropbox_list(JSON.parse(localStorage.getItem('Dropbox')));
        }
      }, [item, mode]);

    return (
        <div className="res-container">
            <Typography style={{fontSize: 14}}>Dropbox</Typography>
                {dropbox_list.map((data, index) => (
                    <Card className="card-style" key={index} style={{minWidth: 275, marginTop: 12, marginBottom: 12}}>
                        <CardContent>
                            <Typography style={{fontSize: 14}}>Path</Typography>
                            <Typography style={{fontSize: 12}}>{data.path}</Typography>
                            <Typography style={{fontSize: 12}}>Title:</Typography>
                            <Typography style={{fontSize: 10}}>{data.title}</Typography>
                            <Typography style={{fontSize: 12}}>Share with:</Typography>
                            {data.shared_with !== null ? data.shared_with.map((email) => (
                                <Typography style={{fontSize: 10}}>{email}</Typography>
                            )) : null}
                            <Typography style={{fontSize: 12}}>Created:</Typography>
                            <Typography style={{fontSize: 10}}>{data.created}</Typography>
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

export default Dropbox;

