import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { useState } from 'react';
import { useHasRole } from '../../../hooks/useHasRoles';
import { DialogOptions } from '../../../models/enums/dialogActions';
import { Roles } from '../../../models/enums/roles';
import TablePaginationActions from './TablePaginationActions';

function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}
interface MinTableItem {
  id: number;
}
type PrimitiveType = string | Symbol | number | boolean;

function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  );
}
type TableHeaders<T> = Record<keyof T, string>;

type CustomRenderers<T> = Partial<Record<keyof T, (it: T) => React.ReactNode>>;

interface TableProps<T extends MinTableItem> {
  items: T[];
  headers: TableHeaders<T>;
  customRenderers?: CustomRenderers<T>;
  page: number;
  count:number;
  rowsPerPage:number;
  handleDialogOpen: (dialogOptions: DialogOptions,id: number) => void;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
const GenericTable = <T extends MinTableItem,>(props: TableProps<T>) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [clickedRowId,setClickedRowId] = useState<number>(0);
  const isAdmin = useHasRole([Roles.Admin]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>,id: number) => {
    setAnchorEl(event.currentTarget);
    setClickedRowId(id);
  };

  const handleMenuClose = (event: React.SyntheticEvent | {}, id?: number,action?: DialogOptions) => {
    setAnchorEl(null);
    if(id && action){
      props.handleDialogOpen(action,id);
    }
  };

  function renderRow(item: T, id: number) {
    return (
      <TableRow key={id}>
        {objectKeys(item).map((itemProperty, index) => {
          const customRenderer = props.customRenderers?.[itemProperty];
          
          if (customRenderer) {
            return <TableCell key={index} align={index === 0 ? 'left' : 'right'}>{customRenderer(item)}</TableCell>;
          }
          return (
            <TableCell key={index} align={index === 0 ? 'left' : 'right'}>
              {isPrimitive(item[itemProperty]) ? item[itemProperty] : ''}
            </TableCell>
          );
        })}
        <TableCell align="right">
          <Button variant="contained" color="primary" onClick={(event) => {
            handleMenuClick(event,item.id);
          }} disabled={!isAdmin}>
            Actions
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={Boolean(anchorEl)}
            onClose={(event) => handleMenuClose(event)}
          >
            <MenuItem
              onClick={(event) => {
                handleMenuClose(event,clickedRowId,DialogOptions.Edit);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={(event) => handleMenuClose(event,clickedRowId,DialogOptions.Delete)}>Delete</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer component={Grid} item>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {objectValues(props.headers).map((headerValue, index) => (
              <TableCell key={index} align={index === 0 ? 'left' : 'right'}>
                {headerValue}
              </TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items.map((item) => renderRow(item, item.id))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={props.count}
              rowsPerPage={props.rowsPerPage}
              page={props.page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={props.handleChangePage}
              onChangeRowsPerPage={props.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
