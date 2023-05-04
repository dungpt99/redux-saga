import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import studentApi from '../../api/studentApi';
import { ListParams, ListResponse, Student } from '../../models';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed get student');
    yield put(studentActions.fetchStudentListFailed(''));
  }
}

export default function* studentSaga() {
  // watch fetch student action
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
}
