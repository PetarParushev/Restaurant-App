import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const useHasRole = (requiredRoles?: Array<string>) => {
  const [hasRole, setHasRole] = useState(true);
  const { getIdTokenClaims, isAuthenticated,isLoading } = useAuth0();

  useEffect(() => {
    if(!isLoading) {
      if (requiredRoles && isAuthenticated) {
        getIdTokenClaims().then((claims) => {
          const roles = claims[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ] as Array<string>;
          if (!roles.some((role) => requiredRoles.includes(role))) {
            setHasRole(false);
          }
        });
      } else if (!isAuthenticated) {
        setHasRole(false);
      }
    }
  }, [getIdTokenClaims, requiredRoles, isAuthenticated, isLoading]);

  return hasRole;
};
