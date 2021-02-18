import { apiUrl, subscribeUrl } from "../config"

export const loadNotices = async (page=1) => {
    if(isNaN(parseInt(page))){
        throw new Error("Page Not Found!");
    }
    const response = await fetch(`${apiUrl}?page=${page}`);
    if(!response.ok)
        throw new Error("Failed to load notices.")
    const data =  await response.json();
    return data.notices;
}

//checks if FCM Token is sent to server
export const isTokenSentToServer = () => {
    const isTokenSentToServer = window.localStorage.getItem("isTokenSentToServer");
    return !!isTokenSentToServer;
}

export const saveTokenServerState = (state) => {
    window.localStorage.setItem("isTokenSentToServer",!!state);
}

export const subscribeToNoticeNotification = async (token) => {
    const response = await fetch(subscribeUrl,{
        method: "post",
        body: JSON.stringify({
            token
        }),
        headers: {
            "Content-Type":"application/json"
        }
    });
    if(!response.ok)
        throw new Error("Failed to subscribe to notices");
}