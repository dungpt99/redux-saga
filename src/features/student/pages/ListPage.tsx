import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectStudentList, studentActions } from '../studentSlice';
import { Box, Button, Typography, makeStyles } from '@material-ui/core';
import StudentTable from '../components/StudentTable';

const useStyles = makeStyles((theme) => ({
  root: {},

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
}));

export interface ListPageProps {}

export default function ListPage() {
  const studentList = useAppSelector(selectStudentList);
  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList({ _page: 1, _limit: 15 }));
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>

      {/* StudentTable */}
      <StudentTable studentList={studentList} />
      {/* Pagination */}
    </Box>
  );
}
