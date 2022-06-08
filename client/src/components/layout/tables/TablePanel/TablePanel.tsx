import { Grid, Snackbar, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setError,
  setSuccess,
} from '../../../../store/slices/productSlice';
import { RootState } from '../../../../store/store';
import GenericTable from '../../../generic/table/GenericTable';
import MenuHeader from '../../../generic/MenuHeader';
import CustomDialog from '../../../generic/CustomDialog';
import Alert from '../../../generic/Alert';
import { DialogOptions } from '../../../../models/enums/dialogActions';
import { deleteTable, getTablesState } from '../../../../store/slices/tableSlice';
import { Table } from '../../../../models/interfaces/table';
import { User } from '../../../../models/interfaces/user';
import TableForm from '../TableForm/TableForm';

const TablePanel:React.FC = () => {
    const dispatch = useDispatch();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentAction, setCurrentAction] = useState<DialogOptions>();
    const [tableToEdit, setTableToEdit] = useState<Table>();
  
    const { rows, count, error, isSuccess } = useSelector(
      (state: RootState) => state.tables
    );
  
    const handleSnackbarClose = (
      event?: React.SyntheticEvent,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(setSuccess());
    };
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    useEffect(() => {
      dispatch(
        getTablesState({
          page: page + 1,
          pageSize: rowsPerPage,
        })
      );
    }, [dispatch, page, rowsPerPage, count]);
  
    useEffect(() => {
      if (isSuccess) {
        handleDialogClose();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);
  
    const handleDialogOpen = (action: DialogOptions, id?: any) => {
      if (action !== DialogOptions.Create) {
        setEditMode(true);
        setTableToEdit(rows.find((table) => table.id === id));
      } else {
        setEditMode(false);
      }
      setCurrentAction(action);
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
      if (error) {
        dispatch(setError());
      }
    };
    const handleDeleteItem = () => {
      if(tableToEdit){
        dispatch(deleteTable(tableToEdit?.id))
      }
    }
    const formatName = (user: User) => {
      return [user.firstName,user.lastName].join(" ");
    }
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        item
        xs={12}
      >
        <Snackbar
          open={isSuccess}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            Table was successfully {currentAction === DialogOptions.Delete ? "deleted" : isEditMode ? 'edited' : 'added'}!
          </Alert>
        </Snackbar>
        <MenuHeader
          headerText="Table"
          buttonText="Add Table"
          showButton={true}
          handleDialogOpen={handleDialogOpen}
        />
        <Grid item xs={10}>
          <GenericTable
            headers={{
              id: 'Id',
              name: "Table Name",
              waiter: 'Waiter',
              price: 'Price',
              status: 'Status',
            }}
            items={rows.map(({ id, name,Order }) => ({
              id,
              name,
              waiter:Order ? formatName(Order.User) : "-",
              price: Order ? Order.totalPayment : "-",
              status: Order ? "Active" : "Free"
            }))}
            handleDialogOpen={handleDialogOpen}
            count={count}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page}
          />
        </Grid>
        <CustomDialog
          title={`${currentAction === DialogOptions.Delete ? "Delete" : isEditMode ? 'Edit' : 'New'} Table`}
          isDialogOpen={isDialogOpen}
          action={currentAction}
          handleDialogClose={handleDialogClose}
          handleDialogConfirmation={handleDeleteItem}
        >
          {currentAction !== DialogOptions.Delete ? 
          <TableForm
            isEditMode={isEditMode}
            {...(tableToEdit && { table: tableToEdit })}
            handleDialogClose={handleDialogClose}
          /> : <Typography>Are you sure you want to delete this table?</Typography>
        }
        </CustomDialog>
      </Grid>
    );
}

export default TablePanel