import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import cityApi from './api/cityApi';
import { useAppDispatch } from './app/hooks';
import { NotFound, PrivateRoute } from './components/Common';
import { AdminLayout } from './components/Layout';
import { authActions } from './features/auth/authSlice';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    cityApi.getAll().then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={() => dispatch(authActions.logout())}>
        Log out
      </Button>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
