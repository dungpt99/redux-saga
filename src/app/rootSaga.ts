import { all } from 'redux-saga/effects';

function* helloSaga() {
  console.log('Hello');
}

export default function* rootSaga() {
  yield all([helloSaga()]);
}
