import { Box, Button, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import { ListParams, Student } from '../../../models';
import studentApi from '../../../api/studentApi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },

  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export interface ListPageProps {}

export default function ListPage() {
  const match = useRouteMatch();
  const history = useHistory();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handleChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove(student?.id || '');

      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    console.log(history);
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>

        <Link to={`${match.url}/add`}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      {/* Filter */}
      <Box style={{ marginBottom: '24px' }}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      {/* StudentTable */}
      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
      />

      {/* Pagination */}
      <Box style={{ marginTop: '16px', display: 'flex', justifyContent: 'center ' }}>
        <Pagination
          color="primary"
          count={Math.ceil(pagination?._totalRows / pagination?._limit)}
          page={pagination?._page}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
