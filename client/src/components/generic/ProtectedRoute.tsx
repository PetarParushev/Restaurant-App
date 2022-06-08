import { withAuthenticationRequired } from "@auth0/auth0-react";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { Route, RouteProps, useHistory } from "react-router";
import { useHasRole } from "../../hooks/useHasRoles";

const withRoleRequired = (Component: any, requiredRoles?: Array<string>) => {
    return function WithRoleRequired(props: any) {
      const hasRole = useHasRole(requiredRoles);
      const history = useHistory();
  
      useEffect(() => {
        if (!hasRole) {
          history.replace("/tables");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [hasRole]);
  
      return <Component {...props} />;
    };
  };
  
  type Props = {
    component: React.ComponentType;
    rolesRequired?: Array<string>;
  };
  
  export const ProtectedRoute: React.FC<Props & RouteProps> = ({
    component,
    rolesRequired,
    ...rest
  }) => {
    const componentWithAuthentication = withAuthenticationRequired(component, {
      onRedirecting: () => <CircularProgress />,
    });
  
    const componentWithRoles = withRoleRequired(
      componentWithAuthentication,
      rolesRequired
    );
  
    return <Route component={componentWithRoles} {...rest} />;
  };