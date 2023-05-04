import { all } from 'redux-saga/effects';
import counterSaga from '../features/counter/counterSaga';
import authSaga from '../features/auth/authSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';
import studentSaga from '../features/student/studentSage';

export default function* rootSaga() {
  yield all([counterSaga(), authSaga(), dashboardSaga(), studentSaga()]);
}
