import React, { useState } from 'react'
import styled, {css} from 'styled-components';

const SidebarContainer = styled.div`
  margin: 10px;
  position: sticky;
  top: 0;
  left: 0;
  max-width: ${props => (props.expanded ? '16rem' : '2rem')};
  min-height: 50rem;
  height: 98%;
  background-color: ${({ theme }) => theme.sidebarBackground};
  padding: 0 1.5rem;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;
  ${props => 
    !props.expanded && 
    css`
      ${SidebarSectionText} {display: none},
      ${SidebarSectionTitle} {display: none},
      ${SidebarSectionItem} {justify-content: center},
      ${SidebarSwitch} {transform: rotate(180deg)}
    `
  }
`

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid #d9d9d9;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  gap: 3rem;
`
const Logo = styled.h2`
  color: #FFF;
  font-size: 24;
`;

const SidebarSwitch = styled.span`
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -10px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
`

const SidebarSectionsContainer = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
`

const SidebarSectionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 7px 5px;
  border-radius: 5px;
  &:hover{
    background-color: rgba(255,255,255, 0.3);
  }
`

const SidebarSectionText = styled.p`
  font-size: 17px;
  color: ${({ theme }) => theme.thirdText};
`

const SidebarSectionSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.thirdText};
  font-size: 22px;
  font-weight: 800;
`

const SidebarSectionTitle = styled.p`
  font-size: 19px;
  color: ${({ theme }) => theme.thirdText};
  border-top: 0.5px solid #D9D9D9;
  padding-top: 15px;
  padding-bottom: 5px;
`

const MaterialIcon = (props) => (
  <span className={`${props.className} material-symbols-outlined`} style={props.style}>{props.name}</span>
)

const Icon = styled(MaterialIcon)`
  color: ${props => props.color ? props.color : ({ theme }) => theme.thirdText};
  font-size: 28px;
  &.material-symbols-outlined {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  };
  cursor: pointer;
`

const SidebarNewProjectBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.thirdText};
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  border-radius: 10px;
  border: none;
`

const SidebarBottom = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 20px 0;
  border-top: 0.5px solid #D9D9D9;
`

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const Sidebar = ({themeToggler, theme}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleChangeTheme = () => {
    themeToggler()

  }

  return (
    <SidebarContainer expanded={isExpanded}>
      <SidebarHeader>
        {
          isExpanded ? (
            <>
              <Logo>TeamCollabs</Logo>
              <SidebarSectionSpan onClick={handleChangeTheme}>
                <Icon name={theme === 'light' ? 'dark_mode' : 'light_mode'}/>
              </SidebarSectionSpan>
            </>
          )
          : (
            <Logo>TC</Logo>
          )
        }
        <SidebarSwitch onClick={() => setIsExpanded(!isExpanded)}>
          <Icon name={'chevron_left'}/>
        </SidebarSwitch>
      </SidebarHeader>
      <SidebarSectionsContainer>
        <SidebarSection>
          <SidebarSectionItem>
            <Icon name={'insert_chart'}/>
            <SidebarSectionText>
              Activity
            </SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem>
            <Icon name={'check_circle'}/>
            <SidebarSectionText>
              Tasks
            </SidebarSectionText>
          </SidebarSectionItem>
        </SidebarSection>
        <SidebarSection>
          <SidebarSectionTitle>
            Menu
          </SidebarSectionTitle>
          <SidebarSectionItem>
            <Icon name={'dashboard'}/>
            <SidebarSectionText>Dashboard</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem>
            <Icon name={'chat_bubble'}/>
            <SidebarSectionText>Chat</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem>
            <Icon name={'calendar_today'}/>
            <SidebarSectionText>Calendar</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem>
            <Icon name={'groups'}/>
            <SidebarSectionText>Team members</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem>
            <Icon name={'settings'}/>
            <SidebarSectionText>Settings</SidebarSectionText>
          </SidebarSectionItem>
        </SidebarSection>
        <SidebarSection>
        <SidebarSectionTitle>Projects</SidebarSectionTitle>
          {/* Map trough user's Projects */}
          <SidebarSectionItem>
            <SidebarSectionSpan>#</SidebarSectionSpan>
            <SidebarSectionText>Project1</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem>
            <SidebarSectionSpan>#</SidebarSectionSpan>
            <SidebarSectionText>Project1</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarSectionItem>
            <SidebarSectionSpan>#</SidebarSectionSpan>
            <SidebarSectionText>Project1</SidebarSectionText>
          </SidebarSectionItem>
          <SidebarNewProjectBtn>
            {
              isExpanded ?
                'Create new project'
                :
                <Icon name={'add'} color={'#000'}/>
            }
          </SidebarNewProjectBtn>
        </SidebarSection>
      </SidebarSectionsContainer>
      <SidebarBottom>
        <UserImage src='https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg'/>
        <SidebarSectionText>
          Workspace name
        </SidebarSectionText>
      </SidebarBottom>
    </SidebarContainer>
  )
}

export default Sidebar

