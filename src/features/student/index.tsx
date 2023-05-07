import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { cityActions } from '../city/citySlice';

export interface IStudentFeatureProps {}

export default function StudentFeature(props: IStudentFeatureProps) {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>
      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>
      <Route path={`${match.path}/:studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
