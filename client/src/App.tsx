import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import './App.css';
import { AppRoutes } from './routes/routes';
import { security } from "./app/config/security";
import { useDispatch } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import { getCategoriesState } from './store/slices/categorySlice';

const App = () => {
  const { getAccessTokenSilently,isAuthenticated,getIdTokenClaims } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    security.setAccessTokenSilently(getAccessTokenSilently);
  }, [getAccessTokenSilently]);
  useEffect(() => {
    if(isAuthenticated) {
      getIdTokenClaims()
      .then((claims) => {
        const oAuthId = claims['sub'];
        if(oAuthId) {
          dispatch(getUser(oAuthId))
          dispatch(getCategoriesState())
        }
      })
    }
  },[dispatch, getIdTokenClaims, isAuthenticated])
  return (
      <AppRoutes />
  );
}

export default App;
