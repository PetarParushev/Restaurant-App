import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../../store/slices/productSlice';
import { RootState } from '../../../store/store';
import { RegisterFormInput } from '../../../models/interfaces/user';
import { useStyles } from './Navigation.styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import { signUp } from '../../../store/slices/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../../validation/registration';

interface Props {
  handleDialogClose: () => void;
}

const RegisterForm: React.FC<Props> = ({ handleDialogClose }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<RegisterFormInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'rol_cKsa4Sm4zg5hBZIU',
    },
    shouldUnregister: false,
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state: RootState) => state.user);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<RegisterFormInput> = async (
    data: RegisterFormInput,
    event: any
  ) => {
    event.preventDefault();
    dispatch(signUp(data));
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
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            autoFocus
            inputRef={register}
          />
          {errors.firstName && (
            <p className="input-error">{errors.firstName.message}</p>
          )}
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            autoFocus
            inputRef={register}
          />
          {errors.lastName && (
            <p className="input-error">{errors.lastName.message}</p>
          )}
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            id="email"
            name="email"
            label="Email"
            autoFocus
            inputRef={register}
          />
          {errors.email && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </Grid>
        <Grid item xs={10}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              inputRef={register}
              name="password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment
                  position="end"
                  onClick={handleClickShowPassword}
                >
                  <IconButton>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {errors.password && (
            <p className="input-error">{errors.password.message}</p>
          )}
        </Grid>
        <Grid item xs={10}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              inputRef={register}
              name="confirmPassword"
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end" onClick={handleClickShowPassword}>
                  <IconButton>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={100}
            />
          </FormControl>
          {errors.confirmPassword && (
            <p className="input-error">{errors.confirmPassword.message}</p>
          )}
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
            {isLoading && <CircularProgress />}Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
