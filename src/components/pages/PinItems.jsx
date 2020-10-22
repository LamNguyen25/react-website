import React, { useState, useEffect } from 'react';
import './Styles.css';

// Search Result
import CalenderUI from './Calendar';
import ContactUI from './Contacts';
import DropboxUI from './Dropbox';
import SlackUI from './Slack';
import TweetUI from './Tweet';

function PinItem() {
    // Get data from localstorage if there is any
    const [calendar_list, setCalendar_list] = useState(() => {
        const currValue = window.localStorage.getItem('Calendar');
        return currValue !== null ? JSON.parse(currValue) : [];
    });
    const [contact_list, setContact_list] = useState(() => {
        const currValue = window.localStorage.getItem('Contacts');
        return currValue !== null ? JSON.parse(currValue) : [];
    });
    const [dropbox_list, setDropbox_list] = useState(() => {
        const currValue = window.localStorage.getItem('Dropbox');
        return currValue !== null ? JSON.parse(currValue) : [];
    });
    const [slack_list, setSlack_list] = useState(() => {
        const currValue = window.localStorage.getItem('Slack');
        return currValue !== null ? JSON.parse(currValue) : [];
    });
    const [tweet_list, setTweet_list] = useState(() => {
        const currValue = window.localStorage.getItem('Tweet');
        return currValue !== null ? JSON.parse(currValue) : [];
    });
    
    
    useEffect(() => {
        setCalendar_list(JSON.parse(localStorage.getItem("Calendar")));
        setContact_list(JSON.parse(localStorage.getItem("Contacts")));
        setDropbox_list(JSON.parse(localStorage.getItem("Dropbox")));
        setSlack_list(JSON.parse(localStorage.getItem("Slack")));
        setTweet_list(JSON.parse(localStorage.getItem("Tweet")));

    }, []);
    
    return (
        <div className="search-result-container" id="searchResult">
            <div className="search-result-title">
                <h3 className="pin-header">Pin Items</h3>
            </div>
            <div>
                {calendar_list.length > 0 ? <CalenderUI mode={'delete'} calendar_data={calendar_list}/> : <div/>}
                {contact_list.length > 0 ? <ContactUI mode={'delete'} contact_data={contact_list}/> : <div/>}
                {dropbox_list.length > 0 ? <DropboxUI mode={'delete'} dropbox_data={dropbox_list}/> : <div/>}
                {slack_list.length > 0 ? <SlackUI mode={'delete'} slack_data={slack_list}/> : <div/>}
                {tweet_list.length > 0 ? <TweetUI mode={'delete'} tweet_data={tweet_list}/> : <div/>} 
            </div>
        </div>
    )
}

export default PinItem;

