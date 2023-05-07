import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Student } from '../../../models';
import studentApi from '../../../api/studentApi';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [studentId]);

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    history.push('/admin/students');
  };

  return (
    <Box>
      <Link to={'/admin/students'}>
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> &nbsp; Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">{(isEdit && 'Update student') || 'Add new student'}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box style={{ marginTop: '24px' }}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
