import { Button, Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { Student } from '../../../models';

const useStyles = makeStyles((theme) => ({
  table: {},
  edit: {
    marginRight: theme.spacing(1),
  },
}));
export interface StudentTableProps {
  studentList: Student[];
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({ studentList, onEdit, onRemove }: StudentTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.mark}</TableCell>
              <TableCell>{student.city}</TableCell>
              <TableCell align="right">
                <Button
                  className={classes.edit}
                  variant="contained"
                  color="secondary"
                  onClick={() => onEdit?.(student)}
                >
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => onRemove?.(student)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}