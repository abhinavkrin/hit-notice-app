import React from 'react';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import PushSubscribePromt from '../Common/PushSubscribePrompt';
import NoticeList from '../Notices/NoticeList';

function Home({page}){
    return (
        <div className="container">
          <Header/> 
          <div>page: {page}</div>
          <PushSubscribePromt/>
          <NoticeList page={page}/>
          <Footer/> 
        </div>
    )
}

export default Home;