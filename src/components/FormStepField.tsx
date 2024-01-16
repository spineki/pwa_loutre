import { Control, FieldValues, Path, UseFieldArrayRemove } from "react-hook-form";

import Box from "@mui/material/Box";

import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from "@mui/material/IconButton";
import { FormTextField } from "./FormTextField";

interface FormStepFieldProps<T extends FieldValues> {
    index: number,
    control: Control<T, unknown>,
    remove: UseFieldArrayRemove
    name: Path<T>,
    label: string,
    multiline?: boolean,
    minRows?: number,
}

export function FormStepField<T extends FieldValues>(props: FormStepFieldProps<T>) {

    const { index, control, remove, label, minRows, multiline, name } = props;

    console.log(index)

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }} gap={1}>
            <Box>
                <IconButton
                    sx={{ alignSelf: "center" }}
                    color="primary"
                    onClick={() => {
                        console.log("calling remove on ", index);
                        remove(index);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
            <FormTextField
                control={control}
                label={label}
                name={name}
                multiline={multiline}
                minRows={minRows}
            />
        </Box>
    )

}