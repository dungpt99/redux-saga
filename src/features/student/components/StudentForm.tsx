import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppSelector } from '../../../app/hooks';
import { InputField, RadioGroupField, SelectField } from '../../../components/FormFields';
import { Student } from '../../../models';
import { selectCityOption } from '../../city/citySlice';
import { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
const schema = yup
  .object({
    name: yup.string().required('Please enter name.'),
    age: yup
      .number()
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .positive('Please enter positive number.')
      .integer('Please enter an integer.')
      .required('Please enter age.')
      .typeError('Please enter a valid number.'),
    mark: yup
      .number()
      .positive('Please enter positive number.')
      .min(0, 'Min is 0.')
      .max(10, 'Max is 10')
      .required('Please enter mark.')
      .typeError('Please enter a valid mark.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female.')
      .required('Please enter gender.'),
    city: yup.string().required('Please enter city.'),
  })
  .required();

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValue: Student) => void;
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const [error, setError] = useState<string>('');
  const cityOption = useAppSelector(selectCityOption);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <Box style={{ width: 400 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />

        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />

        {Array.isArray(cityOption) && cityOption.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOption} />
        )}

        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
          </Alert>
        )}
        <Box>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />} Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
