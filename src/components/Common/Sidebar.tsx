import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard, PeopleAlt } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { Item } from '../../models';
import { ListItemMenu } from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  link: {
    color: 'inherit',
    textDecoration: 'none',

    '&.active > div': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

function RenderItemLink(props: Item) {
  const { className, property } = props;
  return (
    <NavLink to={property.to} className={className}>
      <ListItem button>
        <ListItemIcon>{<property.icon />}</ListItemIcon>
        <ListItemText primary={property.title} />
      </ListItem>
    </NavLink>
  );
}

export function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {ListItemMenu.map((element) =>
          RenderItemLink({ property: element, className: classes.link })
        )}
      </List>
    </div>
  );
}
