import {
    Button,
    CircularProgress,
    Grid,
    TextField,
  } from '@material-ui/core';
  import { Alert } from '@material-ui/lab';
  import { useEffect } from 'react';
  import { SubmitHandler, useForm } from 'react-hook-form';
  import { useDispatch, useSelector } from 'react-redux';
import { createTable, editTable, setError } from '../../../../store/slices/tableSlice';
  import { RootState } from '../../../../store/store';
import { Table, TableFormInput } from '../../../../models/interfaces/table';
import { useStyles } from '../../menu/ProductForm/ProductForm.styles';
  
  interface Props {
    isEditMode: boolean;
    handleDialogClose: () => void;
    table?: Table;
  }
  
  const TableForm: React.FC<Props> = ({
    isEditMode,
    handleDialogClose,
    table
  }) => {
    const classes = useStyles();
  
    const { error, isLoading } = useSelector(
      (state: RootState) => state.tables
    );
    useEffect(() => {
        if(isEditMode && table) {
          const fields = getValues();
          Object.keys(fields).map((field) =>
            setValue(field as keyof TableFormInput, table[field as keyof Table])
          );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isEditMode])
    const {
      register,
      handleSubmit,
      setValue,
      getValues,
    } = useForm<TableFormInput>({
      defaultValues: {
        id: 0,
        name: '',
        capacity: undefined
      },
      shouldUnregister: false,
    });
  
    const dispatch = useDispatch();
    const onSubmit: SubmitHandler<TableFormInput> = async (
      data: TableFormInput,
      event: any
    ) => {
      event.preventDefault();
      isEditMode ? dispatch(editTable(data)) : dispatch(createTable(data));
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
          <Grid item xs={10}>
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
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="capacity"
              name="capacity"
              label="Capacity"
              inputRef={register({ required: true })}
            />
          </Grid>
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
  
  export default TableForm;
  