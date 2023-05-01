import { Box, Grid, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticItem from './components/StatisticItem';
import {
  dashboardActions,
  selectDashboardHighestStudentList,
  selectDashboardLoading,
  selectDashboardLowestStudentList,
  selectDashboardRankingByCityList,
  selectDashboardStatistics,
} from './dashboardSlice';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },

  loading: {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(-1),
  },
}));
export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectDashboardHighestStudentList);
  const lowestStudentList = useAppSelector(selectDashboardLowestStudentList);
  const rankingByCityList = useAppSelector(selectDashboardRankingByCityList);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}
      {/* Statistic Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<LinearScaleSharp fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All student ranking */}
      <Box style={{ marginTop: '40px' }}>
        <Typography variant="h4">All student</Typography>

        <Box style={{ marginTop: '16px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Ranking by city */}
      <Box style={{ marginTop: '40px' }}>
        <Typography variant="h4">Ranking by city</Typography>

        <Box style={{ marginTop: '16px' }}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
