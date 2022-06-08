import { Redirect, Route, Switch } from 'react-router';
import { ProtectedRoute } from '../components/generic/ProtectedRoute';
import CategoriesView from '../components/layout/categories/Categories';
import ProductsTable from '../components/layout/menu/ProductsTable/ProductsTable';
import Navigation from '../components/layout/navigation/Navigation';
import Orders from '../components/layout/orders/Orders';
import Profile from '../components/layout/profile/Profile';
import TableOrder from '../components/layout/TableOrder/TableOrder';
import TableCards from '../components/layout/tables/TableCards/TableCards';
import TablePanel from '../components/layout/tables/TablePanel/TablePanel';
import { Roles } from '../models/enums/roles';
export const AppRoutes = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/" exact component={TableCards} />
        <ProtectedRoute  exact path="/profile" component={Profile} />
        <ProtectedRoute rolesRequired={[Roles.Admin,Roles.Bartender]} exact path="/orders" component={Orders} />
        <ProtectedRoute path="/tables" exact component={TablePanel} />
        <ProtectedRoute path="/tables/:id" exact component={TableOrder}/>
        <ProtectedRoute path="/menu" exact component={ProductsTable} />
        <ProtectedRoute rolesRequired={[Roles.Admin]} path="/users" exact component={Orders} />
        <ProtectedRoute path="/categories" exact component={CategoriesView} />
        <Redirect to="/404" exact />
      </Switch>
    </div>
  );
};
