import React, { useState } from 'react';
import { isFCMSupported, myFirebase, VAPID } from '../../firebase';
import { isTokenSentToServer, saveTokenServerState, subscribeToNoticeNotification } from '../../functions/api';

function PushSubscribePromt(){
    let show = true;
     
    if('Notification' in window){
        if((Notification.permission === "granted" && isTokenSentToServer()) || Notification.permission === "denied"){
            show=false;
        }
    } else {
        show = false;
    }

    const [isOpen,setIsOpen] = useState(show);
    const [retry,setRetry] = useState(false);
    const [isSubscribing,setSubscribing] = useState(false);

    if(!isFCMSupported){
        console.log("FCM not supported. FCM request for permission skipped.");
        return <div/>;
    }

    const onEnableClick = async () => {
        if(!myFirebase || isSubscribing)
            return;
        if('Notification' in window){
            setSubscribing(true);
            try {
                const currentToken =  await myFirebase.messaging().getToken({vapidKey: VAPID});
                if (currentToken) {
                    await subscribeToNoticeNotification(currentToken);
                    setIsOpen(false);
                    setRetry(false);
                    saveTokenServerState(true);
                    setSubscribing(false);
                } else if(Notification.permission === "default"){
                    // Show permission request.
                    setIsOpen(true);
                }
            } catch(err){
                console.log('An error occurred while retrieving token. ', err);
                // showToken('Error retrieving registration token. ', err);
                setRetry(true);
                setSubscribing(false);
                setIsOpen(false);
            }
        }
    }

    if(!isOpen)
        return <div/>
    else 
    return (
            <div className="container push-prompt">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <span className="pr-1 pl-1">
                            Push notification for new notices:
                        </span>
                        <button onClick={onEnableClick} style={{color: retry?"red":""}} className="cbutton">
                            {retry? 
                                "RETRY":
                                (isSubscribing?"PLEASE WAIT...":"ENABLE")
                            }
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default PushSubscribePromt;