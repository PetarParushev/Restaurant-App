import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import MenuHeader from '../../../generic/MenuHeader';
import TableCard from '../../../generic/TableCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { getTablesState } from '../../../../store/slices/tableSlice';

const TableCards: React.FC = () => {
  const dispatch = useDispatch();
  const {rows} = useSelector((state: RootState) => state.tables);

  useEffect(() => {
    dispatch(getTablesState());
  }, [dispatch]);
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <MenuHeader headerText="Tables" showButton={false} />
      <Grid item xs={10} container direction="row" alignItems="center">
        {rows.map((table, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TableCard cardData={table} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default TableCards;
