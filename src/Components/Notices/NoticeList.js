import React, { useEffect, useState } from 'react';
import { loadNotices } from '../../functions/api';
import Loader from '../Common/Loader';
import ErrorBox from './ErrorBox';
import NoticeItem from './NoticeItem';
import Pagination from './Pagination';

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
        return (
          <div className="container height-fill d-flex pt-5">
            <Loader/>
          </div>
        )
    } 
    else if(error){
        return (
            <div className="container height-fill">
                <div className="pb-3"></div>
                <ErrorBox/>
                <div className="pb-5 pt-2"></div>
                <Pagination page={p}/>
            </div>
        )
    }
    else {
        return (
            <>
                <div className="notice-card">
                  <h3 className="text-center">PAGE {page}</h3>
                </div>
                <div className="w-100">
                    {notices.map(
                        notice => (
                            <NoticeItem notice={notice} key={notice.id}/>
                        )
                    )}
                </div>
                <Pagination page={p}/>
            </>
        )
    }
}

export default NoticeList;