import React from 'react';
import StudentTable from './components/StudentTable';
import StudentStore from './StudentStore';
import { styled } from '@mui/material/styles';


const S_TableWrapper = styled('div')`
  max-width: 800px;
  margin: 4rem auto;
`;

function App() {
  const studentStore = new StudentStore();
  return (
    <S_TableWrapper>
      <StudentTable store={studentStore} />
    </S_TableWrapper>
  );
}

export default App;
