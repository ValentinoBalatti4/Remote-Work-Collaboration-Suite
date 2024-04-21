import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard';
import Whiteboard from '../components/Whiteboard';
import ChatPage from '../components/ChatPage';
import CalendarPage from '../components/CalendarPage';

const PageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.primaryBackground};
`

const Main = (props) => {
  const [currentSection, setCurrentSection] = useState('Dashboard');
  
  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'whiteboard':
        return <Whiteboard/>
      case 'chat':
        return <ChatPage/>;
      case 'calendar':
        return <CalendarPage/>;
        
      default:
        return <Dashboard />;
    }
  };

  return (
    <PageContainer>
        <Sidebar themeToggler={props.themeToggler} theme={props.theme} setCurrentSection={setCurrentSection}/>
        {renderSection()}  
      </PageContainer>
  )
}

export default Main