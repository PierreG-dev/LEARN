import React from 'react';
import { School } from '../../types';
import styled from 'styled-components';
import ClassList from './ClassList';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index.ts';
import ClassPanel from './PanelViews/ClassPanel.tsx';

const Index: React.FC = () => {
  return (
    <MainContainer>
      <ClassList />
      <ClassPanel />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: 100%;
  margin: 0;
  display: flex;

  * {
    box-sizing: border-box !important;
  }
`;

export default Index;
