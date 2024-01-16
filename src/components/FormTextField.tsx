
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import TextField from "@mui/material/TextField";

interface FormTextFieldProps<T extends FieldValues> {
    control: Control<T, unknown>,
    name: Path<T>,
    label: string,
    type?: HTMLInputTypeAttribute,
    multiline?: boolean,
    minRows?: number
}

export function FormTextField<T extends FieldValues>(props: FormTextFieldProps<T>) {

    const { control, label, minRows, multiline, name, type } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <TextField
                    type={type}
                    label={label}
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    minRows={minRows}
                    multiline={!!multiline}
                    variant="outlined"
                />
            )}
        />
    );
}