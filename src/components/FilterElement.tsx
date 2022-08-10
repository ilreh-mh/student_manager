import React from 'react';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/css';
import { styled } from '@mui/material/styles';

const S_Root = styled('div')`
  width: 100%;
  margin: 2rem 0;
  position: relative;
  box-sizing: border-box;
`;

const S_Headline = styled('div')`
  font-weight: bold;
`;

const S_Input = styled('input')`
  width: 100%;
  padding: .5rem;
  margin-top: .5rem;
  box-sizing: border-box;
`;

const S_Dropdown = styled('div')`
  width: 100%;
  height: 180px;
  position: absolute;
  background-color: #fff;
  border-bottom: 1px solid #777;
  border-left: 1px solid #777;
  border-right: 1px solid #777;
  z-index: 100;
  box-sizing: border-box;
`;

const S_DropdownHint = styled('div')`
  text-align: center;
  margin: 1rem 0;
  color: #777;
`;

const S_DropdownList = styled('ul')`
  height: calc(100% - 52px);
  overflow-y: scroll;
  overflow-x: hidden;
  list-style: none;
  background-color: #efefef;
  padding: 0;
`;

const S_DropdownListElement = styled('li')`
  cursor: pointer;
  width: 100%;
  padding: .25rem 0;
  padding-left: 2rem;
  &:hover {
    background-color: #ffffdd;
  }
`;

function FilterElement ({ store }:any) {
  return (
    <S_Root
      onBlur={() => store.setShowFilterDropdown(false)}
      onKeyDown={k => {
        if (k.keyCode == 27 || k.keyCode == 13) {
          store.setShowFilterDropdown(false);
        }
      }}
    >
      <S_Headline>Filter Student by name</S_Headline>
      <S_Input
        value={store.filterString}
        onChange={c => store.updateFilterString(c.target.value)}
        onClick={() => store.setShowFilterDropdown(true)}
        autoFocus
      />
      {
        store.showFilterDropdown && <S_Dropdown>
          <S_DropdownHint>
            -or filter by class-
          </S_DropdownHint>
          <S_DropdownList>
            {
              store.availableClasses.map(
                (classroom:string) => <S_DropdownListElement
                  key={classroom}
                  onMouseDown={() => {
                    store.updateFilterString(classroom);
                    store.setShowFilterDropdown(false);
                  }}
                >
                  {classroom}
                </S_DropdownListElement>
              )
            }
          </S_DropdownList>
        </S_Dropdown>
      }
    </S_Root>
  );
}

export default observer(FilterElement);
