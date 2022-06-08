import { Grid, Snackbar, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  getProductsState,
  setError,
  setSuccess,
} from '../../../../store/slices/productSlice';
import { RootState } from '../../../../store/store';
import { Product } from '../../../../models/interfaces/product';
import GenericTable from '../../../generic/table/GenericTable';
import MenuHeader from '../../../generic/MenuHeader';
import CustomDialog from '../../../generic/CustomDialog';
import Alert from '../../../generic/Alert';
import ProductForm from '../ProductForm/ProductForm'
import { DialogOptions } from '../../../../models/enums/dialogActions';

const ProductsTable: React.FC = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentAction, setCurrentAction] = useState<DialogOptions>();
  const [productToEdit, setProductToEdit] = useState<Product>();

  const { rows, count, error, isSuccess } = useSelector(
    (state: RootState) => state.products
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
      getProductsState({
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
      setProductToEdit(rows.find((product) => product.id === id));
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
    if(productToEdit){
      dispatch(deleteProduct(productToEdit?.id))
    }
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
          Product was successfully {currentAction === DialogOptions.Delete ? "deleted" : isEditMode ? 'edited' : 'added'}!
        </Alert>
      </Snackbar>
      <MenuHeader
        headerText="Menu"
        buttonText="Add product"
        showButton={true}
        handleDialogOpen={handleDialogOpen}
      />
      <Grid item xs={10}>
        <GenericTable
          headers={{
            id: 'Id',
            name: 'Name',
            price: 'Price',
            category: 'Category',
          }}
          items={rows.map(({ id, name, price, Category }) => ({
            id,
            name,
            price,
            category: Category.name,
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
        title={`${currentAction === DialogOptions.Delete ? "Delete" : isEditMode ? 'Edit' : 'New'} product`}
        isDialogOpen={isDialogOpen}
        action={currentAction}
        handleDialogClose={handleDialogClose}
        handleDialogConfirmation={handleDeleteItem}
      >
        {currentAction !== DialogOptions.Delete ? 
          <ProductForm
            isEditMode={isEditMode}
            {...(productToEdit && { product: productToEdit })}
            handleDialogClose={handleDialogClose}
          /> : <Typography>Are you sure you want to delete this product?</Typography>
        }
      </CustomDialog>
    </Grid>
  );
};

export default ProductsTable;
