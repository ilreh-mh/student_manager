import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { css } from '@emotion/css';
import { styled } from '@mui/material/styles';

// datepicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const tfStyle = css`
  width: 100%;
  margin-top: 1rem !important;
`;

const S_ButtonWrapper = styled('div')`
  width: 100%;
  text-align: right;
  margin-top: 2rem;
`;

function ModifyForm({
  store,
  name,
  classroom,
  birthdate,
  gender
  }: any) {

  // need internal state before changing store
  const [tmpName, setTmpName] = useState<string>(name);
  const [tmpClass, setTmpClass] = useState<string>(classroom);
  const [tmpBirthdate, setTmpBirthdate] = useState<Date | null>
    (new Date(
      birthdate // format is YYYY-MM-DD
    ));
  const [tmpGender, setTmpGender] = useState(gender);

  const nameError = (name:string) => {
    return !name
      ? 'You need to enter a name'
      : name && name.match(/[0-9]+/)
        ? 'Name must not contain numbers!'
        : '';
  }

  return (
    <div>
      <h1>Edit Student</h1>
      <TextField
        className={tfStyle}
        label="Name"
        value={tmpName}
        error={!!nameError(tmpName)}
        helperText={nameError(tmpName)}
        onChange={e => setTmpName(e.target.value)}
      />
      <LocalizationProvider  dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Birthdate"
          inputFormat="dd.MM.yyyy"
          value={tmpBirthdate}
          onChange={e => setTmpBirthdate(e)}
          disableFuture={true}
          renderInput={(params) =>
            <TextField
              onKeyDown={e => e.preventDefault()}
              className={tfStyle}
              {...params}
            />
          }
        />

      </LocalizationProvider>
      <TextField
        select
        className={tfStyle}
        label="Class"
        value={tmpClass}
        onChange={e => setTmpClass(e.target.value)}
      >
        { store.availableClasses.map((c:string) => <MenuItem
          key={c}
          value={c}
        >
          {c}
        </MenuItem>)}
      </TextField>
      <TextField
        select
        className={tfStyle}
        label="Gender"
        value={tmpGender}
        onChange={e => setTmpGender(e.target.value)}
      >
        <MenuItem value='m'>m</MenuItem>
        <MenuItem value='f'>f</MenuItem>
        <MenuItem value='x'>x</MenuItem>
      </TextField>
      <S_ButtonWrapper>
        <Button
          onClick={() => store.setEditedStudent(null)}
        >
          Cancel
        </Button>
        <Button
          disabled={
            !!nameError(tmpName) ||
            !tmpBirthdate || tmpBirthdate.toString().indexOf('nvalid') != -1 ||
            !tmpClass ||
            !tmpGender
          }
          onClick={() => {
            store.updateStudent(
              tmpName,
              tmpClass,
              tmpBirthdate?.toISOString().substr(0,10),
              tmpGender,
            );
            store.setEditedStudent(null)
          }}
        >
          OK
        </Button>
      </S_ButtonWrapper>
    </div>
  );
}

export default observer(ModifyForm);
