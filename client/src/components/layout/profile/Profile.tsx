import { useAuth0 } from '@auth0/auth0-react';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage } from '../../../store/slices/userSlice';
import { RootState } from '../../../store/store';
import MenuHeader from '../../generic/MenuHeader';
import "./Profile.css"

const Profile: React.FC = () => {
  const { logout } = useAuth0();
  const { user, isLoading } = useSelector((state: RootState) => state.user);
  const [selectedFileName,setSelectedFileName] = useState<string>("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<any> = async (data: FileList, event: any) => {
    event.preventDefault();
    dispatch(
      updateImage({
        data,
        id: user.id,
      })
    );
  };
  const getUserImage = () => {
    if(!user.imagePath.includes("s.gravatar.com")) {
      const imagePath = `http://localhost:5001/images/${user.imagePath}`;
      return imagePath
    }
    return user.imagePath;
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setSelectedFileName(event.target.files?.length ? event.target.files[0].name : "")
  }
  return (
    <Grid
      item
      container
      direction="row"
      justify="center"
      alignItems="center"
      xs={12}
    >
      <MenuHeader headerText="Profile" showButton={false} />
      <Grid item xs={10} className="d-flex">
        <Grid item xs={3} container direction="column" justify="center" alignItems="center">
          <img src={getUserImage()} height="300px" width="300px" alt="No img" />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              logout({ returnTo: window.location.origin });
            }}
          >
            Log Out
          </Button>
        </Grid>
        <Grid item xs={5}>
          <form  onSubmit={handleSubmit(onSubmit)} className="d-flex">
            <Grid item xs={10}>
            <label className="custom-file-upload">
            <div className="file-name"><span>File: {selectedFileName}</span></div>
              <input type="file" name="file" ref={register} onChange={handleImageChange} />
              <div className="file-select-button"><span>Select a file</span></div>
            </label>
            </Grid>
            <Grid item xs={5}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading && <CircularProgress />}Upload
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
