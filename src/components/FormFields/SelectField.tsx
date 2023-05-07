import { FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  label?: string;
  control: Control<any>;
  disabled?: boolean;
  options?: SelectOption[];
}

export function SelectField({ name, label, control, disabled, options }: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <FormControl
      size="small"
      margin="normal"
      variant="outlined"
      error={invalid}
      disabled={disabled}
      fullWidth
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
