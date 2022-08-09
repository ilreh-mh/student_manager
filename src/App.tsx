import React from 'react';
import StudentTable from './components/StudentTable';
import { styled } from '@mui/material/styles';


const S_TableWrapper = styled('div')`
  max-width: 800px;
  margin: 4rem auto;
`;

function App() {
  return (
    <S_TableWrapper>
      <StudentTable />
    </S_TableWrapper>
  );
}

export default App;
