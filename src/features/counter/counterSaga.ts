import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleIncrementSaga(action: PayloadAction<number>) {
  // Wait 2s
  yield delay(2000);

  console.log('waiting done');

  // Success
  yield put(incrementSagaSuccess(action.payload));
}
export default function* counterSaga() {
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
  //   yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}
