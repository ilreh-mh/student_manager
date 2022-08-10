import React from 'react';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/css';

//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//modal, dialog
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';

//icons
import IconEdit from '@mui/icons-material/Edit';
import IconDelete from '@mui/icons-material/Delete';

//misc
import Button from '@mui/material/Button';
import { IStudent, IExchangeStudent } from '../datasets/students';
import ModifyForm from './ModifyForm';

//styles
const CSS_HeadTableCells = {
  fontWeight: 'bold',
}

const styleModal = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 0 2rem;
  padding-bottom: 2rem;
  overflow: scroll;
  max-width:calc(100% - 80px);
  max-height:calc(100% - 80px);
`;

//functions

/**
 * Theoretically, it would suffice to use toLocaleString('de')
 * because there were no leading zeroes in the mockups.
 * However, since those are german-formatted dates, we are
 * used to have leading zeroes and benefit with better
 * readability in that case.
 */
const getFormattedBirthdate = (date: string) => {
  if (!date) return;
  let dateSrc = new Date(date);
  let d: any = dateSrc.getDate();
  d = d > 9 ? String(d) : '0' + String(d);
  let m: any = dateSrc.getMonth() + 1;
  m = m > 9 ? String(m) : '0' + String(m);
  let y = dateSrc.getFullYear();
  let formattedDate = d + '.' + m + '.' + y;
  if (formattedDate.indexOf('NaN') != -1) {
    formattedDate = 'Invalid Date!';
  }
  return formattedDate;
}

const studentIsExternal = (student: IStudent | IExchangeStudent) => {
  return 'extId' in student;
}

function StudentTable({ store }:any) {
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={CSS_HeadTableCells}>Name</TableCell>
              <TableCell sx={CSS_HeadTableCells}>Class</TableCell>
              <TableCell sx={CSS_HeadTableCells}>Birthday</TableCell>
              <TableCell sx={CSS_HeadTableCells}>Gender</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              store.filteredList?.map((data:IStudent | IExchangeStudent) => <TableRow
                key={data.name + data.class + data.birthdate}
              >
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.class}</TableCell>
                <TableCell>
                  {getFormattedBirthdate(data.birthdate)}
                </TableCell>
                <TableCell>{data.gender}</TableCell>
                <TableCell sx={{ minWidth: '9rem', textAlign: 'right' }}>
                  {!studentIsExternal(data) && <React.Fragment>
                    <Button onClick={() => store.setEditedStudent(data)}>
                      <IconEdit />
                    </Button>
                    <Button onClick={() => {
                      store.setToDeleteStudent(data);
                    }}>
                      <IconDelete />
                    </Button>
                  </React.Fragment>}
                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={!!store.editedStudent}
        onClose={() => store.setEditedStudent(null)}
      >
        <Box className={styleModal}>
          <ModifyForm
            store={store}
            name={store.editedStudent?.name}
            classroom={store.editedStudent?.class}
            birthdate={store.editedStudent?.birthdate}
            gender={store.editedStudent?.gender}
          />
        </Box>
      </Modal>
      <Dialog
        open={!!store.toDeleteStudent}
      >
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          Do you really want to delete student '{store.toDeleteStudent?.name}' ?
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => store.setToDeleteStudent(null)}>
            Cancel
          </Button>
          <Button autoFocus onClick={() => {
            store.deleteStudent(store.toDeleteStudent);
            store.setToDeleteStudent(null);
          }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default observer(StudentTable);
