require('./ChatPage.css');
require('./Chat/Login.css');

import React from 'react';
import ChatApp from './Chat/ChatApp';
import Header from "../Header";
import Footer from "../Footer";

const ChatPage = ({session}) => {
  return (
      <>

      <Header session={session} />

      <div> what? </div>

      <Footer />
      </>

    );
}

export default ChatPage;