import React from 'react'
import styled from 'styled-components'
import TaskCard from '../TaskCard';
import Icon from '../GoogleIcon';
import { useSelector } from 'react-redux';

const MainSection = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  gap: 1.5rem;
`

const Column = styled.div`
  height: 98%;
  width: calc(33% - 1rem); 
`

const ColumnTitle = styled.p`
  display: flex;
  gap: 5px;
  color: ${({ theme }) => theme.primaryText};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
`

const ColumnScrollable = styled.div`
  height: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-color: rebeccapurple ;
`

const NewButton = styled.span`
  background-color: ${({ theme }) => theme.secondaryBackground};
  width: 95%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  -webkit-box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.2);
  -moz-box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.2);
  box-shadow: 11px 9px 14px -8px rgba(0,0,0,0.2);
  cursor: pointer;
`

const BoardPage = () => {
  const activeProject = useSelector(state => state.activeProject);

  const todoTasks = activeProject.tasks.filter(todo => todo.status === 'todo');
  const inProgressTasks = activeProject.tasks.filter(task => task.status === 'in_progress');
  const doneTasks = activeProject.tasks.filter(task => task.status === 'done');

  return (
    <MainSection>

    <Column>
      <ColumnTitle>To Do <p>(2)</p></ColumnTitle>
      <ColumnScrollable>
        <NewButton>
          <Icon name={'add'} styles={`color: ${({ theme }) => theme.primaryText};`}/>
        </NewButton>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
      </ColumnScrollable>
    </Column>

    <Column>
      <ColumnTitle>In Progress <p>(10)</p></ColumnTitle>
      <ColumnScrollable>
        <NewButton>
          <Icon name={'add'} styles={`color: ${({ theme }) => theme.primaryText};`}/>
        </NewButton>
        {todoTasks.map(task => <TaskCard key={task._id} task={task} />)}
      </ColumnScrollable>
    </Column>

    <Column>
      <ColumnTitle>Done <p>(10)</p></ColumnTitle>
      <ColumnScrollable>
        <NewButton>
          <Icon name={'add'} styles={`color: ${({ theme }) => theme.primaryText};`}/>
        </NewButton>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
        <TaskCard/>
      </ColumnScrollable>
    </Column>

  </MainSection>

  )
}

export default BoardPage
