import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, editProduct, setError } from '../../../../store/slices/productSlice';
import { RootState } from '../../../../store/store';
import { Category } from '../../../../models/category';
import { Product, ProductFormInput } from '../../../../models/interfaces/product';
import { useStyles } from './ProductForm.styles';

interface Props {
  isEditMode: boolean;
  handleDialogClose: () => void;
  product?: Product;
}

const ProductForm: React.FC<Props> = ({
  isEditMode,
  handleDialogClose,
  product
}) => {
  const classes = useStyles();

  const { error, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const categories: Category[] = useSelector(
    (state: RootState) => state.categoriesState.categories
  );

  useEffect(() => {
      if(isEditMode && product) {
        const fields = getValues();
        Object.keys(fields).map((field) =>
          setValue(field as keyof ProductFormInput, product[field as keyof Product])
        );
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isEditMode])
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm<ProductFormInput>({
    defaultValues: {
      id: 0,
      categoryId: 1,
      code: '',
      description: ' ',
      name: '',
      price: undefined,
      timeToCook: undefined,
    },
    shouldUnregister: false,
  });

  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<ProductFormInput> = async (
    data: ProductFormInput,
    event: any
  ) => {
    event.preventDefault();
    isEditMode ? dispatch(editProduct(data)) : dispatch(createProduct(data));
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} justify="center">
        {error && (
          <Grid item xs={10}>
            <Alert severity="error" onClose={() => dispatch(setError())}>
              {error}
            </Alert>
          </Grid>
        )}
        <input type="hidden" name="id" ref={register} />
        <Grid item xs={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            name="name"
            label="Name"
            autoFocus
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="code"
            name="code"
            label="Code"
            autoFocus
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="price"
            name="price"
            label="Price"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="timeToCook"
            id="time"
            label="Time"
            inputRef={register({ required: true })}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rowsMax={4}
            rows={3}
            name="description"
            id="description"
            label="Description"
            inputRef={register}
          />
        </Grid>
        <Grid item xs={10}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Controller
              as={Select}
              label="Category"
              name="categoryId"
              control={control}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Controller>
          </FormControl>
        </Grid>
        {!isEditMode && (
          <Grid item xs={10}>
            <input type="file" name="file" ref={register} />
          </Grid>
        )}
      </Grid>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={5}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoading}
          >
            {isLoading && <CircularProgress />}Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
