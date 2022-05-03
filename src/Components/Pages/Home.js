import React from 'react';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '../../config';
import Footer from '../Common/Footer';
import Header from '../Common/Header';
import PushSubscribePrompt from '../Common/PushSubscribePrompt';
import TelegramLink from '../Common/TelegramLink';
import NoticeList from '../Notices/NoticeList';

function Home({page}){
    return (
        <>
        <Helmet>
          <title>
            {page === 1 ? APP_NAME : `Page ${page} | ${APP_NAME}`}
          </title>
        </Helmet>
        <Header/> 
        <div className="container content">
          <div style={{maxWidth: "400px", marginLeft: "auto", marginRight: "auto", marginTop: "10px"}}>
				<PushSubscribePrompt/>
				<TelegramLink/>
		  </div>
          <NoticeList page={page}/>
        </div>
        <Footer/> 
        </>
    )
}

export default Home;