import React, { useState, useEffect }from 'react'
import './Home.css'
import img from '../../images/img1.png';
import { BsSearch } from "react-icons/bs";
import { Button } from '../../button/Button';
// Impport data
import Calendar from '../../data/calendar.json';
import Contacts from '../../data/contacts.json';
import Dropbox from '../../data/dropbox.json';
import Slack from '../../data/slack.json';
import Tweet from '../../data/tweet.json';
// Search Result
import CalenderUI from './Calendar';
import ContactUI from './Contacts';
import DropboxUI from './Dropbox';
import SlackUI from './Slack';
import TweetUI from './Tweet';




export default function Home() {
    const [input, setInput] = useState("");
    const [click, setCilck] = useState(false);
    const [calendar_data, setCalender_data] = useState([]);
    const [contact_data, setContact_data] = useState([]);
    const [dropbox_data, setDropbox_data] = useState([]);
    const [slack_data, setSlack_data] = useState([]);
    const [tweet_data, setTweet_data] = useState([]);
    const [anchorTarget, setAnchorTarget] = useState(null);

    // Scroll to Search results when user clicks Search button
    useEffect(() => {
        setAnchorTarget(document.getElementById("searchResult"));
        setCilck(false);
    }, []);

    const _onSearchHande = (event) => {
       
        // Find matching data in Calendar
        let calendar_arr = Calendar.calendar.filter(data => {
            return data.matching_terms.includes(input.toLowerCase());
        })
        if(calendar_arr != null) {
            // Convert the date into normal date and time format
            for(var i = 0; i < calendar_arr.length; i++) {
                var temp = Date.parse(calendar_arr[i].date);
                var utc = new Date(temp);
                var dateFormat = utc.toLocaleString();
                calendar_arr[i].date = dateFormat;
            }
            setCalender_data(calendar_arr);
        }
       
        // Find matching data in contacts
        let contact_arr = Contacts.contacts.filter(data => {
            return data.matching_terms.includes(input.toLowerCase());
        })
        if(contact_arr != null) {
            setContact_data(contact_arr);
        }

        // Find matching data in dropbox
        let dropbox_arr = Dropbox.dropbox.filter(data => {
            return data.matching_terms.includes(input.toLowerCase());
        })
        if(dropbox_arr != null) {
            setDropbox_data(dropbox_arr);
        }

        // Find matching data in slack
        let slack_arr = Slack.slack.filter(data => {
            return data.matching_terms.includes(input.toLowerCase());
        })
        if(slack_arr) {
            // Convert the date into normal date and time format
            for(var i = 0; i < slack_arr.length; i++) {
                var temp = Date.parse(slack_arr[i].timestamp);
                var utc = new Date(temp);
                var dateFormat = utc.toLocaleString();
                slack_arr[i].timestamp = dateFormat;
            }

            setSlack_data(slack_arr);
        }

        // Find matching data in tweet
        let tweet_arr = Tweet.tweet.filter(data => {
            return data.matching_terms.includes(input.toLowerCase());
        })
        if(tweet_arr) {
            setTweet_data(tweet_arr);
        }
        
        // if(calendar_data.length == 0 && contact_data.length == 0 && dropbox_data.length == 0 && slack_data.length == 0 && tweet_data.length == 0) {
        //     alert("Result not found!");
        // }
        setCilck(true);
        event.preventDefault();
        anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest"});
    }

    
    return (
    <div>
         <div
            className="home_container"
            >
                <div className="container">
                    <div className="row home-row"
                        style={{display:'flex', flexDirection: 'row'}}
                    >
                     <div className="col">
                         <div className="home-text-wrapper">
                             <div className="top-line">Welcome</div>
                             <div className="search-box">
                                <input 
                                    onChange= {e => setInput(e.target.value)}
                                    className="search-input" 
                                    type="search" name="" 
                                    placeholder="Search......">
                                </input>
                                
                                <Button buttonStyle='btn--outline' 
                                        buttonColor='autum-leave'
                                        onClick={_onSearchHande}
                                        ariaLabel={`Scroll to ${"searchResult"}`}
                                >
                                    <BsSearch />
                                </Button>
                             </div>       
                         </div>
                     </div>
                    <div className='col'>
                        <div className='home-img-wrapper'>
                            <img src={img} alt={'Maple Leave'} className='home-img' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="search-result-container" id="searchResult">
            {click ? <div className="search-result-title">
                <h3 >Search Result</h3>
            </div> : null}
            <div>
                {calendar_data.length > 0 ? <CalenderUI mode={'pin'} calendar_data={calendar_data}/> : <div/>}
                {contact_data.length > 0 ? <ContactUI mode={'pin'} contact_data={contact_data}/> : <div/>}
                {dropbox_data.length > 0 ? <DropboxUI mode={'pin'} dropbox_data={dropbox_data}/> : <div/>}
                {slack_data.length > 0 ? <SlackUI mode={'pin'} slack_data={slack_data}/> : <div/>}
                {tweet_data.length > 0 ? <TweetUI mode={'pin'} tweet_data={tweet_data}/> : <div/>}
            </div>
           
        </div>
    </div>
        
    )
}
