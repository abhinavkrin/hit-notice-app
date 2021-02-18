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
        <div className="w-100 text-white pl-2 pr-2 pt-1 pb-1" style={{backgroundColor: "#00796B"}}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p>
                            Enable push notification for new notices. Don't worry, <b>we won't spam</b>.
                        </p>
                        <button onClick={onEnableClick}>
                            {retry? "Retry":(isSubscribing?"please wait...":"Enable")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PushSubscribePromt;