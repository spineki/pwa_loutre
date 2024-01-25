import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

interface FormTextFieldProps<T extends FieldValues> {
  control: Control<T, unknown>;
  name: Path<T>;
  label: string;
}

export function FormTimePicker<T extends FieldValues>(
  props: FormTextFieldProps<T>,
) {
  const { control, label, name } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DesktopTimePicker
          onChange={onChange}
          label={label}
          value={value}
          views={["hours", "minutes"]}
          ampm={false}
          slotProps={{
            textField: {
              error: !!error,
              helperText: error ? error.message : null,
            },
          }}
        />
      )}
    />
  );
}
