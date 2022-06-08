import {
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isDrawerOpened } from '../../../store/slices/drawerSlice';
import { getOrderState } from '../../../store/slices/orderSlice';
import { RootState } from '../../../store/store';
import GenericTable from '../../generic/table/GenericTable';
import MenuHeader from '../../generic/MenuHeader';
import { useStyles } from './Orders.styles';

const Orders: React.FC = () => {
  const isOpened = useSelector(isDrawerOpened);
  const dispatch = useDispatch();
  const classes = useStyles();
  const {rows,count} = useSelector((state: RootState) => state.orders);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    dispatch(getOrderState({
      page:page+1,
      pageSize:rowsPerPage
    }));
  }, [dispatch, page, rowsPerPage]);

  const handleDialogOpen = (item : any) => {
    setDialogOpen(true);
  };
  return (
    <Grid
      item
      container
      direction="row"
      justify="center"
      alignItems="center"
      xs={isOpened ? 10 : 12}
      className={isOpened ? classes.tableMl : ''}
    >
            <MenuHeader
        headerText="Orders"
        showButton={false}
      />
      <Grid item xs={10}>
      <GenericTable
          headers={{
            id: 'Order #',
            name: 'Table',
            waiter: 'Waiter',
            price: "Total",
            status: "Status",
            date: "Date",
          }}
          items={rows.map((order) => ({
              id:order.id,
              name:order.Table?.name,
              waiter:order.User.firstName + " " + order.User.lastName,
              price: order.totalPayment,
              status: order.isCompleted,
              date: order.createdAt
          }))}
          handleDialogOpen={handleDialogOpen}
          customRenderers={{
             status:(it) => <>
              {it.status ? "Completed" : "In progress"}
            </>,
            date:(it) => <>
            {it.date.toString()}
            </>,
            price:(it) => <>
            {it.price.toFixed(2) + " BGN"}
            </>
          }}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          count={count}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default Orders;
