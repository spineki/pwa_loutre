import { Draggable } from "@hello-pangea/dnd";
import { Control, FieldValues, Path, UseFieldArrayRemove } from "react-hook-form";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { FormTextField } from "./FormTextField";

interface FormStepFieldProps<T extends FieldValues> {
    id: string,
    index: number,
    control: Control<T, unknown>,
    remove: UseFieldArrayRemove
    name: Path<T>,
    label: string,
    multiline?: boolean,
    minRows?: number,
}

export function FormStepField<T extends FieldValues>(props: FormStepFieldProps<T>) {

    const { id, index, control, remove, label, minRows, multiline, name } = props;

    return (
        <Draggable
            draggableId={`steps-item-${index}`}
            index={index}
        >
            {(provided) => (
                <div
                    key={id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Box sx={{ display: "flex", flexDirection: "row" }} gap={1}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <IconButton
                                {...provided.dragHandleProps}
                            >
                                <DragIndicatorIcon />
                            </IconButton>
                            <IconButton
                                color="primary"
                                onClick={() => remove(index)}
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

                </div>
            )}
        </Draggable>
    )

}