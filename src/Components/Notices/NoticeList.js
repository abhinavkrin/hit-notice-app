import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadNotices } from '../../functions/api';
import Loader from '../Common/Loader';
import NoticeItem from './NoticeItem';

function NoticeList({page=1}){
    const p = parseInt(page);
    const [notices,setNotices] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    useEffect(()=>{
        setLoading(true);
        setError(null);
        loadNotices(page)
            .then(notices => {
                setNotices(notices);
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to load notices.");
                setLoading(false);
            });
    },[page])
    if(isLoading){
        return <Loader/>
    } 
    else if(error){
        return (
            <>
                <div>{error}</div>
                <div className="w-100 d-flex justify-content-between mr-auto ml-auto" style={{maxWidth: "300px"}}>
                    <span>
                        <Link to={"/page/"+(p-1)}>
                            Previous
                        </Link>
                    </span>
                    <span>
                        Page {p}
                    </span>
                    <span>
                        <Link to={"/page/"+(p+1)}>
                            Next
                        </Link>
                    </span>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className="w-100">
                    {notices.map(
                        notice => (
                            <NoticeItem notice={notice} key={notice.id}/>
                        )
                    )}
                </div>
                <div className="w-100 d-flex justify-content-between mr-auto ml-auto" style={{maxWidth: "300px"}}>
                    <span>
                        <Link to={"/page/"+(p-1)}>
                            Previous
                        </Link>
                    </span>
                    <span>
                        Page {p}
                    </span>
                    <span>
                        <Link to={"/page/"+(p+1)}>
                            Next
                        </Link>
                    </span>
                </div>
            </>
        )
    }
}

export default NoticeList;