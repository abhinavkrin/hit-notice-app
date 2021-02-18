import React from 'react';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import NoticeList from '../Notices/NoticeList';

function Home({page}){
    return (
        <div className="container">
          <Header/> 
          <div>page: {page}</div>
          <NoticeList page={page}/>
          <Footer/> 
        </div>
    )
}

export default Home;