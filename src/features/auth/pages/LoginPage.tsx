import { Paper, makeStyles, Typography, Box, Button } from '@material-ui/core';
import { useAppDispatch } from '../../../app/hooks';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },

  box: {
    padding: theme.spacing(3),
  },
}));

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box style={{ marginTop: '32px' }}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            Fake login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
