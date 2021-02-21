import React, { useEffect, useState } from 'react';
import { isFCMSupported, myFirebase, VAPID } from '../../firebase';
import { isTokenSentToServer, saveTokenServerState, subscribeToNoticeNotification } from '../../functions/api';

function PushSubscribePromt(){
    
    const [retry,setRetry] = useState(false);
    const [isSubscribing,setSubscribing] = useState(false);
    const [isSubscribed,setSubscribed] = useState(false);
    const [error,setError] = useState(null);
    const [blocked,setBlocked] = useState(false);
    const [fcmSupported,setFcmSupported] = useState(true);
    useEffect(()=>{
        if('Notification' in window){
            if((Notification.permission === "granted" && isTokenSentToServer())){
                setSubscribed(true);
            }
            
            if(Notification.permission === 'denied'){
                setBlocked(true);
            }
        }
        if(!isFCMSupported)
            setFcmSupported(false);
    },[])

    const onEnableClick = async () => {
        if(!myFirebase || isSubscribing)
            return;
        if('Notification' in window){
            setSubscribing(true);
            setError(null);
            try {
                const currentToken =  await myFirebase.messaging().getToken({vapidKey: VAPID});
                if (currentToken) {
                    await subscribeToNoticeNotification(currentToken);
                    setRetry(false);
                    saveTokenServerState(true);
                    setSubscribing(false);
                    setSubscribed(true);
                    setError(null);
                } else if(Notification.permission === "default"){
                    // Show permission request.
                    setSubscribed(false);
                }
            } catch(err){
                console.log('An error occurred while subscribing.')
                console.error(err);
                // showToken('Error retrieving registration token. ', err);
                setRetry(true);
                setSubscribing(false);
                setSubscribed(false);
                setError(err);
            }
        }
    }

    if(blocked || !fcmSupported){
        return (
            <div className="container push-prompt">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <span className="pr-1 pl-1">
                            Push notification blocked or not supported.
                        </span>
                    </div>
                </div>
            </div>
        )
    }
    else if(isSubscribed){
        return (
            <div className="container push-prompt">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <span className="pr-1 pl-1">
                            Push notification for new notices:
                        </span>
                        <span style={{color: "green", fontWeight: "500"}}>ENABLED</span>
                    </div>
                </div>
            </div>
        )
    }
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
                    {
                        error &&
                        <div className="col-12 notice-card ">
                            <code style={{color: "red"}}>
                                {error.stack}
                            </code>
                        </div>
                    }
                </div>
            </div>
    )
}

export default PushSubscribePromt;