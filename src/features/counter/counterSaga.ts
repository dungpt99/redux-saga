import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeLatest } from 'redux-saga/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

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
