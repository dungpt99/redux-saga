import { call, fork, put, take } from 'redux-saga/effects';
import { LoginPayload, authActions } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

function* handleLogin(payload: LoginPayload) {
  try {
    console.log('handleLogin', payload);
    localStorage.setItem('access_token', 'fake');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: '',
      })
    );

    // redirect to admin page
    yield put(push('/admin'));
  } catch (error: any) {
    yield put(authActions.loginFail(error.message));
  }
}

function* handleLogout() {
  console.log('handlelogout');
  localStorage.removeItem('access_token');
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
