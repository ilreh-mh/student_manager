import React from 'react';
import { observer } from 'mobx-react-lite';

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

//icons
import IconEdit from '@mui/icons-material/Edit';
import IconDelete from '@mui/icons-material/Delete';

//misc
import Button from '@mui/material/Button';
import { IStudent, IExchangeStudent } from '../datasets/students';

//styles
const CSS_HeadTableCells = {
  fontWeight: 'bold',
}

//functions

/**
 * Theoretically, it would suffice to use toLocaleString('de')
 * because there were no leading zeroes in the mockups.
 * However, since those are german-formatted dates, we are
 * used to have leading zeroes and benefit with better
 * readability in that case.
 */
const getFormattedBirthdate = (date: any) => {
  if (!date) return;
  let dateSrc = new Date(date);
  let d: any = dateSrc.getDate();
  d = d > 9 ? String(d) : '0' + String(d);
  let m: any = dateSrc.getMonth() + 1;
  m = m > 9 ? String(m) : '0' + String(m);
  let y = dateSrc.getFullYear();
  return d + '.' + m + '.' + y;
}

const studentIsExternal = (student: any) => {
  return 'extId' in student;
}

// components
const modalContents = <div>
  this is stuff
</div>

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
              store.students?.map((data:IStudent | IExchangeStudent) => <TableRow
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
                    <Button>
                      <IconEdit />
                    </Button>
                    <Button>
                      <IconDelete />
                    </Button>
                  </React.Fragment>}
                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default observer(StudentTable);
