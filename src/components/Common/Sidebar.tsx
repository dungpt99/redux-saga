import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { ListItemMenu } from '../../constants';
import { Item } from '../../models';

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
  const { className, property, id } = props;
  return (
    <NavLink to={property.to} className={className} key={id}>
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
        {ListItemMenu.map((element, idx) =>
          RenderItemLink({ property: element, className: classes.link, id: idx })
        )}
      </List>
    </div>
  );
}
