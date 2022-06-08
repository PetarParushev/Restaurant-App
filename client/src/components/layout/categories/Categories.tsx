import React, { useCallback, useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MenuHeader from '../../generic/MenuHeader';
import { Category } from '../../../models/category';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { createCategory, getCategoriesState,setCategoryError } from '../../../store/slices/categorySlice';
import { useStyles } from './Categories.styles';
import { Alert } from '@material-ui/lab';
interface IFormInput {
  name: string;
  mainCategory: number | string;
  file: FileList;
}

const CategoriesView: React.FC = () => {
  const classes = useStyles();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm<IFormInput>();
  const {categories,error} = useSelector((state: RootState) => {
    return state.categoriesState;
  });

  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true);
  },[]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput, event : any) => {
    event.preventDefault();
        const formData = new FormData();
        formData.append('photo', data.file[0]);
        formData.append('name', data.name);
        if (data.mainCategory !== 'None') {
          formData.append('mainCategoryId', data.mainCategory.toString());
        }
        dispatch(createCategory(formData));
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    dispatch(setCategoryError(null))
  };
  useEffect(() => {
    dispatch(getCategoriesState());
  }, [dispatch]);
  const renderTree = useCallback((category: Category) => (
    <TreeItem
      key={category.id}
      nodeId={category.name}
      label={
        <Typography variant="h4" className="bg-white">
          {category.name}
        </Typography>
      }
      classes={{
        content: classes.content,
      }}
    >
      {Array.isArray(category.subCategories)
        ? category.subCategories.map((node) => renderTree(node))
        : null}
    </TreeItem>
  ),[classes.content]);
  const renderSelectItem = useCallback((category: Category) => {
    return (
      <MenuItem key={category.id} value={category.id}>
        {category.name}
      </MenuItem>
    );
  },[]);
  return (
    <Grid container justify="center" alignItems="center" className="color-grey">
      <MenuHeader
        headerText="Category"
        buttonText="New Category"
        showButton={true}
        handleDialogOpen={handleDialogOpen}
      />
      <Grid
        item
        xs={9}
        container
        justify="flex-start"
        direction="row"
        className="d-flex"
      >
        <TreeView
          defaultCollapseIcon={<ExpandLessIcon />}
          defaultExpandIcon={<ExpandMoreIcon />}
          className={classes.root}
        >
          {categories.map((category) => renderTree(category))}
        </TreeView>
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>New Category</DialogTitle>
          <DialogContent>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} justify="center">
                {error && <Alert severity="error">{error}</Alert>}
                <Grid item xs={9}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={9}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Main Category</InputLabel>
                    <Controller
                      as={Select}
                      label="Main Category"
                      name="mainCategory"
                      control={control}
                      defaultValue="None"
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      {categories.map((category) => [
                        renderSelectItem(category),
                        ...(category.subCategories
                          ? category.subCategories.map((neshto) =>
                              renderSelectItem(neshto)
                            )
                          : []),
                      ])}
                    </Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={9}>
                  <input type="file" name="file" ref={register} />
                </Grid>
              </Grid>
              <Grid container justify="center" spacing={2}>
                <Grid item xs={5}>
                  <Button
                    type="submit"
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
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default CategoriesView;
