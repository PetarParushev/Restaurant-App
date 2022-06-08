import { useHistory } from 'react-router-dom';
import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

type Props =  {
    children: ReactNode;
  }

const Auth0ProviderWithHistory:React.FC<Props> = ({ children }) => {
  const history = useHistory();

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
      audience={process.env.REACT_APP_AUTH0_API_AUDIENCE}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
      redirectUri={window.location.origin}
      useRefreshTokens
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
